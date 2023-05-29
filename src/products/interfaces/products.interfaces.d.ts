import { UUID } from 'crypto';
import { Product } from '../product.entity';
import { IResponse } from 'src/common.interfaces';

export interface IfindOneByIdResponse extends IResponse {
  data: Itask;
}

export interface IlistAllResponse extends IResponse {
  data: Itask[];
}

export interface IcreateResponse extends IResponse {
  createdProductId: UUID | undefined;
}

export interface IupdateResponse extends IResponse {
  updatedProductData: Product;
  updatedTimestamp: Date;
}

export interface IupdateStockResponse extends IResponse {
  updatedProductId: UUID;
  newStock: number;
  updatedTimestamp: Date;
}

export interface IdeleteResponse extends IResponse {
  deletedProductId: UUID;
  deletedTimestamp: Date;
}

export interface IrestoreResponse extends IResponse {
  restoredProductId: UUID;
  restoredTimestamp: Date;
}
