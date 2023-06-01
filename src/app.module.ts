/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { ProductsModule } from './products/products.module';
import { Customer } from './customers/customer.entity';
import { CustomersModule } from './customers/customers.module';
import { ShoppingCart } from './shopping-cart/shopping-cart.entity';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { ProductsInShoppingCart } from './products-in-shopping-cart/products-in-shopping-cart.entity';
import { ProductsInShoppingCartModule } from './products-in-shopping-cart/products-in-shopping-cart.module';
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
      entities: [Product, Customer, ShoppingCart, ProductsInShoppingCart],
      synchronize: true, // Don't use synchronize: true on production
    }),
    ProductsModule,
    CustomersModule,
    ShoppingCartModule,
    ProductsInShoppingCartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
