import { UUID } from 'crypto';
import { Shopping_Cart } from 'src/shopping-cart/shopping-cart.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'customer' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ nullable: true, type: 'text' })
  name: string;

  @Column({ nullable: true, type: 'text' })
  email: string;

  @Column({ nullable: true, type: 'text' })
  password: string;

  @OneToOne(() => Shopping_Cart, {
    nullable: true,
  })
  @JoinColumn({ name: 'shopping_cart_id' })
  shopping_cart_id: Shopping_Cart;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
