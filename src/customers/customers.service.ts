import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './DTO/create-customer.dto';
import { UUID } from 'crypto';
import { UpdateCustomerDto } from './DTO/update-customer.dto';
import { hashPassword } from 'src/utils';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private repository: Repository<Customer>,
  ) {}

  findCustomerBy(id: UUID): Promise<Customer | null> {
    return this.repository.findOneBy({ id });
  }

  findDeletedCustomerBy(id: UUID): Promise<Customer | null> {
    return this.repository.findOne({ where: { id }, withDeleted: true });
  }

  listAllCustomers(): Promise<Customer[] | null> {
    return this.repository.find();
  }

  listAllDeletedCustomers(): Promise<Customer[] | null> {
    return this.repository.find({ withDeleted: true });
  }

  async createCustomer(body: CreateCustomerDto): Promise<Customer> {
    const customer = this.repository.create({
      ...body,
      password: await hashPassword(body.password),
    });

    return this.repository.save(customer);
  }

  softDeleteCustomerBy(id: UUID): Promise<UpdateResult> {
    return this.repository.softDelete({ id });
  }

  hardDeleteCustomerBy(id: UUID): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  restoreDeletedCustomer(id: UUID): Promise<UpdateResult> {
    return this.repository.restore(id);
  }

  async updateCustomer(
    id: UUID,
    body: UpdateCustomerDto,
  ): Promise<UpdateResult> {
    return this.repository.update(
      { id },
      { ...body, password: await hashPassword(body.password) },
    );
  }

  async changePassword(
    id: UUID,
    { password }: UpdateCustomerDto,
  ): Promise<UpdateResult> {
    return this.repository.update(
      { id },
      { password: await hashPassword(password) },
    );
  }
}
