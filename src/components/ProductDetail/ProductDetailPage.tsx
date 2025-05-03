import React from 'react'
import { useParams } from 'react-router-dom'
import styles from './ProductDetailPage.module.scss'
import { RouteParams } from '../../types/routs'
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useProductListResult from '../../hooks/useProductList'

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<RouteParams>()
    const navigate = useNavigate();
    const { allProducts } = useProductListResult()
    const handleCloseClick = () => {
        navigate('/');
    }
    const product = allProducts.find((p) => p.id === parseInt(id as string, 10));

    if (!product) {
        return <div>Продукт не найден</div>;
    }
    return (
        <div className={styles.container}>
          <button className={styles.closeButton}>
            <FaTimes onClick={handleCloseClick} />
          </button>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.price}>Цена: {product.price}₽</p>
            {product.image && (
            <div className={styles.imageContainer}>
                <img
                    className={styles.image}
                    src={product.image}
                    alt={product.name}
                />
            </div>
            )}
           {product.images && product.images.length > 0 && (
        <div className={styles.imagesContainer}>
          <h4 className={styles.secondaryTitle}>Дополнительные изображения:</h4>
          <div className={styles.thumbnails}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.title}
                className={styles.thumbnail}
              />
            ))}
          </div>
        </div>
      )}
      {product.ean && <p className={styles.ean}>EAN: {product.ean}</p>}
      {product.upc && <p className={styles.upc}>UPC: {product.upc}</p>}
      {product.tags && product.tags.length > 0 && (
           <div className={styles.tagsContainer}>
           <h4 className={styles.secondaryTitle}>Теги:</h4>
           <ul className={styles.tagList}>
             {product.tags.map((tag) => (
               <li key={tag} className={styles.tagItem}>{tag}</li>
             ))}
           </ul>
         </div>
       )}
        </div>
    );
}
export default ProductDetailPage