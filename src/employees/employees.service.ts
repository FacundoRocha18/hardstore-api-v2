import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { hashPassword } from 'src/utils';

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

  async createEmployee(body: CreateEmployeeDto): Promise<Employee> {
    const employee = await this.findEmployeeByEmail(body.email);
    let newEmployee: Employee;

    if (employee) {
      throw new BadRequestException(
        'Ya existe un empleado con esa dirección de email.',
      );
    }

    try {
      newEmployee = this.repository.create({
        ...body,
        password: await hashPassword(body.password),
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Ocurrió un error al crear el empleado: ${error}`,
      );
    }

    return this.repository.save(newEmployee);
  }
}
