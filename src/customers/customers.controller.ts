import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './DTO/create-customer.dto';
import { IcreateResponse } from 'src/common.interfaces';
import { validateCustomerData } from 'src/utils';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('/create')
  async create(@Body() body: CreateCustomerDto): Promise<IcreateResponse> {
    let customer;

    try {
      customer = await this.customersService.create(validateCustomerData(body));
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
