import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import cashfree_icon from "@/assets/icons/cashfree-icon.svg";
import razorpay_icon from "@/assets/icons/razorpay-icon.svg";
import payumoney_icon from "@/assets/icons/payumoney-icon.png";
import { useLocation } from "react-router-dom";
import { Order } from "@/types";
import { useAuth } from '@/context/authContext';
// import useApiRequest from '@/hooks/useApiRequest';

const PaymentGateway = () => {

  const location = useLocation();
  const orderData:Order = location.state.order;
  const { token } = useAuth();

  console.log(orderData);

  const [selectedGateway, setSelectedGateway] = useState<"razorpay" | "payumoney" | "cashfree">();

  const handleSelectGateway = (e:ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value as "razorpay" | "payumoney" | "cashfree";

    setSelectedGateway(value);
  }

  const makePayment = useCallback(async() =>{
    const url = `${import.meta.env.VITE_PRODUCT_LIST_API}order/process-payment/${orderData.id}`;
    const headers:HeadersInit = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }

    const data = {
      gateway: selectedGateway,
    }

    try{
      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });

      const response = await res.json();
      if(!res.ok){
        throw new Error(response.message);
      }

      console.log(response);

      if (response.gateway === "razorpay") {
        const options = {
          amount: response.amount,
          currency: response.currency,
          name: 'Thegearmates',
          description: 'Payment for order ' + response.orderID,
          order_id: response.orderID,
          handler: function (response: any) {
            alert('Payment successful!');
            console.log(response);
            // You can handle the successful payment here
          },
          prefill: {
            name: orderData.user?.fullname,
            email: orderData.user?.email, 
            contact: orderData.user?.mobile,
          },
          theme: {
            color: '#3399cc',
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
      // window.location.href = response.redirectUrl;
    }
    catch(err){
      console.log((err as Error).message);
    }

  },[token, selectedGateway, orderData])

  useEffect(() =>{
    if(selectedGateway){
      makePayment();
    }
  }, [makePayment, selectedGateway]);

  // console.log(selectedGateway);

  return (
    <div className="w-full h-full px-8 pt-8 lg:px-16">
        <div className="gap-8 min-h-screen grid place-items-center">
            
            {/* Payment method */}
            <div className="p-10">
              <h3 className="text-size-500 text-text-black font-medium uppercase mb-6">select desired payment gateway</h3>
              <div className="flex max-sm:justify-center gap-4 flex-wrap">
                <label className="custom-radio">
                  <input
                    type="radio"
                    // name="radio"
                    value="razorpay"
                    checked={selectedGateway === 'razorpay'}
                    onChange={handleSelectGateway}
                    className="hidden"
                  />
                  <span
                    // className={`radio-box inline-block w-20 h-10 border-2 ${
                    //   selectedOption === 'option2'
                    //     ? 'bg-blue text-white'
                    //     : 'bg-white text-black'
                    // } flex items-center justify-center`}
                    className="radio-box flex items-center py-7 px-10 h-10 border-2 border-[#c0c0c0]  shadow-md gap-x-2 text-text-black rounded-md"
                  >
                   <div className={`w-4 h-4 rounded-full ${selectedGateway === "razorpay" ? "bg-blue" : "border-2 border-[#c0c0c0]"} `} />
                  <img src={razorpay_icon} alt = "razor pay icon" className="w-[5rem] h-[5rem] object-contain"/>
                  </span>
                </label>
                <label className="custom-radio">
                  <input
                    type="radio"
                    // name="radio"
                    value="payumoney"
                    checked={selectedGateway === 'payumoney'}
                    onChange={handleSelectGateway}
                    className="hidden"
                  />
                  <span
                    // className={`radio-box inline-block w-20 h-10 border-2 ${
                    //   selectedOption === 'option2'
                    //     ? 'bg-blue text-white'
                    //     : 'bg-white text-black'
                    // } flex items-center justify-center`}
                    className="radio-box flex items-center py-7 px-10 h-10 border-2 border-[#c0c0c0] shadow-md gap-x-4 text-text-black rounded-md"
                  >
                    <div className={`w-4 h-4 rounded-full ${selectedGateway === "payumoney" ? "bg-blue" : "border-2 border-[#c0c0c0]"}`} />
                    <img src={payumoney_icon} alt = "payumoney icon" className="w-[5rem] h-[5rem] object-contain"/>
                  </span>
                </label>
                <label className="custom-radio">
                  <input
                    type="radio"
                    // name="radio"
                    value="cashfree"
                    checked={selectedGateway === 'cashfree'}
                    onChange={handleSelectGateway}
                    className="hidden"
                  />
                  <span
                    // className={`radio-box inline-block w-20 h-10 border-2 ${
                    //   selectedOption === 'option2'
                    //     ? 'bg-blue text-white'
                    //     : 'bg-white text-black'
                    // } flex items-center justify-center`}
                    className="radio-box flex items-center py-7 px-10 h-10 border-2 border-[#c0c0c0] shadow-md gap-x-2 text-text-black rounded-md"
                  >
                   <div className={`w-4 h-4 rounded-full ${selectedGateway === "cashfree" ? "bg-blue" : "border-2 border-[#c0c0c0]"} `} />
                  <img src={cashfree_icon} alt = "cashfree icon" className="w-[5rem] h-[5rem] object-contain"/>
                  </span>
                </label>
              </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentGateway