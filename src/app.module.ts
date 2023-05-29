/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { Customer } from './customers/customer.entity';
import { ShoppingCart } from './shopping-cart/shopping-cart.entity';
import { ProductsInShoppingCartModule } from './products_in_shopping_cart/products_in_shopping_cart.module';
import { CustomersModule } from './customers/customers.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
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
      entities: [Product, Customer, ShoppingCart],
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
