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
  console.log(productId);

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
    <Button size="medium" className="flex items-center justify-evenly w-full text-size-500 text-white" handleClick={handleClick}>
        <ShoppingBag color="#fff" />
        {isInCart ? "Remove from Cart" : "Add to Cart"}
        {/* Add to Cart */}
    </Button>
  );
}

export default AddToCartBtn;
