import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useMemo } from 'react';
import { BASE_API_URL } from '../constants';
import { Product, ProductsResponse} from '../types/products';

const generateSeed = () => Math.floor(Math.random() * 10000);

const currentSeed = generateSeed(); // Генерируем seed один раз при загрузке модуля

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { page: number; quantity: number }>({ 
      query: ({ page = 1, quantity = 10 }) => `/products?_quantity=${quantity}&_page=${page}&_seed=${currentSeed}`,
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
  return useMemo(() => currentSeed, []); 
};