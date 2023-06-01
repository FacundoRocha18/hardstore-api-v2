import { IsDecimal, IsNumber, IsUUID } from 'class-validator';
import { Product } from 'src/products/product.entity';
import { ShoppingCart } from 'src/shopping-cart/shopping-cart.entity';

export class CreateShoppingCartItemsDto {
  @IsUUID()
  shopping_cart_id: ShoppingCart;

  @IsUUID()
  product_id: Product;

  @IsNumber()
  quantity: number;

  @IsDecimal({ decimal_digits: '2' })
  price: number;
}
