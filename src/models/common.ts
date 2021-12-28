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

export interface PaymentResponse {
  data?: [];
  message?: string;
}
export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  name: string | undefined;
  categoryId: number | undefined;
  color: string[];
  size: string[];
  price?: number[];
  [key: string]: any;
}
