import React, {useState, useEffect, useMemo} from "react";
import { useGetProductsQuery } from "../services/productsApi";
import { Product, IUseProductListResult } from "../types/products";

const UseProductListResult = (): IUseProductListResult => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const { data: productsResponse, isLoading, error } = useGetProductsQuery(page);
    const allProducts: Product[] = useMemo(() => productsResponse?.data || [], [productsResponse?.data]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
    const [hasNextPage, setHasNextPage] = useState(true);
    const { data: nextPageProducts, isLoading: isNextPageLoading } = useGetProductsQuery(page + 1, {
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
        if (nextPageProducts?.data && nextPageProducts.data.length > 0) {
            setHasNextPage(true);
        } else if (!isNextPageLoading && page > 0 && productsResponse?.data && productsResponse.data.length > 0) {
            setHasNextPage(false);
        } else {
            setHasNextPage(false);
        }
    }, [nextPageProducts?.data, isNextPageLoading, page, productsResponse?.data]);

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
    };
}
export default UseProductListResult;