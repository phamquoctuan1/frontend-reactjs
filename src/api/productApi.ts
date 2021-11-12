import { ListParams, ListResponse, Product, ProductResponse } from 'models';
import axiosClient from './axiosClient';

const productApi = {
  getAll(params: ListParams): Promise<ListResponse<Product>> {
    const url = '/product';
    return axiosClient.get(url, { params });
  },
  search(params: string): Promise<ListResponse<Product>> {
    const url = '/product/search';
    return axiosClient.get(url, { params });
  },
  getBySlug(slug: string | undefined): Promise<ProductResponse> {
    const url = `/product/slug/${slug}`;
    return axiosClient.get(url);
  },

  add(data: Product): Promise<Product> {
    const url = '/products';
    return axiosClient.post(url, data);
  },
  update(data: Partial<Product>): Promise<Product> {
    const url = `/products/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id: number): Promise<any> {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
