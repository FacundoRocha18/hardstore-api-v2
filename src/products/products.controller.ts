import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Products_Service } from './products.service';
import { CreateProductDto } from './DTO/create-product.dto';
import {
  IcreateResponse,
  IlistAllResponse,
  IfindOneByIdResponse,
  IupdateResponse,
  IdeleteResponse,
  IrestoreResponse,
  IupdateStockResponse,
} from './interfaces/products.interfaces';
import { UUID } from 'crypto';
import { UpdateProductStockDto } from './DTO/update-product-stock.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: Products_Service) {}

  @Get('/find')
  async findOneBy(@Query('id') id: UUID): Promise<IfindOneByIdResponse> {
    const product = await this.productsService.findOneBy(id);

    if (!product) {
      throw new NotFoundException('No se encontró el producto especificado.');
    }

    return {
      ok: true,
      message: 'El producto se encontró correctamente.',
      data: product,
    };
  }

  @Get('/listAll')
  async listAll(): Promise<IlistAllResponse> {
    const products = await this.productsService.listAll();

    if (products.length <= 0) {
      throw new NotFoundException(
        'No se encontraron productos. Puedes crear un nuevo producto.',
      );
    }

    return {
      ok: true,
      message: 'Los productos se encontraron correctamente.',
      data: products,
    };
  }

  @Post('/create')
  async create(@Body() body: CreateProductDto): Promise<IcreateResponse> {
    const createdProduct = await this.productsService.create(body);

    return {
      ok: true,
      message:
        'El nuevo producto se guardó correctamente. Puede usar el ID del producto creado para buscarlo.',
      createdProductId: createdProduct?.id,
    };
  }

  @Patch('/update')
  async update(
    @Query('id') id: UUID,
    @Body() body: CreateProductDto,
  ): Promise<IupdateResponse> {
    const product = await this.productsService.findOneBy(id);

    if (!product) {
      throw new NotFoundException('No se encontró el producto especificado');
    }

    const queryResult = await this.productsService.update(id, body);

    if (!queryResult.affected) {
      throw new HttpException(
        'Ocurrió un error inesperado al modificar los datos.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      ok: true,
      message: 'Se modificó el stock',
      updatedProductData: product,
      updatedTimestamp: new Date(),
    };
  }

  @Patch('/updateStock')
  async updateStock(
    @Query('id') id: UUID,
    @Body() stock: UpdateProductStockDto,
  ): Promise<IupdateStockResponse> {
    const product = await this.productsService.findOneBy(id);

    if (!product) {
      throw new NotFoundException('No se encontró el producto especificado');
    }

    const queryResult = await this.productsService.updateStock(id, stock);

    if (!queryResult.affected) {
      throw new HttpException(
        'Ocurrió un error inesperado al modificar los datos.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      ok: true,
      message: 'Se modificó el stock',
      updatedProductId: product.id,
      newStock: product.stock,
      updatedTimestamp: new Date(),
    };
  }

  @Delete('/delete')
  async deleteOneBy(@Query('id') id: UUID): Promise<IdeleteResponse> {
    const product = await this.productsService.findOneBy(id);

    if (!product) {
      throw new NotFoundException(`No se encontró el producto de ID: ${id}`);
    }

    const queryResult = await this.productsService.deleteOneBy(id);

    if (!queryResult.affected) {
      throw new HttpException(
        'Ocurrió un error inesperado al eliminar los datos.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      ok: true,
      message: 'Se eliminó correctamente el producto.',
      deletedProductId: id,
      deletedTimestamp: new Date(),
    };
  }

  @Patch('/restore')
  async restoreOneBy(@Query('id') id: UUID): Promise<IrestoreResponse> {
    const product = await this.productsService.findDeletedBy(id);

    if (!product) {
      throw new NotFoundException(`No se encontró el producto de ID: ${id}`);
    }

    const queryResult = await this.productsService.restoreOneBy(id);

    if (!queryResult.affected) {
      throw new HttpException(
        'Ocurrió un error inesperado al restaurar los datos.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      ok: true,
      message: 'Se restauro correctamente el producto.',
      restoredProductId: id,
      restoredTimestamp: new Date(),
    };
  }
}
