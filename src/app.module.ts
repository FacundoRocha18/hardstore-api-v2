/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { Customer } from './customers/customer.entity';
import { Shopping_Cart } from './shopping-cart/shopping-cart.entity';
import { Shopping_Cart_Items_Module } from './products-in-shopping-cart/shopping-cart-items.module';
import { CustomersModule } from './customers/customers.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { Shopping_Cart_Item } from './products-in-shopping-cart/shopping-cart-item.entity';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PWD,
      database: process.env.DATABASE,
      entities: [Product, Customer, Shopping_Cart, Shopping_Cart_Item],
      synchronize: true, // Don't use synchronize: true on production
    }),
    ProductsModule,
    CustomersModule,
    ShoppingCartModule,
    Shopping_Cart_Items_Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
