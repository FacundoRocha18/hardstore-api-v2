import {
  BadRequestException,
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
import { ProductsService } from './products.service';
import { CreateProductDto } from './DTO/create-product.dto';
import { UUID } from 'crypto';
import { UpdateProductStockDto } from './DTO/update-product-stock.dto';
import { Product } from './product.entity';
import {
  IcreateResponse,
  IdeleteResponse,
  IfindOneResponse,
  IlistAllResponse,
  IrestoreResponse,
  IupdateResponse,
} from 'src/common.interfaces';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/find')
  async findOneBy(@Query('id') id: UUID): Promise<IfindOneResponse<Product>> {
    const product = await this.productsService.findProductBy(id);

    if (!product) {
      throw new NotFoundException('No se encontró el producto especificado.');
    }

    return {
      status_code: 200,
      status_message: 'El producto se encontró correctamente.',
      data: product,
    };
  }

  @Get('/listAll')
  async listAll(): Promise<IlistAllResponse<Product>> {
    const products = await this.productsService.listAllProducts();

    if (products.length <= 0) {
      throw new NotFoundException(
        'No se encontraron productos. Puedes crear un nuevo producto.',
      );
    }

    return {
      status_code: 200,
      status_message: 'Los productos se encontraron correctamente.',
      data: products,
    };
  }

  @Post('/create')
  async create(@Body() body: CreateProductDto): Promise<IcreateResponse> {
    let createdProduct;

    try {
      createdProduct = await this.productsService.createProduct(body);
    } catch (error) {
      throw new BadRequestException('Ya existe ese producto.');
    }

    return {
      status_code: 201,
      status_message:
        'El nuevo producto se guardó correctamente. Puede usar el ID del producto creado para buscarlo.',
      id: createdProduct?.id,
    };
  }

  @Patch('/update')
  async update(
    @Query('id') id: UUID,
    @Body() body: CreateProductDto,
  ): Promise<IupdateResponse<Product>> {
    const product = await this.productsService.findProductBy(id);

    if (!product) {
      throw new NotFoundException('No se encontró el producto especificado');
    }

    const queryResult = await this.productsService.updateProduct(id, body);

    if (!queryResult.affected) {
      throw new HttpException(
        'Ocurrió un error inesperado al modificar los datos.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      status_code: 201,
      status_message: 'Se modificaron los datos',
      updated_data: product,
      updated_timestamp: product.updated_at,
    };
  }

  @Patch('/updateStock')
  async updateStock(
    @Query('id') id: UUID,
    @Body() stock: UpdateProductStockDto,
  ): Promise<IupdateResponse<Product>> {
    const product = await this.productsService.findProductBy(id);

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
      status_code: 201,
      status_message: 'Se modificó el stock',
      updated_data: product,
      updated_timestamp: product.updated_at,
    };
  }

  @Delete('/delete')
  async deleteOneBy(@Query('id') id: UUID): Promise<IdeleteResponse> {
    const product = await this.productsService.findProductBy(id);

    if (!product) {
      throw new NotFoundException(`No se encontró el producto de ID: ${id}`);
    }

    const queryResult = await this.productsService.deleteProductBy(id);

    if (!queryResult.affected) {
      throw new HttpException(
        'Ocurrió un error inesperado al eliminar los datos.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      status_code: 200,
      status_message: 'Se eliminó correctamente el producto.',
      id: id,
      deleted_timestamp: product.deleted_at,
    };
  }

  @Patch('/restore')
  async restoreOneBy(@Query('id') id: UUID): Promise<IrestoreResponse> {
    const product = await this.productsService.findProductDeletedBy(id);

    if (!product) {
      throw new NotFoundException(`No se encontró el producto de ID: ${id}`);
    }

    const queryResult = await this.productsService.restoreProductBy(id);

    if (!queryResult.affected) {
      throw new HttpException(
        'Ocurrió un error inesperado al restaurar los datos.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      status_code: 200,
      status_message: 'Se restauro correctamente el producto.',
      id: id,
      restored_timestamp: product.updated_at,
    };
  }
}
