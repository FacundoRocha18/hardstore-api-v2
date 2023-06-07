/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { ProductsModule } from './products/products.module';
import { Customer } from './customers/customer.entity';
import { CustomersModule } from './customers/customers.module';
import { ShoppingCart } from './shopping-cart/shopping-cart.entity';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { ShoppingCartItems } from './shopping-cart-items/shopping-cart-items.entity';
import { ShoppingCartItemsModule } from './shopping-cart-items/shopping-cart-items.module';
import { EmployeesModule } from './employees/employees.module';
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
      entities: [Product, Customer, ShoppingCart, ShoppingCartItems],
      synchronize: Boolean(process.env.DATABASE_SYNC), // Don't use synchronize: true on production
    }),
    ProductsModule,
    CustomersModule,
    ShoppingCartModule,
    ShoppingCartItemsModule,
    EmployeesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
