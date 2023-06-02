/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require('bcrypt');
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateCustomerDto } from './customers/DTO/create-customer.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

export enum DeleteTypes {
  soft = 'soft',
  hard = 'hard',
}

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

export const checkQueryResult = (queryResult: UpdateResult | DeleteResult) => {
  if (!queryResult.affected) {
    throw new HttpException(
      'Ocurrió un error inesperado al eliminar los datos.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
