import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './DTO/create-customer.dto';
import { UUID } from 'crypto';

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

  createCustomer(body: CreateCustomerDto): Promise<Customer> {
    const customer = this.repository.create(body);

    return this.repository.save(customer);
  }

  deleteCustomerBy(id: UUID): Promise<DeleteResult> {
    return this.repository.softDelete({ id });
  }
}
