import { Body, Controller, Post } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './DTO/create-shopping-cart.dto';
import { IcreateResponse } from 'src/common.interfaces';

@Controller('cart')
export class ShoppingCartController {
  constructor(private readonly service: ShoppingCartService) {}

  @Post('/create')
  async create(@Body() body: CreateShoppingCartDto): Promise<IcreateResponse> {
    const cart = await this.service.create(body);

    return {
      ok: true,
      message:
        'El nuevo producto se guardó correctamente. Puede usar el ID del producto creado para buscarlo.',
      id: cart?.id,
    };
  }
}
