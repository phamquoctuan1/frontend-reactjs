export interface Product {
  id?: number;
  name: string;
  price?: number;
  amount?: number;
  description?: string;
  isPromoted?: boolean;
  slug?: string;
  status?: boolean;
  categoryId?: number;
}
