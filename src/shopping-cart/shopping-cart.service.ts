import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shopping_Cart } from './shopping-cart.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class Shopping_Cart_Service {
  constructor(
    @InjectRepository(Shopping_Cart)
    private readonly repository: Repository<Shopping_Cart>,
  ) {}

  async list(): Promise<Shopping_Cart[]> {
    return this.repository.find({
      relations: {
        shopping_cart_items: {
          product: true,
        },
      },
    });
  }

  async find(id: UUID): Promise<Shopping_Cart> {
    const cart = await this.repository.findOne({
      where: { id },
      relations: {
        shopping_cart_items: {
          product: true,
        },
      },
    });

    if (!cart) {
      throw new NotFoundException('No se encontró el carrito');
    }

    return cart;
  }
}
