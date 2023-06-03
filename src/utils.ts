/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require('bcrypt');
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

export enum DeleteTypes {
  soft = '1',
  hard = '2',
}

export const hashPassword = async (password: string): Promise<string> => {
  let hashedPassword: string;

  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    throw new InternalServerErrorException('Ocurrió un error: ' + error);
  }

  return hashedPassword;
};

export const compareHashedPassword = (
  password: string,
  hashedPassword: string,
): boolean => {
  return bcrypt.compare(password, hashedPassword);
};

export const checkQueryResult = (queryResult: UpdateResult | DeleteResult) => {
  if (!queryResult.affected) {
    throw new HttpException(
      'Ocurrió un error inesperado al modificar los datos.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
