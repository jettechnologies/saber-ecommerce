 // trying new things
import React, { useContext, useState, createContext, useCallback, useMemo, useEffect } from "react";
import { CartType, Items } from "../types";
import { useLocalStorage } from "../useLocalStorage";
import { useAuth } from "./authContext";

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
  const { token, isLogin } = useAuth();

  // Define API endpoints
  const API_ADD_TO_CART = isLogin ? "https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/cart/add/"
    :"https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/guest-add-product-to-cart/";
  const API_REMOVE_FROM_CART = isLogin ? "https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/cart/remove-item-from-cart/"
    :"https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/guest-remove-item-from-cart";

  const getCartInfo = useCallback(async (cartId: number, isLogin: boolean, token:string): Promise<CartType | undefined> => {
    const endpoint = isLogin 
      ? `https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/cart/fetch-cart/${cartId}` 
      : `https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/fetch-guest-cart/${cartId}`;
  
    try {
      const res = await fetch(endpoint, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        console.error(`Error fetching cart: ${res.status} - ${res.statusText}`);
        return;
      }
      const data: CartType = await res.json();
      return data;
    } catch (e: any) {
      console.error(`Error: ${e.message}`);
    }
  }, []);
  

  useEffect(() => {
    const fetchCartAndCartId = async () => {
      const localStorageLabel: string | null = window.localStorage.getItem("cart_id");
      if (localStorageLabel !== null) {
        try {
          const localStorageData = JSON.parse(localStorageLabel) as number;
          const cart = await getCartInfo(localStorageData, isLogin, token);
          if (cart) setCartItems(cart.items);
          setCartId(localStorageData);
        } catch (error) {
          console.error("Failed to parse session storage label:", error);
        }
      }
    };

    fetchCartAndCartId();
  }, [getCartInfo, isLogin, token]);

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

    if(!isLogin){
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
    }
    else{
      try {
        const response = await fetch(`${API_ADD_TO_CART}${productId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
    }
  }, [API_ADD_TO_CART, productVariant.color, productVariant.size, setItem, token, isLogin]);

  const addToCart = useCallback((productId: number) => {
    console.log(productId)
    updateCart(productId, 1);
  }, [updateCart]);
  
  const removeFromCart = useCallback(async (itemId: string) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== itemId));
    
    if(!isLogin){
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
    }
    else{
      try {
        await fetch(`${API_REMOVE_FROM_CART}/${cartId}/${itemId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("Deleting from cart successful");
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  }, [API_REMOVE_FROM_CART, cartId, isLogin, token]);

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
