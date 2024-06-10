import { useState, useCallback } from "react";
import { ProductType } from "../types";
// import { productDetailFetch } from "../services/productDetail";
import { productsFetch } from "@/services/products";

export const useProductDetail = () => {
  const [product, setProduct] = useState<ProductType | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getProduct = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const fetchedProduct = await productsFetch();
      const filteredProducts = fetchedProduct.filter((product: ProductType) => product.product_id === id)
      setProduct(filteredProducts[0]);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { product, loading, error, getProduct };
};
