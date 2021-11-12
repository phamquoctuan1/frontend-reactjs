export interface Category {
  id?: number;
  parentId?: number;
  name: string;
  slug: string;
  children: Category[];
}
