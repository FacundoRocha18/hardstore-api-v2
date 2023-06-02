import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
