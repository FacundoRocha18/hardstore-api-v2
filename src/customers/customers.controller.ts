import { Body, Controller, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './DTO/create-customer.dto';
import { IcreateResponse } from 'src/common.interfaces';
import { validateCustomerData } from 'src/utils';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('/register')
  async register(@Body() body: CreateCustomerDto): Promise<IcreateResponse> {
    const registeredCustomer = await this.customersService.create(
      validateCustomerData(body),
    );

    return {
      ok: true,
      message: 'Registro exitoso',
      id: registeredCustomer?.id,
    };
  }
}
