import React, {useState, useEffect, useMemo} from "react";
import { useGetProductsQuery } from "../services/productsApi";
import { Product, IUseProductListResult } from "../types/products";

const useProductListResultCostyl = (): IUseProductListResult => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [allLoadedProducts, setAllLoadedProducts] = useState<Product[]>([]);
    const nextPageQueryArgs = useMemo(() => ({ page: page + 1, quantity: 1 }), [page]);
    const queryQuantity = useMemo(() => page * itemsPerPage, [page, itemsPerPage]);
    const { data: productsResponse, isLoading, error, refetch } = useGetProductsQuery({
        page: 1, // Мы всегда запрашиваем с первой страницы и контролируем количество
        quantity: queryQuantity,
    });    
    const allProducts: Product[] = useMemo(() => productsResponse?.data || [], [productsResponse?.data]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
    const [hasNextPage, setHasNextPage] = useState(false);
    const { data: nextPageProducts } = useGetProductsQuery(nextPageQueryArgs, {
        skip: isLoading || !!error || !productsResponse?.data?.length,
    });
    useEffect(() => {
        if (productsResponse?.data) {
            setAllLoadedProducts(productsResponse.data);
        }
    }, [productsResponse?.data]);
    // Фильтрация продуктов по поисковому запросу
    useEffect(() => {
        setFilteredProducts(
            allLoadedProducts.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).slice(-(itemsPerPage)) // Возвращаем последние itemsPerPage элементов
        );
    }, [allLoadedProducts, searchTerm, itemsPerPage]);
    // Проверка наличия следующей страницы для пагинации
    useEffect(() => {
        setHasNextPage(!!nextPageProducts?.data?.length);
    }, [nextPageProducts?.data]);

    // Обработка изменения количества элементов на странице
    useEffect(() => {
        refetch();
        setPage(1); // Сбрасываем на первую страницу при изменении количества элементов
    }, [itemsPerPage, refetch]);

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };  
    const handleNextPage = () => {
        if (hasNextPage) {
            setPage((prevPage) => prevPage + 1);
        }
    };
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const handleResetSearch = () => {
        setSearchTerm("");
    };
    return {
        page,
        setPage,
        searchTerm,
        setSearchTerm,
        filteredProducts: filteredProducts,   
        hasNextPage,
        isLoading,
        error,
        handlePreviousPage,
        handleNextPage,
        handleSearch,
        handleResetSearch,
        itemsPerPage,
        setItemsPerPage,
        allProducts: allLoadedProducts,
    };
}
export default useProductListResultCostyl;