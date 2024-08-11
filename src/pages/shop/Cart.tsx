import { useCartContext } from "@/context/cartContext";
import CartItem from "@/components/CartItem";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { IndianRupee } from "lucide-react";
import Button from "@/components/Button";
import { useAuth } from "@/context/authContext";
import { Order } from "@/types";
import { useState } from "react";

const Cart = () => {
  const { cartItems, totalPrice, isLoading } = useCartContext();
  const [loading, setLoading] = useState(false);

  const uniqueItemsIds = new Set();

  const navigate = useNavigate();
  const { token } = useAuth();
  if (cartItems.length === 0 && !isLoading) {return (<div className=" flex flex-col items-center justify-center text-center w-auto min-h-screen">
    <h1 className="text-3xl font-semibold">It seems like your cart it's empty, let's change that!</h1>
    <Link
      to="/store"
      className="w-[50%]  mt-6 bg-black flex items-center justify-center text-lg text-white px-10 py-3 gap-3 font-semibold rounded-lg hover:scale-105 transition-transform"
    >
          Shop
        </Link>
  </div>)}

  if(isLoading){
    return<div className = "w-full h-full"><Spinner /></div>
  }

  const checkoutProduct = async() =>{
    const url = "cart/checkout";
    
    try{
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}${url}`,{
        method: "POST",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if(!res.ok) throw new Error("Request not sent" + res.status);
      const response:{message:string; order:Order} = await res.json();
      console.log(response);

      navigate("/checkout", {replace:true, state:{order: response.order }});
    }
    catch(err){
      console.log((err as Error).message);
    }
    finally{
      setLoading(false);
    }

  };

  return (
    <div className="flex flex-col gap-6 mt-10 min-h-screen">
      {cartItems
      .sort((a, b) => b.quantity - a.quantity)
      .map((item) => {
        if (!uniqueItemsIds.has(item.id)) {
          uniqueItemsIds.add(item.id);
          return (
            <ul key={item.id} className="flex flex-col gap-6 px-4 lg:px-24">
              <CartItem item={item} />
              <hr className="h-2" />
            </ul>
          );
        }
        return null;
      })}
        <div className="bg-secondary px-8 lg:px-24 mt-auto ">
          <div className="my-6 mx-4 lg:mx-24 font-semibold">
            <div className="flex gap-4 justify-between">
              <h1>Subtotal</h1>
              <div className="flex gap-x-2">
                <IndianRupee size = {20}/>
                <h1>{totalPrice}</h1>
              </div>
            </div>
            {/* <div className="flex gap-4 justify-between mt-4">
              <h1>Shipping</h1>
              <h1>FREE</h1>
            </div> */}
          </div>

          <div className="flex gap-4 justify-between mx-4 lg:mx-24 mb-6 font-bold">
            <h1>Grand Total</h1>
            <div className="flex gap-x-2">
              <IndianRupee size = {20}/>
              <h1>{totalPrice}</h1>
            </div>
          </div>
          <hr className="h-2" />
          <Button
            size = "medium"
            handleClick={checkoutProduct}
            className="w-full mt-6 bg-text-black flex items-center justify-center text-base text-white px-10 py-3 gap-3 font-semibold rounded-lg hover:scale-105 transition-transform uppercase"
          >
            {loading ? "Loading...": "Checkout"}
          </Button>
        </div>
    </div>
  );
};

// onClick={() => {
//   uniqueItemsIds.forEach((id) => {
//     removeFromCart(Number(id));
//   });
// }}

export default Cart;