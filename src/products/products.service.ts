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
    private repository: Repository<Product>,
  ) {}

  findProductBy(id: UUID): Promise<Product | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  findProductDeletedBy(id: UUID): Promise<Product | null> {
    return this.repository.findOne({
      withDeleted: true,
      where: { id },
    });
  }

  listAllProducts(): Promise<Product[] | null> {
    return this.repository.find();
  }

  createProduct(body: CreateProductDto): Promise<Product> {
    const product = this.repository.create(body);

    return this.repository.save(product);
  }

  updateProduct(id: UUID, body: CreateProductDto): Promise<UpdateResult> {
    return this.repository.update(id, body);
  }

  updateStock(id: UUID, stock: UpdateProductStockDto): Promise<UpdateResult> {
    return this.repository.update(id, stock);
  }

  deleteProductBy(id: UUID): Promise<DeleteResult> {
    return this.repository.softDelete({ id });
  }

  restoreProductBy(id: UUID) {
    return this.repository.restore(id);
  }
}
