import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shopping_Cart_Item } from './shopping-cart-item.entity';
import { Shopping_Cart_Items_Service } from './shopping-cart-items.service';
import { Shopping_Cart_Items_Controller } from './shopping-cart-items.controller';
import { Shopping_Cart_Service } from '../shopping-cart/shopping-cart.service';
import { Products_Service } from '../products/products.service';
import { Product } from '../products/product.entity';
import { Shopping_Cart } from '../shopping-cart/shopping-cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shopping_Cart_Item, Shopping_Cart, Product]),
  ],
  providers: [
    Shopping_Cart_Items_Service,
    Shopping_Cart_Service,
    Products_Service,
  ],
  controllers: [Shopping_Cart_Items_Controller],
})
export class Shopping_Cart_Items_Module {}
