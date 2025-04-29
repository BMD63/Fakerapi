 import React,{ useState } from 'react';
 import { Link } from 'react-router-dom';
 
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
 interface ProducktResponse {
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
  return (
    <div>
      <h1>Главная страница</h1>
        </div>
      )
    }
    export default HomePage