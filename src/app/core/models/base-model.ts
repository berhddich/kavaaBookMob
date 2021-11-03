export class DefaultBaseModel implements IDefaultModel {
  id: number;
}
export interface IDefaultModel extends IModel<number> {
  id: number;
}
export interface IModel<TPrimaryKey> {
  id: TPrimaryKey;
}
export interface ApiResultDto {
  result: any;
  targetUrl?: any;
  success: boolean;
  error?: any;
  unAuthorizedRequest: boolean;
}
export interface PagedResultDto {
  items: any[];
  totalCount: number;
}

