import { Product, User } from 'models';

export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface ProductResponse {
  status: string;
  data: Product;
}
export interface UserRespone {
  accessToken: string;
  refreshToken?: string;
}
export interface UserResponeGoogle {
  data: User;
  token: string;
}
export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  [key: string]: any;
}
