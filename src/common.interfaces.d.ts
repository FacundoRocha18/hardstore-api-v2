import { UUID } from 'crypto';

export interface IResponse {
  status_code: number;
  status_message: string;
}

export interface IfindOneResponse<T> extends IResponse {
  data: T;
}

export interface IlistAllResponse<T> extends IResponse {
  data: T[];
}

export interface IcreateResponse extends IResponse {
  id: UUID | undefined;
}

export interface IupdateResponse<T> extends IResponse {
  updated_data: T;
  updated_timestamp: Date;
}

export interface IdeleteResponse extends IResponse {
  id: UUID;
  deleted_timestamp: Date;
}

export interface IrestoreResponse extends IResponse {
  id: UUID;
  restored_timestamp: Date;
}
