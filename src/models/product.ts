export interface Image {
  url: string;
}

export interface Size {
  name: 'S' | 'M' | 'L' | 'XL' | 'XXL';
}

export interface Color {
  name?: string;
  code: 'white' | 'pink' | 'black' | 'yellow' | 'orange' | 'blue' | 'red';
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  amount: number;
  description: string;
  imageInfo: Image[];
  sizeInfo: Size[];
  colorInfo: Color[];
  isPromoted?: boolean;
  slug: string;
  status?: boolean;
  categoryId?: number;
}
