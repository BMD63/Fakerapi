import React, {useState, useEffect, useMemo} from "react";
import { useGetProductsQuery } from "../services/productsApi";
import { Product, IUseProductListResult } from "../types/products";

const useProductListResult = (): IUseProductListResult => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const queryArgs = useMemo(() => ({ page, quantity: itemsPerPage }), [page, itemsPerPage]);
    const nextPageQueryArgs = useMemo(() => ({ page: page + 1, quantity: 1 }), [page]);
    const { data: productsResponse, isLoading, error, refetch } = useGetProductsQuery(queryArgs);
    const allProducts: Product[] = useMemo(() => productsResponse?.data || [], [productsResponse?.data]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
    const [hasNextPage, setHasNextPage] = useState(false);
    const { data: nextPageProducts } = useGetProductsQuery(nextPageQueryArgs, {
        skip: isLoading || !!error || !productsResponse?.data?.length,
    });
    // Фильтрация продуктов по поисковому запросу
    useEffect(() => {
        setFilteredProducts(
            allProducts.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }
    , [allProducts, searchTerm]);
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
        allProducts,
    };
}
export default useProductListResult;