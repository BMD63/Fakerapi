import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useMemo } from 'react';
import { BASE_API_URL } from '../constants';

interface Product {
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

interface ProductsResponse {
  status: string;
  code: number;
  locale: string;
  seed: number | null;
  total: number;
  data: Product[];
}

const generateSeed = () => Math.floor(Math.random() * 10000);

const currentSeed = generateSeed(); // Генерируем seed один раз при загрузке модуля

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, number>({
      query: (page = 1) => `/products?_quantity=10&_page=${page}&_seed=${currentSeed}`,
      transformResponse: (response: ProductsResponse) => response,
    }),
    getProductById: builder.query<Product, string>({
      query: (id: string) => `/products?_id=${id}&_seed=${currentSeed}`,
      transformResponse: (response: ProductsResponse) => response.data[0],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;

export const useProductApiSeed = () => {
  return useMemo(() => currentSeed, []); // Возвращаем тот же seed
};