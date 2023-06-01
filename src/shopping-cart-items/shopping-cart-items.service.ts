import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCartItems } from './shopping-cart-items.entity';
import { Repository } from 'typeorm';
import { CreateShoppingCartItemsDto } from './DTO/create-shopping-cart-items.dto';
import { UUID } from 'crypto';

@Injectable()
export class ShoppingCartItemsService {
  constructor(
    @InjectRepository(ShoppingCartItems)
    private repository: Repository<ShoppingCartItems>,
  ) {}

  findOneBy(id: UUID): Promise<ShoppingCartItems> {
    return this.repository.findOneBy({ id });
  }

  create(body: CreateShoppingCartItemsDto): Promise<ShoppingCartItems> {
    const item = this.repository.create(body);

    return this.repository.save(item);
  }
}
