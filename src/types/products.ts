// src/types/index.ts
export interface Product {
    id: number;
    name: string;
    description: string;
    ean: string;
    upc: string;
    image: string;
    images: { title: string; description: string; url: string }[];
    net_price: number;
    taxes: number;
    price: number;
    categories: number[];
    tags: string[];
  }
  
  export interface ProductsResponse {
    status: string;
    code: number;
    locale: string;
    seed: number | null;
    total: number;
    data: Product[];
  }