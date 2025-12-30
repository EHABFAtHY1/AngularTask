
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../types';

class ProductService {
  private productsSubject: BehaviorSubject<Product[]>;
  public products$: Observable<Product[]>;

  constructor() {
    const initialData: Product[] = [
      { id: '1', name: 'Premium Laptop', price: 1299.99, stock: 5 },
      { id: '2', name: 'Wireless Headphones', price: 199.50, stock: 0 },
      { id: '3', name: 'Mechanical Keyboard', price: 149.00, stock: 12 },
    ];
    this.productsSubject = new BehaviorSubject<Product[]>(initialData);
    this.products$ = this.productsSubject.asObservable();
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  addProduct(product: Omit<Product, 'id'>): void {
    const current = this.productsSubject.value;
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substring(7)
    };
    this.productsSubject.next([...current, newProduct]);
  }

  deleteProduct(id: string): void {
    const filtered = this.productsSubject.value.filter(p => p.id !== id);
    this.productsSubject.next(filtered);
  }
}

export const productService = new ProductService();
