import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private repository: Repository<Employee>,
  ) {}

  async findEmployeeBy(id: UUID): Promise<Employee> {
    const employee = await this.repository.findOneBy({ id });

    return employee;
  }

  async findEmployeeByEmail(email: string): Promise<Employee> {
    const employee = await this.repository.findOneBy({ email });

    return employee;
  }
}
