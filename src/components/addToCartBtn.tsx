import { useCartContext } from "@/context/cartContext";
import { useEffect, useState } from "react";
import Button from "./Button";
import { ShoppingBag } from 'lucide-react';

function AddToCartBtn({
  productId,
}: {
  productId: number;
}) {
  const [isInCart, setIsInCart] = useState(false);

  const { addToCart, cartItems } = useCartContext();

  const handleClick = () => {
    if (!isInCart) {
      addToCart(productId);
    }
    //  else {
    //   removeFromCart(product.id);
    // }
  };

  useEffect(() => {
    const itemInCart = cartItems.some((item) => item.product.id === productId);
    setIsInCart(itemInCart);
  },[cartItems, productId])

  return (
    // would have to disable the button until i fnd a way around removing from cart from the add to cart button
    <Button disabled = {isInCart} size="medium" className="flex items-center justify-center gap-x-6 w-full text-size-500 text-white" handleClick={handleClick}>
        <ShoppingBag color="#fff" />
        {isInCart ? "Item added to cart" : "Add to Cart"}
    </Button>
  );
}

export default AddToCartBtn;
