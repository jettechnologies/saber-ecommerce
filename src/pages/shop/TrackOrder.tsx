import { useAuth } from "@/context/authContext";
import { useCallback, useState } from "react";
import { Order } from "@/types";
import { Link } from "react-router-dom";
import trackOne from "@/assets/images/track-l.jpg";

const TrackOrder = () => {

    const [trackOrder, setTrackOrder] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [validateError, setValidateError] = useState(false);
    const [data, setData] = useState<Order | null>(null);
    const {token, loading:authLoading} = useAuth();


    const handleTrackingOrder = useCallback(async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(!authLoading && token){  

            if(trackOrder === ""){
                setValidateError(true);
            }

            const url = `browse/track-order?keyword=${trackOrder}`;

            const headers:HeadersInit = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }

            try{
                setLoading(true)
                const res = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}${url}`,{
                    headers,
                });

                if (!res.ok) {
                    const errorResponse = await res.json();
                    throw new Error(errorResponse?.message || "Resource not found");
                }
                
                const response:Order = await res.json();
                console.log(response);
                setData(response)
            }
            catch(err){
                console.log((err as Error).message);
                setError((err as Error).message);
            }
            finally{
                setLoading(false);
            }
        }
    }, [authLoading, token, trackOrder]);

    if(error !== ""){
        <div className="w-full min-h-screen">
            <p className="text-text-black font-medium text-base">
                {error}
            </p>
            <Link to = "/order/track" className = "bg-black text-white py-6 px-8 w-full lg:w-[70%] cursor-pointer">
                Try again
            </Link>
        </div>
    }

  return (
    <div className="mt-12 lg:mt-16 mx-8 lg:mx-16">
        <h2 className="text-size-600 lg:text-2xl xl:text-2xl font-bold text-text-black uppercase text-center">
            track order
        </h2>
        {!data ? <div className="w-full mt-16">
            <form onSubmit={handleTrackingOrder}>
                <div className="w-full lg:w-[70%] mx-auto h-16 xl:h-32">
                    <div className="flex w-full h-full focus-within:border-2 focus:border-2 focus-within:border-blue focus:border-blue">
                    <input 
                            type="text" 
                            name="track_order" 
                            id="track_order" 
                            placeholder="Enter your tracking ID"
                            value = {trackOrder}
                            onChange={(e) => setTrackOrder(e.target.value)}
                            className="text-size-600 font-normal text-text-black border-none bg-gray h-full w-full px-4 focus-within:outline-none focus:outline-none"
                        />
                        <button
                            className="text-size-600 font-semibold h-full w-[30%] px-6 uppercase bg-black text-white"
                        >
                           {loading ? "Loading..." : "track"}
                        </button>
                    </div>
                    {validateError && <p className="text-red-500 text-base font-medium">The field is required</p>}
                </div>
            </form>
            <div className="w-full mt-8">
                <p className="text-size-500 font-normal text-text-black mb-4">
                    Normally your package will arrive within 2-5 working days after placing your order. 
                    In case of weather disasters, and holidays there may be delays. 
                    or any questions please contact us through our appropriate medium. Thank you for your support and patience.
                </p>
                <img src={trackOne} alt="track one image"  className="w-full h-[25rem] boder-2 object-cover"/>
            </div>
        </div> : 
            <div className="w-full px-8 min-h-screen grid place-content-center">
                <p className="font-medium text-size-600 text-text-black mb-5">
                    Your order of orderID {data?.orderID} is been {data?.status} at the moment.
                </p>
                <Link to = "/store" className = "bg-black text-size-600 mx-auto text-center text-white py-4 first-letter:uppercase px-8 w-full lg:w-[70%] cursor-pointer">
                    continue to shop
                </Link>
            </div>
        }
    </div>
  )
}

export default TrackOrder