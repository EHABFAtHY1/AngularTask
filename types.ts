
export interface User {
  email: string;
  token: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export enum ProductStatus {
  IN_STOCK = 'In Stock',
  OUT_OF_STOCK = 'Out of Stock'
}
