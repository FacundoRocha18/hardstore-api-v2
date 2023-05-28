import { UUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column()
  stock: number;

  @Column()
  price: number;

  @Column()
  createdBy: string;

  @Column('timestamptz', { default: 'now' })
  createdAt: Timestamp;
}
