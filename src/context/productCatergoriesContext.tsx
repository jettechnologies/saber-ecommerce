// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { CategoryType, ProductType } from '@/types';


// type ProductCategoriesType = {
//     products: ProductType[];
//     categories: CategoryType[];
//     loading: boolean;
//     error: string | null;
// }


// // Create the context
// const DataContext = createContext<ProductCategoriesType | null>(null);

// // Create the provider component
// export const DataProvider:React.FC<{children: React.ReactNode}> = ({ children }) => {
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [categories, setCategories] = useState<CategoryType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productsResponse = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}browse/fetch-all-products`);
//         const productsData = await productsResponse.json();

//         const categoriesResponse = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}browse/fetch-all-product-categories`);
//         const categoriesData = await categoriesResponse.json();

//         setProducts(productsData[0]);
//         setCategories(categoriesData[0]);
        
//       } catch (err) {
//         setError((err as Error).message);
//         setLoading(false);
//       }
//       finally{
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <DataContext.Provider value={{ products, categories, loading, error }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// export function useProductCatergories(): ProductCategoriesType {
//     const context = useContext(DataContext);
//     if (!context) {
//       throw new Error("useCartContext must be used within a CartContextProvider");
//     }
//     return context;
//   }


import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CategoryType, ProductType } from '@/types';

type ProductCategoriesType = {
    products: ProductType[];
    categories: CategoryType[];
    loading: boolean;
    error: string | null;
    fetchData: () => Promise<void>; // Add fetchData method to context type
};

// Create the context
const DataContext = createContext<ProductCategoriesType | null>(null);

// Create the provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback( async () => {
    setLoading(true);
    try {
      const productsResponse = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}browse/fetch-all-products`);
      const productsData = await productsResponse.json();

      const categoriesResponse = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}browse/fetch-all-product-categories`);
      const categoriesData = await categoriesResponse.json();

      setProducts(productsData[0]);
      setCategories(categoriesData[0]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DataContext.Provider value={{ products, categories, loading, error, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export function useProductCatergories(): ProductCategoriesType {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useProductCatergories must be used within a DataProvider");
  }
  return context;
}
