import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartItems } from './shopping-cart-items.entity';
import { ShoppingCartItemsService } from './shopping-cart-items.service';
import { ShoppingCartItemsController } from './shopping-cart-items.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCartItems])],
  providers: [ShoppingCartItemsService],
  controllers: [ShoppingCartItemsController],
})
export class ShoppingCartItemsModule {}
