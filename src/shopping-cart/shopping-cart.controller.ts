import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './DTO/create-shopping-cart.dto';
import {
  IcreateResponse,
  IfindOneResponse,
  IupdateResponse,
} from 'src/common.interfaces';
import { UUID } from 'crypto';
import { UpdateShoppingCartDto } from './DTO/update-shopping-cart.dto';
import { ShoppingCart } from './shopping-cart.entity';

@Controller('cart')
export class ShoppingCartController {
  constructor(private readonly service: ShoppingCartService) {}

  @Get('/find')
  async findOneBy(
    @Query('id') id: UUID,
  ): Promise<IfindOneResponse<ShoppingCart>> {
    const cart = await this.service.findOneBy(id);

    if (!cart) {
      throw new NotFoundException('Este usuario no tiene un carrito asignado.');
    }

    return {
      status_code: 200,
      status_message: 'El carrito se encontró correctamente.',
      data: cart,
    };
  }

  @Post('/create')
  async create(@Body() body: CreateShoppingCartDto): Promise<IcreateResponse> {
    let cart;

    try {
      cart = await this.service.create(body);
    } catch (error) {
      throw new BadRequestException('Ya existe un carrito para este usuario');
    }

    return {
      status_code: 201,
      status_message: 'Se creó el carrito correctamente',
      id: cart?.id,
    };
  }

  @Patch('/update')
  async update(
    @Query('id') id: UUID,
    @Body() body: UpdateShoppingCartDto,
  ): Promise<IupdateResponse<ShoppingCart>> {
    const cart = await this.service.findOneBy(id);

    if (!cart) {
      throw new NotFoundException('No se encontró un carrito');
    }

    const queryResult = await this.service.update(id, body);

    if (!queryResult.affected) {
      throw new HttpException(
        'Ocurrió un error inesperado al modificar los datos.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      status_code: 201,
      status_message: 'Se modificaron los datos',
      updated_data: cart,
      updated_timestamp: cart.updated_at,
    };
  }
}
