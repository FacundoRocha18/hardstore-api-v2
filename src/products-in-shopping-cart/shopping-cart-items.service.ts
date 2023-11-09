import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shopping_Cart_Item } from './shopping-cart-item.entity';
import { UUID } from 'crypto';
import { Create_Shopping_Cart_Item_Dto } from './dto/create-shopping-cart-item.dto';
import { Products_Service } from '../products/products.service';
import { Shopping_Cart_Service } from '../shopping-cart/shopping-cart.service';
import { Shopping_Cart } from '../shopping-cart/shopping-cart.entity';

@Injectable()
export class Shopping_Cart_Items_Service {
  constructor(
    @InjectRepository(Shopping_Cart_Item)
    private readonly repository: Repository<Shopping_Cart_Item>,
    private readonly products_service: Products_Service,
    private readonly shopping_cart_service: Shopping_Cart_Service,
  ) {}

  async list(): Promise<Shopping_Cart_Item[]> {
    return await this.repository.find({
      relations: {
        product: true,
      },
    });
  }

  async find(id: UUID): Promise<Shopping_Cart_Item> {
    const product = await this.repository.findOne({
      where: { id },
      relations: {
        product: true,
      },
    });

    if (!product) {
      throw new NotFoundException('No se encontró el producto en el carrito');
    }

    return product;
  }

  async add(
    body: Partial<Create_Shopping_Cart_Item_Dto>,
    shopping_cart_id: UUID,
    product_id: UUID,
  ): Promise<Shopping_Cart> {
    const { quantity } = body;
    const product = await this.products_service.findOneBy(product_id);
    const shopping_cart = await this.shopping_cart_service.find(
      shopping_cart_id,
    );
    const subtotal = product.price * quantity;

    const shopping_cart_item = this.repository.create({
      product,
      shopping_cart,
      quantity,
      unit_price: product.price,
      subtotal,
    });

    const result = await this.repository.save(shopping_cart_item);

    return result.shopping_cart;
  }

  async update(
    id: UUID,
    attrs: Partial<Create_Shopping_Cart_Item_Dto>,
  ): Promise<Shopping_Cart_Item> {
    const cart_item = await this.repository.findOne({
      where: { id },
      relations: {
        product: true,
        shopping_cart: true,
      },
    });

    if (!cart_item) {
      throw new NotFoundException('No se encontró el item del carrito');
    }

    Object.assign(cart_item, attrs);

    return await this.repository.save(cart_item);
  }
}
