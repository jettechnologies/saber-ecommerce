import { useState, useCallback } from "react";
import { categoriesFetch } from "../services/categories";

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(categories)

  const getCategories = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCategories = await categoriesFetch();
      console.log(fetchedCategories);
      setCategories(categories);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [categories]);

  return { categories, loading, error, getCategories};
};


// creating categores for the products categories and removing the duplicates
// const getUniqueCategories = (products: ProductType[]): string[] => {
//   const categories = products.map(product => product.category);
//   const uniqueCategories = Array.from(new Set(categories));
//   console.log(uniqueCategories)
//   return uniqueCategories;
// };