import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { ShoppingCartItemsService } from './shopping-cart-items.service';
import { CreateShoppingCartItemsDto } from './DTO/create-shopping-cart-items.dto';
import { IcreateResponse, IfindOneResponse } from 'src/common.interfaces';
import { UUID } from 'crypto';
import { ShoppingCartItems } from './shopping-cart-items.entity';

@Controller('/cart-items')
export class ShoppingCartItemsController {
  constructor(private readonly service: ShoppingCartItemsService) {}

  @Get('/find')
  async findOneBy(
    @Query('id') id: UUID,
  ): Promise<IfindOneResponse<ShoppingCartItems>> {
    const item = await this.service.findOneBy(id);

    if (!item) {
      throw new NotFoundException('No hay items en el carrito');
    }

    return {
      status_code: 200,
      status_message: 'Se recuperaron los items del carrito.',
      data: item,
    };
  }

  @Post('/add')
  async create(
    @Body() body: CreateShoppingCartItemsDto,
  ): Promise<IcreateResponse> {
    const item = await this.service.create(body);

    return {
      status_code: 201,
      status_message: 'Se agregó el producto al carrito.',
      id: item.id,
    };
  }
}
