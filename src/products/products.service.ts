import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UUID } from 'crypto';
import { CreateProductDto } from './DTO/create-product.dto';
import { UpdateProductStockDto } from './DTO/update-product-stock.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findOneBy(id: UUID): Promise<Product | null> {
    return this.productsRepository.findOne({
      where: { id },
    });
  }

  findDeletedBy(id: UUID): Promise<Product | null> {
    return this.productsRepository.findOne({
      where: { id },
      withDeleted: true,
    });
  }

  listAll(): Promise<Product[] | null> {
    return this.productsRepository.find();
  }

  create(body: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(body);

    return this.productsRepository.save(product);
  }

  update(id: UUID, body: CreateProductDto): Promise<UpdateResult> {
    return this.productsRepository.update(id, body);
  }

  updateStock(id: UUID, stock: UpdateProductStockDto): Promise<UpdateResult> {
    return this.productsRepository.update(id, stock);
  }

  deleteOneBy(id: UUID): Promise<DeleteResult> {
    return this.productsRepository.softDelete({ id });
  }

  restoreOneBy(id: UUID) {
    return this.productsRepository.restore(id);
  }
}
