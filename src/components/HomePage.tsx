 import React,{ useState, useEffect } from 'react';
 import { useGetProductsQuery } from '../services/productsApi';
 import { Link } from 'react-router-dom';
 import styles from './HomePage.module.scss';
 
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
    const {data: productsResponse, isLoading, error} = useGetProductsQuery(page);
    const allProducts: Product[] = productsResponse?.data || [];
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
    const [hasNextPage, setHasNextPage] = useState(true);

    // Фильтрация продуктов по поисковому запросу
    useEffect(() => {
      setFilteredProducts(
        allProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, [allProducts, searchTerm]);


    // Пагинация

    // Проверка наличия следующей страницы для пагинации
    useEffect(() => {
      setHasNextPage(productsResponse?.total ? productsResponse.total > page * 10 : false);
    }, [productsResponse?.total, page])

    // Назад
    const handlePreviousPage = () => {
      if (page > 1) {
        setPage((prevPage) => prevPage - 1);
      }
    };
    // Вперед
    const handleNextPage = () => {
      if (hasNextPage) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    // Поиск
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };
    // Сброс поиска
    const handleResetSearch = () => {
      setSearchTerm('');
    };    

    if (isLoading) {
      return <div>Загрузка продуктов...</div>;
    }

    if (error) {
      return <div>Произошла ошибка загрузки продуктов</div>;
    }


  return (
    <div className={styles.container}>
      <input type="text" 
      placeholder="Поиск" 
      value={searchTerm} 
      onChange={handleSearch} 
      />
      <button onClick={handleResetSearch}>Сбросить поиск</button>

      <ul className={styles.productList}>
        {filteredProducts.map((product) => (
          <li key={product.id} className={styles.listItem}>
            ID: {product.id} - <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Назад
        </button>
        <span>Страница {page}</span>
        <button onClick={handleNextPage} disabled={!hasNextPage}>
          Вперед
        </button>
      </div>
    </div>
  );
    }
    export default HomePage