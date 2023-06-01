import { IsUUID } from 'class-validator';
import { Customer } from 'src/customers/customer.entity';

export class CreateShoppingCartDto {
  @IsUUID()
  customer_id: Customer;
}
