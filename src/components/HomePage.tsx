 import React from 'react';
 import { Link } from 'react-router-dom';
 import styles from './HomePage.module.scss';
 import useProductListResult from '../hooks/useProductList';
 import { Product } from '../types/products';
 
const HomePage: React.FC = () => {
  const {
    page,
    searchTerm,
    filteredProducts,
    hasNextPage,
    isLoading,
    error,
    handlePreviousPage,
    handleNextPage,
    handleSearch,
    handleResetSearch,
  } = useProductListResult();
    if (isLoading) {
      return <div className={styles.loading}>Загрузка...</div>;
    }
    if (error) {
      return <div className={styles.error}>Ошибка: {error.message}</div>;
    }
    if (filteredProducts.length === 0) {
      return <div className={styles.noResults}>Нет продуктов для отображения</div>;
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
        {filteredProducts.map((product: Product) => (
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


