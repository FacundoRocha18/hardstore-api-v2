import {
  BadRequestException,
  NotFoundException,
  Body,
  Controller,
  Post,
  Get,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './DTO/create-customer.dto';
import {
  IcreateResponse,
  IfindOneResponse,
  IlistAllResponse,
} from 'src/common.interfaces';
import { validateCustomerData } from 'src/utils';
import { UUID } from 'crypto';
import { Customer } from './customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('/find')
  async findCustomerBy(
    @Query('id') id: UUID,
  ): Promise<IfindOneResponse<Customer>> {
    const customer = await this.customersService.findCustomerBy(id);

    if (!customer) {
      throw new NotFoundException('No se encontró el cliente.');
    }

    return {
      status_code: 200,
      status_message: 'Se encontró correctamente el cliente.',
      data: customer,
    };
  }

  @Get('/listAll')
  async listAllCustomers(): Promise<IlistAllResponse<Customer>> {
    const customers = await this.customersService.listAllCustomers();

    if (customers.length <= 0) {
      throw new NotFoundException('No se encontraron clientes.');
    }

    return {
      status_code: 200,
      status_message: 'Se encontraron correctamente los clientes.',
      data: customers,
    };
  }

  @Post('/create')
  async create(@Body() body: CreateCustomerDto): Promise<IcreateResponse> {
    let customer;

    try {
      customer = await this.customersService.createCustomer(
        validateCustomerData(body),
      );
    } catch (error) {
      throw new BadRequestException(
        'Ya existe un usuario con esa dirección de email.',
      );
    }

    return {
      status_code: 201,
      status_message: 'Registro exitoso',
      id: customer?.id,
    };
  }
}
