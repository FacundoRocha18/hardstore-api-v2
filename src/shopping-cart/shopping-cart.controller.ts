import { Controller, Get, Query } from '@nestjs/common';
import { Shopping_Cart_Service } from './shopping-cart.service';
import { Shopping_Cart } from './shopping-cart.entity';
import { UUID } from 'crypto';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly service: Shopping_Cart_Service) {}

  @Get('/list')
  async list_all(): Promise<Shopping_Cart[]> {
    return await this.service.list();
  }

  @Get('/find')
  async find_one(@Query('id') id: UUID): Promise<Shopping_Cart> {
    return await this.service.find(id);
  }
}
