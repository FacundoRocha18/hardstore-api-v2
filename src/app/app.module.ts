import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from '../products/products.module';
import { Product } from '../products/product.entity';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PWD,
      database: process.env.DATABASE,
      entities: [Product],
      synchronize: true, // Don't use synchronize: true on production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
