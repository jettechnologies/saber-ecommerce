import useGetRequest from "@/hooks/useGetRequest"
import { Order } from "@/types";
import { useAuth } from "@/context/authContext";
// import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import Spinner from "@/components/Spinner";
import OrderCard from "@/components/OrderCard";
import { useMemo } from "react"
// import OrderCard from "@/components/OrderCard";

const Orders = () => {

  const { token } = useAuth();

  const headers = useMemo(() => ({
    'Content-type': 'application/json',
    "Accept": "application/json",
    'Authorization': `Bearer ${token}`,
  }), [token]);

  const { loading:orderLoading, data:orders, error:fetchError } = useGetRequest<Order[]>("order/get-all-my-orders", {headers});

  if(fetchError){
    return<div className="w-full h-screen grid place-items-center">
      <p className="text-text-black font-normal text-size-500">
        {fetchError}
      </p>
      <Link to = "/user" className = "bg-black text-white py-6 px-8 w-full lg:w-[70%] cursor-pointer">
        Try again
      </Link>
    </div>
  }

  if(orderLoading){
    <div className="w-full h-screen grid place-items-center">
      <Spinner />
   </div>
  }

  return (
    <div className="w-full h-full px-8 pt-8 pb-4 lg:px-16">
      <div className="px-6 pb-4 border-b border-[#c0c0c0] mb-8">
        <h4 className="text-sm lg:text-size-600 font-semibold uppercase">my orders</h4>
      </div>
        <div className="flex flex-wrap w-full gap-8 min-h-screen">

          {
            orders && orders.length> 0 && orders.map(order => (
              <div className="max-[1024px]:w-full min-[1026px]:w-[25rem] xl:w-[29vw]" key = {order?.id}>
                {/* <ProductCard product={order?.items[0].product} tag={{
                  type: order?.status === "processing" ? "warning" : "success",
                  msg: order?.status
                }} /> */}
                <OrderCard  order = {order}/>
                {/* <OrderCard order = {order}/> */}
              </div>
            )) 
          }

          {/* {
            orderLoading && <div className="w-full h-screen grid place-items-center">
             <Spinner />
            </div>
          } */}
        </div>
    </div>
  )
}

export default Orders