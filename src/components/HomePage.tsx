 import React,{ useState, useEffect } from 'react';
 import { useGetProductsQuery } from '../services/productsApi';
 import { Link } from 'react-router-dom';
 import styles from '../styles/HomePage.module.scss';
 
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
    seed: number|null;
    total: number;
    data: Product[];
 }
 
 const HomePage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const {data: ProductsResponse, isLoading, error} = useGetProductsQuery(page);
    const allProducts: Product[] = ProductsResponse?.data || [];
  return (
    <div>
      <h1>Главная страница</h1>
        </div>
      )
    }
    export default HomePage