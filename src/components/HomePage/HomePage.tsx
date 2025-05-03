 import React from 'react';
 import { Link } from 'react-router-dom';
 import styles from './HomePage.module.scss';
//  import useProductListResult from '../../hooks/useProductList'; // основной хук, классическая пагинация
 import useProductListResultCostyl from '../../hooks/useProductListCostyl'; // альтернативная пагинация
 import { Product } from '../../types/products';
 
const HomePage: React.FC = () => {
  // Получаем данные из кастомного хука с запросом продуктов от API
  // и обработкой состояния

  // классическая пагинация 
  /* const {
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
    itemsPerPage,
    setItemsPerPage,
  } = useProductListResult(); */

  // пагинация альтернативным вариантом
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
    itemsPerPage,
    setItemsPerPage,
  } = useProductListResultCostyl();
  
  // Обработчик изменения количества элементов на странице
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };
  // загрузка и ошибки
    if (isLoading) {
      return <div className={styles.loading}>Загрузка...</div>;
    }
    if (error) {
      let errorMessage: string;
      if ('data' in error && typeof error.data === 'string') {
        errorMessage = error.data;
      } else if ('data' in error && typeof error.data !== 'string') {
        errorMessage = JSON.stringify(error.data);
      } else if ('message' in error) {
        errorMessage = error.message || 'Произошла ошибка';
      } else {
        errorMessage = 'Произошла неизвестная ошибка';
      }
      return <div className={styles.error}>Ошибка: {errorMessage}</div>;
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
      {/* блок с количеством элементов на странице */}
      <div className={styles.itemsPerPageControl}>
        <span>Позиций на странице:</span>
        <button
          className={itemsPerPage === 10 ? styles.active : ''}
          onClick={() => handleItemsPerPageChange(10)}
        >
          10
        </button>
        <button
          className={itemsPerPage === 15 ? styles.active : ''}
          onClick={() => handleItemsPerPageChange(15)}
        >
          15
        </button>
        <button
          className={itemsPerPage === 20 ? styles.active : ''}
          onClick={() => handleItemsPerPageChange(20)}
        >
          20
        </button>
      </div>
    </div>
  );
    }
    export default HomePage


