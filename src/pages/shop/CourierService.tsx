import { useMemo, useEffect, useState, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { Order, CourierInfo, CourierResponse } from "@/types";
import { CircleAlert, IndianRupee } from "lucide-react";
import { useAuth } from "@/context/authContext";
import useApiRequest from "@/hooks/useApiRequest";
import Spinner from "@/components/Spinner";
import StarRating from "@/components/StarRating";
import Button from "@/components/Button";
import Modal2 from "@/components/Modal2";
import Toast from "@/components/Toast";


const CourierService = () => {

  const location = useLocation();
  const orderData:Order = location.state.order;
  const { token } = useAuth();

  const headers = useMemo(() => {
    if(token){
      return {
        'Authorization': `Bearer ${token}`,
      }
    }
  }, [token]);

  const navigate = useNavigate();


//   const { data:courierServices, error:fetchError, loading:fetchLoading } = useGetRequest<CourierInfo[] | []>(`order/fetch-available-courier-services/${orderData.id}`, {headers: headers});
  
  const { loading:fetchLoading, error:fetchError, response, makeRequest } = useApiRequest<CourierResponse, {courierID:number}>({
    method:"POST",
  });
  const previousCourierId = useRef<number | null>(null);
  const [courierServices, setCourierService] = useState<CourierInfo[] | []>([]);
  const [currentCourierId, setCurrentCourierId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [disclaimer, setDisclaimer] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}order/fetch-available-courier-services/${orderData?.id}`, {
            headers,
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result: CourierInfo[] = await response.json();
        setCourierService(result);
      } catch (err) {
        console.log(err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [orderData?.id, headers]);

  const handleCourierService = useCallback(async (orderId: number, courierId: number) => {
    try {
      const data = {
        courierID: courierId,
      };
      await makeRequest(data, `order/select-courier/${orderId}`, headers);
    } catch (e) {
      console.log((e as Error).message);
    }
  }, [headers, makeRequest]);

  useEffect(() => {
    // Only trigger if currentCourierId has changed
    if (currentCourierId !== null && currentCourierId !== previousCourierId.current) {
      handleCourierService(orderData.id, currentCourierId);
      previousCourierId.current = currentCourierId;
    }
  }, [orderData.id, currentCourierId, handleCourierService]);


  const total = useMemo(() => {
    if(response){
      const subtotal = parseFloat(response.subTotal);
      const shippingFee = response.shippinFee;

      const total = shippingFee + subtotal;
      setModalOpen(true);
      return total.toFixed(2);
    }
  }, [response]);

  console.log(total)

  if(loading){
    return<div className = "w-full h-full grid place-items-center"><Spinner /></div>
  }

  if(error){
    return <div className="w-full h-full grid place-items-center">
        <p>{error}</p>
    </div>
  }

  return (
    <>
      <section className="w-full min-screen mt-14">
        <div className="px-12 flex justify-center md:justify-normal gap-8 flex-wrap">
            {(courierServices && courierServices.length > 0) && courierServices.map((courier) => (
                <div key = {courier?.courier_company_id} className="w-[18rem] md:w-[41vw] lg:w-[18rem] min-h-[12rem] rounded-lg shadow-md shadow-gray flex flex-col gap-3 border-2 border-gray p-5"> 
                    <p className="text-text-black text-size-500">
                        <span className="font-bold uppercase mr-3">Courier name:</span>
                        {courier?.courier_name}
                    </p>
                    <p className="text-text-black text-size-500">
                        <span className="font-bold uppercase mr-3">City:</span>
                        {courier.city}
                    </p>
                    <p className="text-text-black text-size-500">
                        <span className="font-bold uppercase mr-3">Delivery days:</span>
                        {`${courier?.estimated_delivery_days} days`}
                    </p>
                    <p className="text-text-black text-size-500">
                        <span className="font-bold uppercase mr-3">Delivery date:</span>
                        {courier?.etd} 
                    </p>
                    <p className="text-text-black text-size-500 flex items-center">
                        <span className="font-bold uppercase mr-3">Charge:</span>
                        <span className="flex items-center gap-1">
                          <IndianRupee size={20} /> 
                          {courier?.freight_charge}
                        </span>
                    </p>
                    <p className="text-text-black text-size-500">
                        <span className="font-bold uppercase mr-3">Rating:</span>
                        <StarRating rating={courier?.rating} />
                    </p>
                    <p className="text-text-black text-size-500">
                        <span className="font-bold uppercase mr-3">Min weight:</span>
                        {`${courier?.min_weight} kgs`} 
                    </p>
                    <Button 
                        disabled = {(fetchLoading && currentCourierId === courier?.id)}
                        size="medium"
                        className = "mt-2 text-white text-sm uppercase font-semibold"
                        handleClick={() => setCurrentCourierId(courier?.id)}
                    >
                        {(fetchLoading && currentCourierId === courier?.id) ? "Loading" : "Select courier service"}
                    </Button>
                </div>
            ))}
        </div>
    </section>
     <Modal2 title="Courier confirmation" isOpen={modalOpen} handleModalClose={() => setModalOpen(prevState => !prevState)}>
        <div className="flex flex-col w-full">
          <div className="flex items-start gap-3">
            {/* <BadgeCheck size={35} color="rgb(34 197 94)" /> */}
            <CircleAlert size = {35} color = "rgb(239 68 68)" />
            <p className="font-normal text-sm w-[80%]">
              {/* Your order has been placed successfully 
              {response?.order.discount && (
                <span className="font-semibold ml-1">
                  {`with ${response?.order.discount}% discount applied`}
                </span>
              )}
              , Please Proceed to make Payment */}
              <span className="font-bold">Disclaimer</span>: 
              Please note that this order will be processed and fulfilled manually. Our team will review and handle your order with care, and you will receive a confirmation once it has been successfully processed. 
              If you have any questions or need further assistance, please don't hesitate to contact our support team.
            </p>
          </div>
          <div className="flex w-full gap-3 mt-3 items-center justify-center">
            <input 
              className = "w-5 h-5"
              type="checkbox" 
              id="disclaimer" 
              checked = {disclaimer}
              onChange = {() => setDisclaimer(prevState => !prevState)}
            />
            <p className="text-text-black text-sm font-bold">
              I understand and agree to the disclaimer above.
            </p>
          </div>
          <div className="mt-5 border-t border-[#f0f0f0] pt-3">
            <Button
              size="medium"
              disabled={!disclaimer}
              handleClick={() => {
                navigate("/payment-gateway", {replace: true, state: {order: orderData}});
              }}
              className="text-sm text-white uppercase w-full flex gap-x-2 justify-center"
            >
              <p>pay now</p>
              <IndianRupee size={20} />
              <p>{total}</p>
            </Button>
          </div>
        </div>
      </Modal2>

      {/* toast */}
      {fetchError && <Toast message={fetchError} type="error" />}
    </>
  )
}

export default CourierService