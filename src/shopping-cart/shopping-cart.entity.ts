import { UUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShoppingCart {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;
}
