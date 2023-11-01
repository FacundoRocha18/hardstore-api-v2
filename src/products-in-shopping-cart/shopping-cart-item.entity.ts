import { UUID } from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';
import { Shopping_Cart } from '../shopping-cart/shopping-cart.entity';

@Entity({ name: 'shopping_cart_items' })
export class Shopping_Cart_Item {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  quantity: number;

  @Column()
  unit_price: number;

  @Column()
  subtotal: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product' })
  product: Product;

  @ManyToOne(
    () => Shopping_Cart,
    (shopping_cart) => shopping_cart.shopping_cart_items,
  )
  shopping_cart: Shopping_Cart;
}
