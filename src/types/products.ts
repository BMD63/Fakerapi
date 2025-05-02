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

  export interface IUseProductListResult {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    filteredProducts: Product[];
    hasNextPage: boolean;
    isLoading: boolean;
    error: any;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleResetSearch: () => void;
  }