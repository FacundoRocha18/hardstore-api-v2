import {
  BadRequestException,
  NotFoundException,
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
import { CreateCustomerDto } from './DTO/create-customer.dto';
import {
  IcreateResponse,
  IdeleteResponse,
  IfindOneResponse,
  IlistAllResponse,
  IrestoreResponse,
  IupdateResponse,
} from 'src/common.interfaces';
import { checkQueryResult, compareHashedPassword } from 'src/utils';
import { UUID } from 'crypto';
import { Customer } from './customer.entity';
import { UpdateCustomerDto } from './DTO/update-customer.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Controller('customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/find')
  async findCustomerBy(
    @Query('id') id: UUID,
  ): Promise<IfindOneResponse<Customer>> {
    const customer = await this.service.findCustomerBy(id);

    if (!customer) {
      throw new NotFoundException('No se encontró el cliente.');
    }

    return {
      status_code: 200,
      status_message: 'Se encontró correctamente el cliente.',
      data: customer,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/list')
  async listAllCustomers(): Promise<IlistAllResponse<Customer>> {
    const customers = await this.service.listAllCustomers();

    if (customers.length <= 0) {
      throw new NotFoundException(
        'No se encontraron clientes. Esto puede deberse a que hayan sido eliminados',
      );
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
      customer = await this.service.createCustomer(body);
    } catch (error) {
      throw new BadRequestException(
        'Ya existe un usuario con esa dirección de email.' + error,
      );
    }

    return {
      status_code: 201,
      status_message: 'Registro exitoso',
      id: customer?.id,
    };
  }

  @Delete('/delete')
  async softDeleteCustomer(@Query('id') id: UUID): Promise<IdeleteResponse> {
    const customer = await this.service.findDeletedCustomerBy(id);

    if (!customer) {
      throw new NotFoundException(
        'No se encontró el cliente. Esto puede deberse a que el id es incorrecto.',
      );
    }

    if (customer.deleted_at) {
      throw new BadRequestException(
        'El cliente ya fue eliminado anteriormente.',
      );
    }

    if (process.env.DELETE_TYPE === 'hard') {
      checkQueryResult(await this.service.hardDeleteCustomerBy(id));

      return {
        status_code: 200,
        status_message: 'El cliente se eliminó correctamente.',
        id: id,
        deleted_timestamp: customer.deleted_at,
      };
    }

    checkQueryResult(await this.service.softDeleteCustomerBy(id));

    return {
      status_code: 200,
      status_message: 'El cliente se eliminó correctamente.',
      id: id,
      deleted_timestamp: customer.deleted_at,
    };
  }

  @Patch('/restore')
  async restoreCustomer(@Query('id') id: UUID): Promise<IrestoreResponse> {
    const customer = await this.service.findDeletedCustomerBy(id);

    if (!customer) {
      throw new NotFoundException(
        'No se encontró el cliente. Esto puede deberse a que el id es incorrecto.',
      );
    }

    checkQueryResult(await this.service.restoreDeletedCustomer(id));

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
    const customer = await this.service.findCustomerBy(id);

    if (!customer) {
      throw new NotFoundException(
        'No se encontró el cliente. Esto puede deberse a que el id enviado es incorrecto.',
      );
    }

    checkQueryResult(await this.service.updateCustomer(id, body));

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
    const customer = await this.service.findCustomerBy(id);

    if (!customer) {
      throw new NotFoundException(
        'No se encontró el cliente. Esto puede deberse a que el id es incorrecto.',
      );
    }

    if (!compareHashedPassword(body.actualPassword, customer.password)) {
      throw new BadRequestException('La contraseña ingresada es incorrecta.');
    }

    checkQueryResult(await this.service.changePassword(id, body));

    return {
      status_code: 201,
      status_message: 'Se cambió correctamente la contraseña.',
      updated_data: customer,
      updated_timestamp: customer.updated_at,
    };
  }
}
