import { IndianRupee, Truck, Warehouse } from "lucide-react";
import Carrousel from "@/components/Carrousel";
import { useEffect, useState, useMemo } from "react";
import { useUserProfile } from "@/context/userProfileContext";
import { useAuth } from "@/context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Order } from "@/types";
import Button from "@/components/Button";
import { BadgeCheck } from "lucide-react";
import Modal2 from "@/components/Modal2";
import { useCartContext } from "@/context/cartContext";
import { validateObject } from "@/utils/inputValidation";
import Toast from "@/components/Toast";


interface OrderType{
    orderType: string;
    name: string,
    mobile: string,
    billing_address: string,
    billing_city: string,
    billing_state: string,
    email: string,
    dropOffPinCode: string,
}


const Checkout = () => {


  // getting the order state from the url
  const location = useLocation();
  const orderData:Order = location.state.order;

  const navigate = useNavigate();

  const { user } = useUserProfile();
  const { token } = useAuth();
  const { deletingCart } = useCartContext();
  const [order, setOrder] = useState<OrderType>({
    orderType: "",
    name: "",
    mobile: "",
    billing_address: "",
    billing_city: "",
    billing_state: "",
    email: "",
    dropOffPinCode: "",
  });
  const [promoCode, setPromoCode] = useState("");
  const [secondAddress, setSecondAddress] = useState({
    isActive: false,
    billing_address_2: "",
  })

  console.log(order);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<{message:string; order:Order} | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() =>{
    if(user !== null){
      setOrder((prevState) =>({
        ...prevState,
        name: user.fullname,
        mobile: user.mobile,
        email: user.email,
      }));
    } 
  }, [user]);


  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;

    if(name === "billing_address" || name === "billing_city" || name === "billing_state"){
      setOrder({ ...order, [name]: value});

      return;
    }

    setOrder({ ...order, [name]: value.trim()});     
  }


  const orderCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const data = {
      // paymentType: order.paymentType,
      ordertType: order.orderType,
      name: order.name,
      email: order.email,
      mobile: order.mobile,
      billing_address: order.billing_address,
      billing_address_2: secondAddress?.billing_address_2 || "",
      billing_city: order.billing_city,
      billing_state: order.billing_state,
      billing_pincode: order.dropOffPinCode,
      promoCode: promoCode,
    };

    const orderId = orderData.id;
  
    if (!orderId) {
      console.error("Order ID is missing");
      return;
    }

    console.log(data)
  
    const url = `${import.meta.env.VITE_PRODUCT_LIST_API}order/confirm-order/${orderId}`;
  
    try {
      setLoading(true);
      
      const res = await fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 404) {
          const errorResponse = await res.json();
          console.error("Error 404:", errorResponse);
          throw new Error(`${errorResponse.message || "Forbidden resource"}`);
        }
        else if (res.status === 403) {
          // const errorResponse = await res.json();
          throw new Error("Invalid promo code. Please check the code and try again");
        }
        // console.log(res.body);
        // throw new Error("Request not sent, status code: " + res.status);
      }
  
      if(res.ok){
        const response = await res.json();
        setResponse(response);
        setModalOpen(prevState => !prevState);
      }

    } catch (err) {
      setError((err as Error).message); 
    } finally {
      setLoading(false);
    }
  };

  // function to check if all the fields are been filled
  const isFilled = useMemo(() => {
    try {
      return validateObject(order);
    } catch (err) {
      console.log((err as Error).message)
      return false;
    }
  }, [order]);

  const newTotal = useMemo(() => {
    if (response && response?.order.discount) {
      // const discount = response?.order.discount && response?.order.discount
      const discountAmount = (orderData.total * response?.order.discount) / 100;
      const discountedTotal = (orderData.total - discountAmount).toFixed(2);
  
      return parseFloat(discountedTotal); // Convert string to number for further calculations
    }
  
    return orderData.total; // Return original total if no discount is applied
  }, [response, orderData]);
  
  console.log(isFilled)
  

  return (
    <>
      <div className="py-10 lg:py-14 bg-gray">
        <div className="w-full flex flex-col lg:flex-row gap-5 pt-5 px-5 lg:px-8">
          <div className="flex-1 max-[780px]:order-2 px-5 bg-white rounded-md">
            {/* Contact information */}
            <div className="py-4">
              <h3 className="text-size-500 text-text-black font-medium uppercase mb-6">1. contact information</h3>
              <form
                id="order_checkout_form"
                onSubmit={orderCheckout}
                className="w-full flex flex-col gap-y-4"
              >
              <div className="w-full">
                <label
                  htmlFor="fullname"
                  className="text-size-400 lg:text-size-500 text-text-black font-medium mb-3"
                >
                  Fullname
                </label>
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  id="fullname"
                  name="name"
                  value = {order.name}
                  onChange={handleInputChange}
                  className="mt-3 border border-[#c0c0c0] w-full p-3 font-roboto text-size-400 font-normal first-letter:uppercase"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="text-size-400 lg:text-size-500 text-text-black font-medium mb-3"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter a valid email"
                  id="email"
                  name="email"
                  value = {order.email}
                  onChange={handleInputChange}
                  className="mt-3 border border-[#c0c0c0] w-full p-3 font-roboto text-size-400 font-normal first-letter:uppercase"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="mobile"
                  className="text-size-400 lg:text-size-500 text-text-black font-medium mb-3"
                >
                  Mobile
                </label>
                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  id="mobile"
                  name="mobile"
                  value = {order.mobile}
                  onChange={handleInputChange}
                  className="mt-3 border border-[#c0c0c0] w-full p-3 font-roboto text-size-400 font-normal first-letter:uppercase"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label
                    htmlFor="billing_city"
                    className="text-size-400 lg:text-size-500 text-text-black font-medium mb-3"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Eg Manchester city"
                    id="billing_city"
                    name="billing_city"
                    value = {order.billing_city}
                    onChange={handleInputChange}
                    className="mt-3 border border-[#c0c0c0] w-full p-3 font-roboto text-size-400 font-normal first-letter:uppercase"
                  />
                </div>
                  <div className="w-full">
                  <label
                    htmlFor="billing_state"
                    className="text-size-400 lg:text-size-500 text-text-black font-medium mb-3"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="Eg England"
                    id="billing_state"
                    name="billing_state"
                    value = {order.billing_state}
                    onChange={handleInputChange}
                    className="mt-3 border border-[#c0c0c0] w-full p-3 font-roboto text-size-400 font-normal first-letter:uppercase"
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="billing_address"
                  className="text-size-400 lg:text-size-500 text-text-black font-medium mb-3"
                >
                  Billing address
                </label>
                <input
                  type="text"
                  placeholder="Eg 12 luton street, manchester city, london"
                  id="billing_address"
                  name="billing_address"
                  value = {order.billing_address}
                  onChange={handleInputChange}
                  className="mt-3 border border-[#c0c0c0] w-full p-3 font-roboto text-size-400 font-normal first-letter:uppercase"
                />
              </div>
              <div className="w-full flex flex-col gap-4 mt-4">
                <div className="w-fit flex gap-4 items-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4"
                    name = "isActive" 
                    id = "isActive"
                    checked = {secondAddress.isActive}
                    onChange={() => setSecondAddress({...secondAddress, isActive: !secondAddress.isActive})}
                  />
                  <label htmlFor="isActive">
                    Select to input a second billing address
                  </label>
                </div>
                {secondAddress.isActive && <div className="w-full">
                  <label
                    htmlFor="billing_address_2"
                    className="text-size-400 lg:text-size-500 text-text-black font-medium mb-3"
                  >
                    Billing address
                  </label>
                  <input
                    type="text"
                    placeholder="Eg 12 luton street, manchester city, london"
                    id="billing_address_2"
                    name="billing_address_2"
                    value = {secondAddress.billing_address_2}
                    onChange={(e) => setSecondAddress({...secondAddress, billing_address_2: e.target.value})}
                    className="mt-3 border border-[#c0c0c0] w-full p-3 font-roboto text-size-400 font-normal first-letter:uppercase"
                  />
                </div>}
              </div>
                <hr className="text-[#c0c0c0] my-4"/>
                {/* Delivery method */}
              <div className="">
                <h3 className="text-size-500 text-text-black font-medium uppercase mb-6">2. Order Type</h3>
                <div className="flex">
                  {/* <label className="custom-radio">
                    <input
                      type="radio"
                      name="orderType"
                      value="door_delivery"
                      checked={order.paymentType === "cod"}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span
                      className={`radio-box py-6 px-5 w-fit h-10 border-2 border-gray gap-x-4 rounded-md flex items-center justify-center ${
                        order.paymentType === 'cod'
                          ? 'bg-blue text-white'
                          : 'bg-white text-black'
                      }`}
                    >
                      <Truck size = {20}/>
                      <p className="text-sm lg:text-size-500 capitalize">Cash on delivery</p>
                    </span>
                  </label>
                  <label className="custom-radio ml-6">
                    <input
                      type="radio"
                      name="orderType"
                      value="pick_up"
                      checked={order.paymentType === 'prepaid'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span
                      className={`radio-box py-6 px-5 w-fit h-10 border-2 border-gray gap-x-4 rounded-md flex items-center justify-center ${
                        order.paymentType === 'prepaids'
                          ? 'bg-blue text-white'
                          : 'bg-white text-black'
                      }`}
                      >
                      <Warehouse size = {20}/>
                      <p className="text-sm lg:text-size-500 capitalize">prepaid</p>
                    </span>
                  </label> */}
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="orderType"
                      value="door_delivery"
                      checked={order.orderType === "door_delivery"}
                      onChange={handleInputChange}
                      className="hidden cursor-pointer"
                    />
                    <span
                      className={`radio-box py-6 px-5 w-fit h-10 border-2 border-gray gap-x-4 rounded-md flex items-center justify-center ${
                        order.orderType === 'door_delivery'
                          ? 'bg-blue text-white'
                          : 'bg-white text-black'
                      }`}
                    >
                      <Truck size = {20}/>
                      <p className="text-sm lg:text-size-500 capitalize">Cash on delivery</p>
                    </span>
                  </label>
                  <label className="custom-radio ml-6">
                    <input
                      type="radio"
                      name="orderType"
                      value="pick_up"
                      checked={order.orderType === 'pick_up'}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span
                      className={`radio-box py-6 px-5 w-fit h-10 border-2 border-gray gap-x-4 rounded-md flex items-center justify-center ${
                        order.orderType === 'pick_up'
                          ? 'bg-blue text-white'
                          : 'bg-white text-black'
                      }`}
                      >
                      <Warehouse size = {20}/>
                      <p className="text-sm lg:text-size-500 capitalize">prepaid</p>
                    </span>
                  </label>
                </div>
              </div>
              {/* postal code */}
                <hr className="text-[#c0c0c0] my-4"/>
              <div className="w-full">
                <h3 className="text-size-500 text-text-black font-medium uppercase mb-6">3. Postal Code</h3>
                <div>
                  {(order.orderType === "door_delivery" || order.orderType === "pick_up" ) && <div className="flex flex-col lg:flex-row gap-4 ">
                    <div className="w-full">
                      <label
                        htmlFor="dropOffCode"
                        className="text-size-400 lg:text-size-500 text-text-black font-medium mb-3 capitalize"
                      >
                        Enter your postal code
                      </label>
                      <input
                        type="number"
                        placeholder="Eg. 1123410"
                        id="dropOffCode"
                        name="dropOffPinCode"
                        value = {order.dropOffPinCode}
                        onChange={handleInputChange}
                        className="mt-3 border border-[#c0c0c0] w-full p-4 rounded-md font-roboto text-size-400 font-normal first-letter:uppercase"
                      />
                    </div>
                  </div>}
                </div>     
              </div>

              </form>
            </div>
          </div>
          {/* orders display */}
          <div className="w-full lg:w-[40vw] h-full bg-white p-5">
            <h3 className="text-size-500 font-medium text-text-black uppercase mb-6">
              my orders
            </h3>
            <div className="w-full h-60">
              <Carrousel 
                hasArrows = {true}
                autoPlayInterval={3500}
                content={orderData.items.map((order) =>(
                  <div key={order.product.id} className="w-full h-full">
                    <img src={order.product.productImage} alt="product image" className="w-full h-full object-contain"/>
                  </div>
                ))}
              />
            </div>
            <hr className="my-4 bg-[#c0c0c0]" />
            <ul className="w-full min-h-full mt-2">
              {
                orderData.items.length > 0 && 
                orderData.items.map(order =>(
                  <li className="flex gap-x-3 py-3 border-b border-[#c0c0c0]">
                    <img src={order.product.productImage} alt="image icon" className="w-16 h-16 rounded-md object-cover"/>
                    <div className="w-">
                      <p className="text-size-400 lg:text-size-500 font-normal text-text-black first-letter:uppercase">
                        {order.product.name}
                      </p>
                      <div className="flex gap-x-2 capitalize mt-2 text-sm lg:text-size-500">
                        <p className="text-sm text-[#c0c0c0]">
                          Qty: {order.quantity}
                        </p>
                        {/* {order.product.available_colors && <p className="text-sm text-[#c0c0c0]">
                          {order.product.available_colors}
                        </p>} */}
                        {/* {order.product.available_sizes && <p className="text-sm text-[#c0c0c0]">
                          {order.product.available_sizes}
                        </p>} */}
                      </div>
                      <div className="flex gap-x-3 mt-2">
                        <IndianRupee size = {20} />
                        <p className="text-size-400 font-semibold text-text-black">
                          {order.price}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
            {/* end of order list */}
            <div className="w-full mt-3 bg-white p-4 max-[780px]:hidden">
              <div className="w-full mb-4">
                <label
                  htmlFor="promo_code"
                  className="text-size-400 text-text-black font-medium mb-3"
                >
                  Enter promo code
                </label>
                <input
                  type="text"
                  placeholder="Eg SMART_30"
                  id="promo_code"
                  name="promoCode"
                  value = {promoCode}
                  onChange={(e) => setPromoCode(e.target.value.trim())}
                  className="mt-3 border border-[#c0c0c0] w-full p-3 font-roboto text-size-400 font-normal first-letter:uppercase rounded-md"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                  <div className="flex w-full justify-between items-center">
                    <p className="text-text-black capitalize font-normal text-sm">cart subtotal:</p>
                      <div className="flex gap-x-3 mt-2">
                        <IndianRupee size = {20} />
                        <p className="text-size-400 font-semibold text-text-black">
                          {orderData.subTotal}
                        </p>
                      </div>
                  </div>
                  <div className="flex w-full justify-between items-center">
                    <p className="text-text-black capitalize font-normal text-sm">shipping fee:</p>
                      <div className="flex gap-x-3 mt-2">
                        <IndianRupee size = {20} />
                        <p className="text-size-400 font-semibold text-text-black">
                          {orderData.shippinFee}
                        </p>
                      </div>
                  </div>
                  {/* <div className="flex w-full justify-between items-center">
                    <p className="text-text-black capitalize font-normal text-sm">discount:</p>
                      <div className="flex gap-x-3 mt-2">
                        <IndianRupee size = {20} />
                        <p className="text-size-400 font-semibold text-red-500">
                          {orderData.discount ? orderData.discount : "0.00"}
                        </p>
                      </div>
                  </div> */}
              </div>
              <hr className="my-4 bg-[#c0c0c0]" />
              <div>
                <div className="flex w-full justify-between">
                  <p className="text-text-black text-sm font-semibold">Total</p>
                    <div className="flex gap-x-3 mt-2">
                        <IndianRupee size = {20} />
                        <p className="text-size-400 font-semibold text-text-black">
                          {orderData.total ? orderData.total : "0.00"}
                        </p>
                    </div>
                </div>
                <button 
                  type="submit"
                  disabled = {loading || !isFilled}
                  className={`${loading || !isFilled && "opacity-80 cursor-not-allowed"} uppercase font-medium text-size-500 w-full mt-4 px-6 py-3 bg-[#141718] text-white font-roboto rounded-md cursor-pointer`}
                  form="order_checkout_form"
                >
                  <p className="text-white">{loading ? "Loading..." : "place order"}</p>

                </button>
              </div>
            </div>
          </div>  
        </div>
        {/* mobile checkout block */}
        <div className="hidden w-full max-[780px]:h-[14rem] shadow-md fixed bottom-0 left-0 z-10 bg-white max-[780px]:block p-4 overflow-y-scroll">
          <div className="w-full overflow-auto mb-4">
            <label
              htmlFor="promo_code"
              className="text-size-400 text-text-black font-medium mb-3"
            >
              Enter promo code
            </label>
            <input
              type="text"
              placeholder="Eg SMART_30"
              id="promo_code"
              name="promoCode"
              value = {promoCode}
              onChange={(e) => setPromoCode(e.target.value.trim())}
              className="mt-3 border border-[#c0c0c0] w-full p-3 font-roboto text-size-400 font-normal first-letter:uppercase rounded-md"
            />
          </div>
          <div className="flex flex-col gap-y-2">
              <div className="flex w-full justify-between items-center">
                <p className="text-text-black capitalize font-normal text-sm">cart subtotal:</p>
                  <div className="flex gap-x-3 mt-2">
                    <IndianRupee size = {20} />
                    <p className="text-size-400 font-semibold text-text-black">
                      {orderData.subTotal}
                    </p>
                  </div>
              </div>
              <div className="flex w-full justify-between items-center">
                <p className="text-text-black capitalize font-normal text-sm">shipping fee:</p>
                  <div className="flex gap-x-3 mt-2">
                    <IndianRupee size = {20} />
                    <p className="text-size-400 font-semibold text-text-black">
                      {orderData.shippinFee}
                    </p>
                  </div>
              </div>
          </div>
          <hr className="my-4 bg-[#c0c0c0]" />
          <div>
            <div className="flex w-full justify-between">
              <p className="text-text-black text-sm font-semibold">Total</p>
                <div className="flex gap-x-3 mt-2">
                    <IndianRupee size = {20} />
                    <p className="text-size-400 font-semibold text-text-black">
                      {orderData.total ? orderData.total : "0.00"}
                    </p>
                </div>
            </div>
            <button 
              type="submit"
              disabled = {loading || !isFilled}
              className={`${loading || !isFilled && "opacity-80 cursor-not-allowed"} uppercase font-medium text-size-500 w-full mt-4 px-6 py-3 bg-[#141718] text-white font-roboto rounded-md cursor-pointer`}
              form="order_checkout_form"
            >
              <p className="text-white">{loading ? "Loading..." : "place order"}</p>
            </button>
          </div>
        </div>
      </div>
      {/* modal 2 for success mesage or error message */}
      {/* <Modal2 title="Order confirmation" isOpen = {modalOpen} handleModalClose = {()=> setModalOpen(prevState => !prevState)}>
        <div className="flex flex-col w-full ">
          <div className="flex items-center gap-3">
              {error !== null ? <CircleAlert size = {35} color = "rgb(239 68 68)" /> 
                : 
                response && <BadgeCheck size = {35} color = "rgb(34 197 94 )"/>}
              {error !== null ? <p className="text-base font-normal first-letter:uppercase">{error}</p> : response &&<p className="font-normal text-base">
              Your order has been placed successfully 
               {response?.order.discount ? <span className = "font-semibold ml-1">{`with ${response?.order.discount}% discount applied`}</span> : ""}
              , Please Proceed to make Payment
            </p>}
          </div>
          <div className="mt-5 border-t border-[#f0f0f0] pt-3">
            {error !== null ? <Button  
                size="medium"
                handleClick={() => {
                  setModalOpen(prevState => !prevState);
                  setError(null);
                }}
                className="text-sm uppercase w-full"
              >
                Place order again
              </Button>
              : 
              response && <Button  
              size="medium"
              handleClick={() => {
                navigate("/courier-service", {replace:true, state:{order: response.order}});
                deletingCart();
              }}
              className="text-sm text-white uppercase w-full flex gap-x-2 justify-center"
            > 
              <p>pay now</p>
              <IndianRupee size = {20} />
              <p>{newTotal ? newTotal : response?.order.total}</p>
            </Button>}
          </div>
        </div>
      </Modal2>  */}

      <Modal2 title="Order confirmation" isOpen={modalOpen} handleModalClose={() => setModalOpen(prevState => !prevState)}>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-3">
            <BadgeCheck size={35} color="rgb(34 197 94)" />
            <p className="font-normal text-base">
              Your order has been placed successfully 
              {response?.order.discount && (
                <span className="font-semibold ml-1">
                  {`with ${response?.order.discount}% discount applied`}
                </span>
              )}
              , Please Proceed to make Payment
            </p>
          </div>
          <div className="mt-5 border-t border-[#f0f0f0] pt-3">
            <Button
              size="medium"
              handleClick={() => {
                response && navigate("/courier-service", {replace: true, state: {order: response.order}});
                deletingCart();
              }}
              className="text-sm text-white uppercase w-full flex gap-x-2 justify-center"
            >
              <p>pay now</p>
              <IndianRupee size={20} />
              <p>{newTotal || response?.order.total}</p>
            </Button>
          </div>
        </div>
      </Modal2>


      {/* toast to show only the error message */}
      {error && <Toast message={error} type="error"/>}

    </>
  )
}

export default Checkout