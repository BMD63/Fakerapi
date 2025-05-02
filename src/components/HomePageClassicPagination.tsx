 import React,{ useState, useEffect, useMemo } from 'react';
 import { useGetProductsQuery } from '../services/productsApi';
 import { Link } from 'react-router-dom';
 import styles from './HomePage.module.scss';
 import { Product } from '../types/products'; 
 
const HomePage: React.FC = () => {
const [page, setPage] = useState(1);
const [searchTerm, setSearchTerm] = useState('');
const {data: productsResponse, isLoading, error} = useGetProductsQuery(page);
const allProducts: Product[] = useMemo(() => productsResponse?.data || [], [productsResponse?.data]); // Используем useMemo
const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
const { data: nextPageProducts, isLoading: isNextPageLoading } = useGetProductsQuery(page + 1, {
  skip: isLoading || !!error || !productsResponse?.data?.length,
});
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
      if (nextPageProducts?.data && nextPageProducts.data.length > 0) {
        setHasNextPage(true);
      } else if (!isNextPageLoading && page > 0 && productsResponse?.data && productsResponse.data.length > 0) {
        setHasNextPage(false);
      } else {
        setHasNextPage(false);
      }
    }, [nextPageProducts?.data, isNextPageLoading, page, productsResponse?.data]);

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
      <h2 className={styles.subtitle}>Список продуктов</h2>
      <ul className={styles.productList}>
        {filteredProducts.map((product) => (
          <li key={product.id} className={styles.listItem}>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
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