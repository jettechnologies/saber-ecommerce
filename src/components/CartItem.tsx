import { useCartContext } from "@/context/cartContext";
import { Items } from "../types";
import Spinner from "./Spinner";
import { useState, useEffect, useRef } from "react";
import { IndianRupee } from "lucide-react";

type CartItemProps = {
  item: Items;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } =
    useCartContext();

  const [isIncrementOrDecrement, setIsIncrementOrDecrement] = useState(false);
  const prevItemQuantity = useRef(item.quantity);

  useEffect(() =>{
    prevItemQuantity.current = item.quantity;
    
    if (prevItemQuantity.current === item.quantity) {
      setIsIncrementOrDecrement(false);
    }

  }, [item.quantity]);

    console.log(item?.product.name)
  return (
      <div className="flex justify-around lg:grid lg:grid-cols-[7fr_repeat(5,1fr)] gap-2 lg:gap-24 relative">
      {/* Product description */}

      <div className="flex items-center gap-5 max-w-[18rem]">
        <img
          className="h-[6rem] w-[6rem] rounded-lg"
          src={item.product?.productImage}
          alt={`Image of  ${item?.product?.name}`}
        />
        <div className="hidden md:flex flex-col gap-1">
          <h1 className="font-semibold line-clamp-2">{item?.product?.name}</h1>
          <h3 className="font-semibold text-icon">
            {item?.product?.category?.name}
          </h3>
        </div>
      </div>

      {/* Product price */}
      <div className="hidden md:flex font-bold w-[5rem]">
        <div className="flex justify-center items-center">
          <div className="flex gap-x-2">
            <IndianRupee size = {20}/>
            <h1>{item?.price}</h1>
          </div>
        </div>
      </div>

      {/* Product quantity */}
      <div className="flex items-center justify-center w-[7rem]">
        <div className="flex items-center gap-2 bg-secondary rounded-2xl justify-center">
          {item?.quantity > 0 && <button
            className={`px-2 pl-4 py-2 rounded-l-2xl hover:bg-slate-300 cursor-pointer transition-colors`}
            onClick={() => {
              decrementQuantity(item.id)
              setIsIncrementOrDecrement(prevState => !prevState)
            }}
            disabled = {item?.quantity === 1}
          >
            -
          </button>}
          {/* <div className="w-[1rem] flex justify-center">
            {quantityOfItem(item.product.id)}
          </div> */}
          <div className="w-[1rem] flex justify-center">
            {item.quantity}
          </div>
          <button
            className="px-2 pr-4 py-2 rounded-r-2xl hover:bg-slate-300 transition-colors cursor-pointer"
            onClick={() => {
              incrementQuantity(item.id);
              setIsIncrementOrDecrement(prevState => !prevState)
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Shipping */}
      {/* <div className="lg:flex items-center hidden">
        <h1 className="text-secondary font-bold ">FREE</h1>
      </div> */}

      {/* Subtotal */}
      <div className="flex items-center font-bold w-[5rem]">
        <div className="flex gap-x-2">
          <IndianRupee size={20} />
          <h1>{(item?.quantity * parseInt(item?.price))}</h1>
        </div>
      </div>

      {/* Discard product */}
      <div className="flex items-center justify-start">
        <button
          className="text-main hover:scale-[120%] overflow-hidden flex justify-start"
          onClick={() => removeFromCart(item.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 7l16 0"></path>
            <path d="M10 11l0 6"></path>
            <path d="M14 11l0 6"></path>
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
          </svg>
        </button>
      </div>

       {/* loading over lay */}
        {isIncrementOrDecrement && <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <Spinner />
        </div>}
    </div>

  );
};

export default CartItem;
