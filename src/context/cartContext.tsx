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
