import { Category, ListResponse } from 'models';
import axiosClient from './axiosClient';

const categoryApi = {
  getAll(): Promise<ListResponse<Category>> {
    const url = '/category/parent';
    return axiosClient.get(url);
  },
};

export default categoryApi;
