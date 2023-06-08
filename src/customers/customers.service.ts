import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UUID } from 'crypto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import {
  checkQueryResult,
  compareHashedPassword,
  customerExists,
  hashPassword,
} from 'src/utils';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private repository: Repository<Customer>,
  ) {}

  async findCustomerBy(id: UUID): Promise<Customer | null> {
    const customer = await this.repository.findOneBy({ id });

    customerExists(customer);

    return customer;
  }

  findCustomerByEmail(email: string): Promise<Customer> {
    return this.repository.findOneBy({ email });
  }

  findDeletedCustomerBy(id: UUID): Promise<Customer | null> {
    return this.repository.findOne({ where: { id }, withDeleted: true });
  }

  async listAllCustomers(): Promise<Customer[] | null> {
    const customers = await this.repository.find();

    if (customers.length <= 0) {
      throw new NotFoundException('No se encontraron clientes.');
    }

    return customers;
  }

  listAllDeletedCustomers(): Promise<Customer[] | null> {
    return this.repository.find({ withDeleted: true });
  }

  async createCustomer(body: CreateCustomerDto): Promise<Customer> {
    const customer = await this.findCustomerByEmail(body.email);
    let newCustomer;

    if (customer) {
      throw new BadRequestException(
        'Ya existe un usuario con esa dirección de email.',
      );
    }

    try {
      newCustomer = this.repository.create({
        ...body,
        password: await hashPassword(body.password),
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Ocurrió un error al crear el usuario: ${error}`,
      );
    }

    return this.repository.save(newCustomer);
  }

  async deleteCustomerBy(id: UUID): Promise<Customer> {
    const customer = await this.findDeletedCustomerBy(id);

    customerExists(customer);

    if (customer.deleted_at) {
      throw new BadRequestException(
        'El cliente ya fue eliminado anteriormente.',
      );
    }

    if (process.env.DELETE_TYPE === 'hard') {
      checkQueryResult(await this.repository.delete({ id }));
      return;
    }

    checkQueryResult(await this.repository.softDelete({ id }));

    return customer;
  }

  async restoreDeletedCustomer(id: UUID): Promise<Customer> {
    const customer = await this.findDeletedCustomerBy(id);
    const query = await this.repository.restore(id);

    customerExists(customer);

    checkQueryResult(query);

    return customer;
  }

  async updateCustomer(id: UUID, attrs: Partial<Customer>): Promise<Customer> {
    const customer = await this.findCustomerBy(id);

    customerExists(customer);

    if (attrs.password) {
      attrs.password = await hashPassword(attrs.password);
    }

    Object.assign(customer, attrs);
    return this.repository.save(customer);
  }

  async changePassword(id: UUID, body: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findCustomerBy(id);
    const checkPasswordMatch = compareHashedPassword(
      body.actualPassword,
      customer.password,
    );

    customerExists(customer);

    if (!checkPasswordMatch) {
      throw new BadRequestException('La contraseña ingresada es incorrecta.');
    }

    customer.password = await hashPassword(body.password);

    return this.repository.save(customer);
  }
}
