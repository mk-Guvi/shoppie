export interface Product {
    id: string | number;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    discountPercentage?: number;
    imageUrl: string;
  }
  