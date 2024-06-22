// import React, {
//     useContext,
//     useState,
//     createContext,
//     useCallback,
//     useMemo,
//     useEffect,
//   } from "react";
//   import { ProductType } from "../types";
//   import { useLocalStorage } from "../useLocalStorage";
//   // import useGetRequest from "@/hooks/useGetRequest";
//   import { CartType, Items } from "../types";
  
//   // Define API endpoints
  // const API_ADD_TO_CART = "https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/guest-add-product-to-cart/";
  // const API_REMOVE_FROM_CART = "https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/guest-remove-item-from-cart";
//   // const API_REMOVE_SINGLE_FROM_CART = "/api/cart/remove-single";
  
//   type CartContextType = {
//     cartItems: Items[];
//     addToCart: (item: ProductType) => void;
//     removeFromCart: (itemId: string) => void;
//     // removeSingleFromCart: (itemId: number) => void;
//     quantityOfItem: (itemId: number) => number;
//     totalPrice: number;
//     productVariant: Variant;
//     // lastAddedItem: ProductType;
//     addVariantsToCart: (name:keyof Variant, value:string) => void;
//   };
//   type Variant = {
//     color: string;
//     size: string;
//   }
  
//   // Create the context
//   const cartContext = createContext<CartContextType | null>(null);
  
//   // Create the provider component
//   export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [cartItems, setCartItems] = useState<Items[]>([]);
//     const [productVariant, setProductVariant] = useState<Variant>({
//         color: "",
//         size: "",
//     });
//     const { setItem } = useLocalStorage("cart_id");
//     const [lastAddedItem, setLastAddedItem] = useState<ProductType | null>(null);
//     const [cartId, setCartId] = useState<number | null>(null);

//     console.log(cartId)

//     const getCartInfo = async (cartId: number): Promise<CartType | undefined> => {
//       let data;
//       try {
//         const res = await fetch(`https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/fetch-guest-cart/${cartId}`);
    
//         if (!res.ok) {
//           console.log(res);
//           return;
//         }

//         data = await res.json();
       
//       } catch (e : any) {
//         console.log(e.message);
//       }

//       return data;
//     }

//     useEffect(() => {
//       const fetchCartAndCartId = async ()=>{
//         const localStorageLabel: string | null =
//         window.localStorage.getItem("cart_id");
//         let localStorageData: number | undefined;
    
//         // Check to ensure that the sessionStorage is not empty
//         if (localStorageLabel !== null) {
//           try {
//             localStorageData = JSON.parse(localStorageLabel) as number;
//           } catch (error) {
//             console.error("Failed to parse session storage label:", error);
//             localStorageData = undefined;
//           }
//         }
//         console.log(localStorageData)
//         if (localStorageData) {
//           const cartId = localStorageData;
//           console.log(cartId);

//           const cart = await getCartInfo(cartId);
//           console.log(cart)
//           if(cart){setCartItems(cart.items)
//           }
//           setCartId(cartId);
//         }
//       }

//       fetchCartAndCartId();
//     }, []);

//       // adding the selected variants
//       const addVariantsToCart = useCallback((name: keyof Variant, value: string) => {
//         setProductVariant((prevState) => ({
//           ...prevState,
//           [name]: value.toLowerCase(),
//         }));
//       }
//     , []);

//   // Calculate the total number of a specific item in the cart
//   const quantityOfItem = useCallback(
//     (itemId: number) => {
//       const matchingItems = cartItems.filter((item) => item.product.id === itemId);
//       console.log(matchingItems.length)
//       return matchingItems.length;
//     },
//     [cartItems]
//   );

//       // Effect to handle changes in cartItems and make API requests based on the product data
//   useEffect(() => {
//     if (!lastAddedItem) return;

//     const quantity = quantityOfItem(lastAddedItem.id) === 0 ? 1 : quantityOfItem(lastAddedItem.id) ;
//     const productData = {
//       quantity,
//       color: productVariant.color,
//       size: productVariant.size,
//     };

//     console.log(productData);

//     const addProductToCart = async () => {
//       try {
//         const response = await fetch(`${API_ADD_TO_CART}${lastAddedItem.id}`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(productData),
//         });
        
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         } 

//         const resData = await response.json();
//         setCartId(resData.id)
//         setItem(resData.id);
//         setCartItems((prevCartItems) => [...prevCartItems, resData.items]);
//         console.log(resData)
//         console.log("Product added to cart successfully");
//       } catch (error) {
//         console.error("Error adding to cart:", error);
//       }
//     };

//     addProductToCart();
//   }, [cartItems, lastAddedItem, productVariant.color, productVariant.size, quantityOfItem, setItem]);
  
//     // Add item to cart
//     const addToCart = useCallback(
//       async (item: ProductType) => {
//         console.log(item);
//         // setCartItems((prevCartItems) => [...prevCartItems, item]);
//         setLastAddedItem(item);
//       },
//       []
//     );
  
//     // Remove item from cart
//     const removeFromCart = useCallback(
//       async (itemId: string) => {
//         setCartItems((prevCartItems) =>
//           prevCartItems.filter((item) => item.id !== itemId)
//         );
//         try {
//           await fetch(`${API_REMOVE_FROM_CART}/${cartId}/${itemId}`, {
//             method: "DELETE",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });

//           console.log("Deleting from cart successful");
//         } catch (error) {
//           console.error("Error removing from cart:", error);
//         }
//       },
//       [cartId]
//     );
  
