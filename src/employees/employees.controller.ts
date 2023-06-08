import { Body, Controller, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { IcreateResponse } from 'src/common.interfaces';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly service: EmployeesService) {}

  @Post('/create')
  async create(@Body() body: CreateEmployeeDto): Promise<IcreateResponse> {
    const employee = await this.service.createEmployee(body);

    return {
      status_code: 201,
      status_message: 'Registro de empleado exitoso',
      id: employee?.id,
    };
  }
}
