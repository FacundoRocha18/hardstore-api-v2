import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'integer', default: 0 })
  stock: number;

  @Column({ type: 'decimal', default: 0.0 })
  price: number;

  @Column({ type: 'text', default: '' })
  uploaded_by: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
