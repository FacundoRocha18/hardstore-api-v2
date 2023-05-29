import { IsNumber } from 'class-validator';

export class UpdateProductStockDto {
  @IsNumber()
  stock: number;
}
