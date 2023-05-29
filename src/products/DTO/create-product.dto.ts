import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  stock: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsString()
  created_by: string;
}
