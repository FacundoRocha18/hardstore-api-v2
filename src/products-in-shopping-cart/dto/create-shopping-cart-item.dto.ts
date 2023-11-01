import { IsNumber, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class Create_Shopping_Cart_Item_Dto {
  @IsUUID()
  shopping_cart_id: UUID;

  @IsUUID()
  product_id: UUID;

  @IsNumber()
  quantity: number;
}
