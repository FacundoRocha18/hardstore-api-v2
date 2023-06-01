import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from './shopping-cart.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateShoppingCartDto } from './DTO/create-shopping-cart.dto';
import { UUID } from 'crypto';
import { UpdateShoppingCartDto } from './DTO/update-shopping-cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private repository: Repository<ShoppingCart>,
  ) {}

  findOneBy(id: UUID): Promise<ShoppingCart> {
    return this.repository.findOneBy({ id });
  }

  create(body: CreateShoppingCartDto): Promise<ShoppingCart> {
    const cart = this.repository.create(body);

    return this.repository.save(cart);
  }

  update(id: UUID, body: UpdateShoppingCartDto): Promise<UpdateResult> {
    return this.repository.update(id, body);
  }
}
