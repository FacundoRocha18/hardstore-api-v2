import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Delete,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import {
  IcreateResponse,
  IdeleteResponse,
  IfindOneResponse,
  IlistAllResponse,
  IrestoreResponse,
  IupdateResponse,
} from 'src/common.interfaces';
import { UUID } from 'crypto';
import { Customer } from './customer.entity';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/find')
  async findCustomerBy(
    @Query('id') id: UUID,
  ): Promise<IfindOneResponse<Customer>> {
    return {
      status_code: 200,
      status_message: 'Se encontró correctamente el cliente.',
      data: await this.service.findCustomerBy(id),
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/list')
  async listAllCustomers(): Promise<IlistAllResponse<Customer>> {
    return {
      status_code: 200,
      status_message: 'Se encontraron correctamente los clientes.',
      data: await this.service.listAllCustomers(),
    };
  }

  @Post('/create')
  async create(@Body() body: CreateCustomerDto): Promise<IcreateResponse> {
    const customer = await this.service.createCustomer(body);

    return {
      status_code: 201,
      status_message: 'Registro exitoso',
      id: customer?.id,
    };
  }

  @Delete('/delete')
  async softDeleteCustomer(@Query('id') id: UUID): Promise<IdeleteResponse> {
    const customer = await this.service.deleteCustomerBy(id);

    return {
      status_code: 200,
      status_message: 'El cliente se eliminó correctamente.',
      id: id,
      deleted_timestamp: customer.deleted_at,
    };
  }

  @Patch('/restore')
  async restoreCustomer(@Query('id') id: UUID): Promise<IrestoreResponse> {
    const customer = await this.service.restoreDeletedCustomer(id);

    return {
      status_code: 200,
      status_message: 'Se restauró correctamente el cliente.',
      id: id,
      restored_timestamp: customer.updated_at,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/update')
  async updateCustomer(
    @Query('id') id: UUID,
    @Body() body: UpdateCustomerDto,
  ): Promise<IupdateResponse<Customer>> {
    const customer = await this.service.updateCustomer(id, body);

    return {
      status_code: 201,
      status_message: 'Se modificaron correctamente los datos del cliente.',
      updated_data: customer,
      updated_timestamp: customer.updated_at,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/change-password')
  async changePassword(
    @Query('id') id: UUID,
    @Body() body: UpdateCustomerDto,
  ): Promise<IupdateResponse<Customer>> {
    const customer = await this.service.changePassword(id, body);

    return {
      status_code: 201,
      status_message: 'Se cambió correctamente la contraseña.',
      updated_data: customer,
      updated_timestamp: customer.updated_at,
    };
  }
}
