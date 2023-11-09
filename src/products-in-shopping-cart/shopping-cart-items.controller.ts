import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { Shopping_Cart_Item } from './shopping-cart-item.entity';
import { Shopping_Cart_Items_Service } from './shopping-cart-items.service';
import { Create_Shopping_Cart_Item_Dto } from './dto/create-shopping-cart-item.dto';
import { UUID } from 'crypto';
import { Shopping_Cart } from '../shopping-cart/shopping-cart.entity';

@Controller('cart-items')
export class Shopping_Cart_Items_Controller {
  constructor(private readonly service: Shopping_Cart_Items_Service) {}

  @Get('/list-products')
  async list_all_products(): Promise<Shopping_Cart_Item[]> {
    return await this.service.list();
  }

  @Get('/find-product')
  async find_one_product(@Query('id') id: UUID): Promise<Shopping_Cart_Item> {
    return await this.service.find(id);
  }

  @Post('/add-product')
  async add_product(
    @Body() body: Create_Shopping_Cart_Item_Dto,
  ): Promise<Shopping_Cart> {
    const { shopping_cart_id, product_id } = body;

    return await this.service.add(body, shopping_cart_id, product_id);
  }
}
