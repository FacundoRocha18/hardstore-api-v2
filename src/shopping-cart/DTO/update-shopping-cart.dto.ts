import { IsDecimal } from 'class-validator';

export class UpdateShoppingCartDto {
  @IsDecimal(
    { decimal_digits: '2' },
    { message: 'El valor del campo Discount no es un número decimal válido' },
  )
  discount: number;

  @IsDecimal(
    { decimal_digits: '2' },
    { message: 'El valor del campo Total no es un número decimal válido' },
  )
  total: number;
}
