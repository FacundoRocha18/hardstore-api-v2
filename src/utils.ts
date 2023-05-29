/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require('bcrypt');
import { CreateCustomerDto } from './customers/DTO/create-customer.dto';

const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

export const validateCustomerData = (
  body: CreateCustomerDto,
): CreateCustomerDto => {
  return {
    name: body.name,
    email: body.email,
    password: hashPassword(body.password),
  };
};
