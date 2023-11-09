import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shopping_Cart_Item } from '../products-in-shopping-cart/shopping-cart-item.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ nullable: true, type: 'text' })
  name: string;

  @Column({ nullable: true, type: 'integer' })
  stock: number;

  @Column({ nullable: true, type: 'decimal' })
  price: number;

  @Column({ nullable: true, type: 'text' })
  created_by: string;

  @OneToOne(() => Shopping_Cart_Item)
  shopping_cart_items: Shopping_Cart_Item;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
