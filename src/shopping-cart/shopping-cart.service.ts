import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from './shopping-cart.entity';
import { Repository } from 'typeorm';
import { CreateShoppingCartDto } from './DTO/create-shopping-cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private repository: Repository<ShoppingCart>,
  ) {}

  create(body: CreateShoppingCartDto): Promise<ShoppingCart> {
    const cart = this.repository.create(body);

    return this.repository.save(cart);
  }
}
