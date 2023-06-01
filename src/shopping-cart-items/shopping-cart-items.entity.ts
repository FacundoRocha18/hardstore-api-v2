import { UUID } from 'crypto';
import { Product } from 'src/products/product.entity';
import { ShoppingCart } from 'src/shopping-cart/shopping-cart.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'shopping_cart_items' })
export class ShoppingCartItems {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.id)
  @JoinColumn({ name: 'shopping_cart_id' })
  shopping_cart_id: ShoppingCart;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product_id: Product;

  @Column({ type: 'int', nullable: true })
  quantity: number;

  @Column({ type: 'decimal', nullable: true })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
