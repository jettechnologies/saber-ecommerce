import React, { useContext, useState, createContext, useCallback, useMemo, useEffect } from "react";
import { CartType, Items } from "../types";
import { useLocalStorage } from "../useLocalStorage";
import { useAuth } from "./authContext";

type CartContextType = {
  cartItems: Items[];
  isLoading: boolean;
  addToCart: (productId: number) => void;
  incrementQuantity: (itemId: string) => void;
  decrementQuantity: (itemId: string) => void;
  deletingCart: () => void;
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
  const [isLoading, setIsLoading] = useState(true);
  const { setItem } = useLocalStorage("cart_id");
  // const [cartId, setCartId] = useState<number | null>(null);
  const { token, isLogin, loading } = useAuth();

  // Define API endpoints for both guest and users
  const API_ADD_TO_CART = "https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/cart/add/";
  const API_QUANTITY_INCREMENT = "https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/cart/increase-quantity/";
  const API_QUANTITY_DECREMENT = "https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/cart/decrease-quantity/";
  const API_REMOVE_FROM_CART = "https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/cart/remove-item-from-cart/";

  const getCartInfo = useCallback(async (token: string): Promise<CartType | undefined> => {
    const endpoint = `https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/cart/fetch-cart/`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const res = await fetch(endpoint, { headers });

      if (!res.ok) {
        // console.error(`Error fetching cart: ${res.status} - ${res.statusText}`);
        return;
      }

      const data: CartType = await res.json();
      return data;
    } catch (e) {
      // console.error(`Error: ${(e as Error).message}`);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCartInfo(token);
        if (cart) setCartItems(cart.items);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    if (!loading && isLogin) fetchCart();
  }, [token, isLogin, loading, getCartInfo]);

  const addVariantsToCart = useCallback((name: keyof Variant, value: string) => {
    setProductVariant((prevState) => ({
      ...prevState,
      [name]: value.toLowerCase(),
    }));
  }, []);

  const quantityOfItem = useCallback((itemId: number) => {
    const matchingItems = cartItems.filter((item) => item.product.id === itemId);
    return matchingItems.length;
  }, [cartItems]);

  const updateCart = useCallback(async (productId: number, quantity: number) => {
    const productData = {
      quantity,
      color: productVariant.color,
      size: productVariant.size,
    };

    const url = `${API_ADD_TO_CART}${productId}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(productData),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message);
      }
      if (!isLogin) {
        // setCartId(resData.id);
        setItem(resData.id);
      }

      setCartItems(resData.items);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }, [API_ADD_TO_CART, isLogin, productVariant.color, productVariant.size, token, setItem]);

  const addToCart = useCallback((productId: number) => {
    updateCart(productId, 1);
  }, [updateCart]);

  // function for deleting the cart items
  const deletingCart = useCallback(() =>{
    if(cartItems.length === 0) return;

    setCartItems([]);

  }, [cartItems]);

  const removeFromCart = useCallback(async (itemId: string) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== itemId));

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`${API_REMOVE_FROM_CART}${itemId}`, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }, [API_REMOVE_FROM_CART, token]);

  const incrementQuantity = useCallback(async (itemId: string) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      const data = { quantity: 1 };
      const url = `${API_QUANTITY_INCREMENT}${itemId}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers,
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const resData = await response.json();
        // setCartId(resData.id);
        setItem(resData.id);
        setCartItems(resData.items);
      } catch (error) {
        console.error("Error incrementing quantity:", error);
      }
    }
  }, [cartItems, API_QUANTITY_INCREMENT, token, setItem]);

  const decrementQuantity = useCallback(async (itemId: string) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
      const url = `${API_QUANTITY_DECREMENT}${itemId}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const data = { quantity: 1 };

      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers,
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const resData = await response.json();
        // setCartId(resData.id);
        setItem(resData.id);
        setCartItems(resData.items);
      } catch (error) {
        console.error("Error decrementing quantity:", error);
      }
    } else if (item?.quantity === 0) {
      removeFromCart(itemId);
    }
  }, [cartItems, API_QUANTITY_DECREMENT, token, setItem, removeFromCart]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) * item.quantity;
      return total + (isNaN(itemPrice) ? 0 : itemPrice);
    }, 0);
  }, [cartItems]);

  const value: CartContextType = useMemo(() => ({
    cartItems,
    isLoading,
    addVariantsToCart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    quantityOfItem,
    productVariant,
    totalPrice,
    deletingCart,
    removeFromCart,
  }), [cartItems, isLoading, addToCart, incrementQuantity, decrementQuantity, quantityOfItem, totalPrice, productVariant, addVariantsToCart, removeFromCart, deletingCart]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

export function useCartContext(): CartContextType {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
}
