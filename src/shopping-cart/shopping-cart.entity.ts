import { UUID } from 'crypto';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shopping_Cart_Item } from '../products-in-shopping-cart/shopping-cart-item.entity';

@Entity()
export class Shopping_Cart {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @OneToMany(
    () => Shopping_Cart_Item,
    (shopping_cart_item) => shopping_cart_item.shopping_cart,
  )
  shopping_cart_items: Shopping_Cart_Item[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
