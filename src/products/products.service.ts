import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UUID } from 'crypto';
import { CreateProductDto } from './DTO/create-product.dto';
import { UpdateProductStockDto } from './DTO/update-product-stock.dto';

@Injectable()
export class Products_Service {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) {}

  findOneBy(id: UUID): Promise<Product | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  findDeletedBy(id: UUID): Promise<Product | null> {
    return this.repository.findOne({
      where: { id },
      withDeleted: true,
    });
  }

  listAll(): Promise<Product[] | null> {
    return this.repository.find();
  }

  create(body: CreateProductDto): Promise<Product> {
    const product = this.repository.create(body);

    return this.repository.save(product);
  }

  update(id: UUID, body: CreateProductDto): Promise<UpdateResult> {
    return this.repository.update(id, body);
  }

  updateStock(id: UUID, stock: UpdateProductStockDto): Promise<UpdateResult> {
    return this.repository.update(id, stock);
  }

  deleteOneBy(id: UUID): Promise<DeleteResult> {
    return this.repository.softDelete({ id });
  }

  restoreOneBy(id: UUID) {
    return this.repository.restore(id);
  }
}
