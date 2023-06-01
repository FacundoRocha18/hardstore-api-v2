import { UUID } from 'crypto';
import { Customer } from 'src/customers/customer.entity';
import { ShoppingCartItems } from 'src/shopping-cart-items/shopping-cart-items.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'shopping_cart' })
export class ShoppingCart {
  @OneToMany(
    () => ShoppingCartItems,
    (productsInShoppingCart) => productsInShoppingCart.id,
  )
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @OneToOne(() => Customer, (customer) => customer.id)
  @JoinColumn({ name: 'customer_id' })
  customer_id: Customer;

  @Column({ type: 'decimal', default: 0.0 })
  discount: number;

  @Column({ type: 'decimal', default: 0.0 })
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
