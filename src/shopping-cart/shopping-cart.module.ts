import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shopping_Cart_Service } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { Shopping_Cart } from './shopping-cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shopping_Cart])],
  providers: [Shopping_Cart_Service],
  controllers: [ShoppingCartController],
})
export class ShoppingCartModule {}
