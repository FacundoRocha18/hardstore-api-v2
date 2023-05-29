export interface IResponse {
  ok: boolean;
  message: string;
}

export interface IcreateResponse extends IResponse {
  id: UUID | undefined;
}

export interface IupdateResponse extends IResponse {
  updatedData: Product;
  updatedTimestamp: Date;
}

export interface IdeleteResponse extends IResponse {
  id: UUID;
  deletedTimestamp: Date;
}

export interface IrestoreResponse extends IResponse {
  id: UUID;
  restoredTimestamp: Date;
}
