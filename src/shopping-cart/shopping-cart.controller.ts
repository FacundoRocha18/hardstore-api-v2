import { Body, Controller, Post } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './DTO/create-shopping-cart.dto';
import { IcreateResponse } from 'src/common.interfaces';

@Controller('cart')
export class ShoppingCartController {
  constructor(private readonly service: ShoppingCartService) {}

	@Post('/create')
	async create(@Body() body: CreateShoppingCartDto): Promise<IcreateResponse> {
		
	}
}
