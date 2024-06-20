// import React, {
//   useContext,
//   useState,
//   createContext,
//   useCallback,
//   useMemo,
// } from "react";
// import { ProductType } from "../types";

// type CartContextType = {
//   cartItems: ProductType[];
//   addToCart: (item: ProductType) => void;
//   removeFromCart: (itemId: number) => void;
//   removeSingleFromCart: (itemId: number) => void;
//   quantityOfItem: (itemId: number) => number;
//   totalPrice: number;
// };

// // Create the context
// const cartContext = createContext<CartContextType | null>(null);

// // Create the provider component
// export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cartItems, setCartItems] = useState<ProductType[]>([]);

//   // Add item to cart
//   const addToCart = useCallback(
//     (item: ProductType) => {
//       setCartItems((prevCartItems) => [...prevCartItems, item]);
//     },
//     []
//   );

//   // Remove item from cart
//   const removeFromCart = useCallback(
//     (itemId: number) => {
//       setCartItems((prevCartItems) =>
//         prevCartItems.filter((item) => item.product_id !== itemId)
//       );
//     },
//     []
//   );

//   // Remove single item from cart
//   const removeSingleFromCart = useCallback(
//     (itemId: number) => {
//       const itemIndex = cartItems.findIndex((item) => item.product_id === itemId);
//       if (itemIndex !== -1) {
//         const updatedCartItems = [...cartItems];
//         updatedCartItems.splice(itemIndex, 1);
//         setCartItems(updatedCartItems);
//       }
//     },
//     [cartItems]
//   );

//   // Calculate the total number of a specific item in the cart
//   const quantityOfItem = useCallback(
//     (itemId: number) => {
//       const matchingItems = cartItems.filter((item) => {
//         return item.product_id === itemId;
//       });
//       return matchingItems.length;
//     },
//     [cartItems]
//   );

//   // Calculate the total price of items in the cart
//   const totalPrice = useMemo(
//     () => cartItems.reduce((total, item) => total + item.price, 0),
//     [cartItems]
//   );

//   const value: CartContextType = useMemo(
//     () => ({
//       cartItems,
//       addToCart,
//       removeFromCart,
//       removeSingleFromCart,
//       quantityOfItem,
//       totalPrice,
//     }),
//     [cartItems, addToCart, removeFromCart, removeSingleFromCart, quantityOfItem, totalPrice]
//   );

//   return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
// };

// export function useCartContext(): CartContextType {
//   const context = useContext(cartContext);
//   if (!context) {
//     throw new Error("useCartContext must be used within a CartContextProvider");
//   }
//   return context;
// }


// new way
import React, {
    useContext,
    useState,
    createContext,
    useCallback,
    useMemo,
  } from "react";
  import { ProductType } from "../types";
  
  // Define API endpoints
  const API_ADD_TO_CART = "https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/guest-add-product-to-cart/";
  const API_REMOVE_FROM_CART = "/api/cart/remove";
  const API_REMOVE_SINGLE_FROM_CART = "/api/cart/remove-single";
  
  type CartContextType = {
    cartItems: ProductType[];
    addToCart: (item: ProductType) => void;
    removeFromCart: (itemId: number) => void;
    removeSingleFromCart: (itemId: number) => void;
    quantityOfItem: (itemId: number) => number;
    totalPrice: number;
    productVariant: Variant;
    addVariantsToCart: (name:keyof Variant, value:string) => void;
  };
  type Variant = {
    color: string;
    size: string;
  }
  
  // Create the context
  const cartContext = createContext<CartContextType | null>(null);
  
  // Create the provider component
  export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<ProductType[]>([]);
    const [productVariant, setProductVariant] = useState<Variant>({
        color: "",
        size: "",
    })

    
    // adding the selected variants
    const addVariantsToCart = useCallback((name: keyof Variant, value: string) => {
        setProductVariant((prevState) => ({
          ...prevState,
          [name]: value.toLowerCase(),
        }));
      }, []);

    // Calculate the total number of a specific item in the cart
    const quantityOfItem = useCallback(
      (itemId: number) => {
        const matchingItems = cartItems.filter((item) => item.id === itemId);
        return matchingItems.length;
      },
      [cartItems]
    );
  
    // Add item to cart
    const addToCart = useCallback(
      async (item: ProductType) => {
        setCartItems((prevCartItems) => [...prevCartItems, item]);

        const productData = {
            quantity: quantityOfItem(item.id),
            color: productVariant.color,
            size: productVariant.size,
        }
        try {
          await fetch(`${API_ADD_TO_CART}${item.id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
          });
        } catch (error) {
          console.error("Error adding to cart:", error);
        }
      },
      [productVariant.color, productVariant.size, quantityOfItem]
    );
  
    // Remove item from cart
    const removeFromCart = useCallback(
      async (itemId: number) => {
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.id !== itemId)
        );
        try {
          await fetch(API_REMOVE_FROM_CART, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemId }),
          });
        } catch (error) {
          console.error("Error removing from cart:", error);
        }
      },
      []
    );
  
    // Remove single item from cart
    const removeSingleFromCart = useCallback(
      async (itemId: number) => {
        const itemIndex = cartItems.findIndex((item) => item.id === itemId);
        if (itemIndex !== -1) {
          const updatedCartItems = [...cartItems];
          updatedCartItems.splice(itemIndex, 1);
          setCartItems(updatedCartItems);
          try {
            await fetch(API_REMOVE_SINGLE_FROM_CART, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ itemId }),
            });
          } catch (error) {
            console.error("Error removing single item from cart:", error);
          }
        }
      },
      [cartItems]
    );

  
    // Calculate the total price of items in the cart
    const totalPrice = useMemo(
      () => cartItems.reduce((total, item) => total + parseFloat(item.price), 0),
      [cartItems]
    );
  
    const value: CartContextType = useMemo(
      () => ({
        cartItems,
        addVariantsToCart,
        addToCart,
        removeFromCart,
        removeSingleFromCart,
        quantityOfItem,
        productVariant,
        totalPrice,
      }),
      [cartItems, addToCart, removeFromCart, removeSingleFromCart, quantityOfItem, totalPrice, productVariant, addVariantsToCart]
    );
  
    return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
  };
  
  export function useCartContext(): CartContextType {
    const context = useContext(cartContext);
    if (!context) {
      throw new Error("useCartContext must be used within a CartContextProvider");
    }
    return context;
  }
  