//     // Remove single item from cart
//     // const removeSingleFromCart = useCallback(
//     //   async (itemId: number) => {
//     //     const itemIndex = cartItems.findIndex((item) => item.id === itemId);
//     //     if (itemIndex !== -1) {
//     //       const updatedCartItems = [...cartItems];
//     //       updatedCartItems.splice(itemIndex, 1);
//     //       setCartItems(updatedCartItems);
//     //       try {
//     //         await fetch(API_REMOVE_SINGLE_FROM_CART, {
//     //           method: "POST",
//     //           headers: {
//     //             "Content-Type": "application/json",
//     //           },
//     //           body: JSON.stringify({ itemId }),
//     //         });
//     //       } catch (error) {
//     //         console.error("Error removing single item from cart:", error);
//     //       }
//     //     }
//     //   },
//     //   [cartItems]
//     // );

  
//     // Calculate the total price of items in the cart
//     const totalPrice = useMemo(
//       () => cartItems.reduce((total, item) => total + parseFloat(item.price), 0),
//       [cartItems]
//     );
  
//     const value: CartContextType = useMemo(
//       () => ({
//         cartItems,
//         addVariantsToCart,
//         addToCart,
//         quantityOfItem,
//         productVariant,
//         totalPrice,
//         removeFromCart,
//       }),
//       [cartItems, addToCart, quantityOfItem, totalPrice, productVariant, addVariantsToCart, removeFromCart]
//     );
  
//     return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
//   };
  
//   export function useCartContext(): CartContextType {
//     const context = useContext(cartContext);
//     if (!context) {
//       throw new Error("useCartContext must be used within a CartContextProvider");
//     }
//     return context;
//   }
  

// trying new things
import React, { useContext, useState, createContext, useCallback, useMemo, useEffect } from "react";
import { CartType, Items } from "../types";
import { useLocalStorage } from "../useLocalStorage";

// Define API endpoints
const API_ADD_TO_CART = "https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/guest-add-product-to-cart/";
const API_REMOVE_FROM_CART = "https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/guest-remove-item-from-cart";

type CartContextType = {
  cartItems: Items[];
  addToCart: (productId: number) => void;
  incrementQuantity: (itemId: string) => void;
  decrementQuantity: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  quantityOfItem: (itemId: number) => number;
  totalPrice: number;
  productVariant: Variant;
  addVariantsToCart: (name: keyof Variant, value: string) => void;
};

type Variant = {
  color: string;
  size: string;
};

const cartContext = createContext<CartContextType | null>(null);

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Items[]>([]);
  const [productVariant, setProductVariant] = useState<Variant>({ color: "", size: "" });
  const { setItem } = useLocalStorage("cart_id");
  const [cartId, setCartId] = useState<number | null>(null);

  const getCartInfo = async (cartId: number): Promise<CartType | undefined> => {
    try {
      const res = await fetch(`https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/fetch-guest-cart/${cartId}`);
      if (!res.ok) {
        console.log(res);
        return;
      }
      const data: CartType = await res.json();
      return data;
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const fetchCartAndCartId = async () => {
      const localStorageLabel: string | null = window.localStorage.getItem("cart_id");
      if (localStorageLabel !== null) {
        try {
          const localStorageData = JSON.parse(localStorageLabel) as number;
          const cart = await getCartInfo(localStorageData);
          if (cart) setCartItems(cart.items);
          setCartId(localStorageData);
        } catch (error) {
          console.error("Failed to parse session storage label:", error);
        }
      }
    };

    fetchCartAndCartId();
  }, []);

  const addVariantsToCart = useCallback((name: keyof Variant, value: string) => {
    setProductVariant((prevState) => ({
      ...prevState,
      [name]: value.toLowerCase(),
    }));
  }, []);

  const quantityOfItem = useCallback(
    (itemId: number) => {
      const matchingItems = cartItems.filter((item) => item.product.id === itemId);
      return matchingItems.length;
    },
    [cartItems]
  );

  const updateCart = useCallback(async (productId: number, quantity: number) => {
    console.log(productId)

    const productData = {
      quantity,
      color: productVariant.color,
      size: productVariant.size,
    };

    try {
      const response = await fetch(`${API_ADD_TO_CART}${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const resData = await response.json();
      console.log(resData)
      setCartId(resData.id);
      setItem(resData.id);
      setCartItems(resData.items);
      console.log("Product added to cart successfully");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }, [productVariant.color, productVariant.size, setItem]);

  const addToCart = useCallback((productId: number) => {
    console.log(productId)
    updateCart(productId, 1);
  }, [updateCart]);
  
  const removeFromCart = useCallback(async (itemId: string) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== itemId));
    try {
      await fetch(`${API_REMOVE_FROM_CART}/${cartId}/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Deleting from cart successful");
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }, [cartId]);

  const incrementQuantity = useCallback((itemId: string) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      updateCart(item.product.id, item.quantity + 1);
    }
  }, [cartItems, updateCart]);

  const decrementQuantity = useCallback((itemId: string) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      console.log(item.quantity);
      const newQuantity = item.quantity - 1;
      console.log(newQuantity, item)
      if (newQuantity < 1) {
        removeFromCart(itemId);
      } else {
        updateCart(item.product.id, newQuantity);
      }
    }
  }, [cartItems, updateCart, removeFromCart]);

  const totalPrice = useMemo(() => cartItems.reduce((total, item) => total + parseFloat(item.price), 0), [cartItems]);

  const value: CartContextType = useMemo(() => ({
    cartItems,
    addVariantsToCart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    quantityOfItem,
    productVariant,
    totalPrice,
    removeFromCart,
  }), [cartItems, addToCart, incrementQuantity, decrementQuantity, quantityOfItem, totalPrice, productVariant, addVariantsToCart, removeFromCart]);

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

export function useCartContext(): CartContextType {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
}
