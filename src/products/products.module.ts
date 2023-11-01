import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products_Service } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [Products_Service],
  controllers: [ProductsController],
})
export class ProductsModule {}
