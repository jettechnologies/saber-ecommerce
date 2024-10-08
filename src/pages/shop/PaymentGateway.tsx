import { ChangeEvent, useCallback, useEffect, useState, useMemo } from 'react'
import cashfree_icon from "@/assets/icons/cashfree-icon.svg";
import razorpay_icon from "@/assets/icons/razorpay-icon.svg";
import payumoney_icon from "@/assets/icons/payumoney-icon.png";
import { useLocation } from "react-router-dom";
import { Order } from "@/types";
import { useAuth } from '@/context/authContext';
// import useGetRequest from '@/hooks/useGetRequest';
import Spinner from '@/components/Spinner';
import DOMPurify from 'dompurify';
import Toast from '@/components/Toast';
// import { isNativePlatform } from '@/utils/platform';
// import { load } from "@cashfreepayments/cashfree-js";
import CashfreeCheckout from '@/components/CashfreeCheckout';
// import { CFCallback } from '@awesome-cordova-plugins/cashfree-pg';
// import useApiRequest from '@/hooks/useApiRequest';


type PaymentGatewayType = "razorpay" | "payumoney" | "cashfree";

declare global {
  interface Window {
    CashfreePG?: any;
  }
}
 
type GatewayResponse = {
  id: number;
  selectedGateway: string;
  updatedAt: string;
}

const PaymentGateway = () => {

  const location = useLocation();
  const orderData:Order = location.state.order;
  const { token, loading:authLoading } = useAuth();
  // const isNative = isNativePlatform();
  // const navigate = useNavigate();

  console.log(authLoading);

  const [selectedGateway, setSelectedGateway] = useState<PaymentGatewayType>();
  const [selectedGateways, setselectedGateways] = useState<GatewayResponse[]>([]);
  const [loadingSelectedGateways, setLoadingSelectedGateways] = useState<boolean>(false);
  const [selectedGatewayError, setSelectedGatewayError] = useState<string | null>(null);
  // const [htmlContent, setHtmlContent] = useState('');
  const [paymentFormHtml, setPaymentFormHtml] = useState('');
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [cashfreePaymentSession, setCashfreePaymentSession] = useState<{payment_sesion_id: string, order_id:string } | null>(null);
  const [cashfreePaymentSession, setCashfreePaymentSession] = useState<string | null>(null);


  // const shouldFetch = useMemo(() => {
  //   return !!token && !authLoading;
  // }, [token, authLoading]);

  // const { data:selectedGateways, loading:loadingSelectedGateways, error:selectedGatewaysError } = useGetRequest<GatewayResponse[]>("payment-gateway-config/payment-config",
  //   {},
  //   shouldFetch
  // )

  useEffect(() =>{
    const fetchSelectedGateways = async() =>{
      setLoadingSelectedGateways(true);
      const url = `${import.meta.env.VITE_PRODUCT_LIST_API}payment-gateway-config/payment-config`;
      try{
        const res = await fetch(url);
        const response = await res.json();

        if(!res.ok){
          throw new Error(response.message);
        }
        setselectedGateways(response);
      }
      catch(err){
        console.log((err as Error).message);
        setSelectedGatewayError((err as Error).message);
      }
      finally{
        setLoadingSelectedGateways(false);
      }
  }
  fetchSelectedGateways();}, []);

  // Function to know which 
  const activeGateway = useMemo(() =>{
    const arrangedGteways =  selectedGateways.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    const currentGateway = arrangedGteways[0];
    return currentGateway?.selectedGateway;
  }, [selectedGateways])

  const handleSelectGateway = (e:ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value as PaymentGatewayType;

    setSelectedGateway(value);
  }

  // useEffect to render cashfree process board
  // useEffect(() =>{
  //   if(cashfreePaymentSession){
  //     const cashfree = (window as any).Cashfree({
  //       mode: 'sandbox', // Change to 'production' for live environment
  //     });

  //     cashfree.checkout({
  //       paymentSessionId: cashfreePaymentSession,
  //     });
  //   }
  // }, [cashfreePaymentSession]);

  // useEffect to render cashfree process board
//   useEffect(() =>{
//     function Checkout() {
//       let cashfree: any;
//       const initializeSDK = async function () {          
//           cashfree = await load({
//               mode: "sandbox"
//           });
//       }
//       initializeSDK();
  
//       const doPayment = async () => {
//           const checkoutOptions = {
//               paymentSessionId: cashfreePaymentSession,
//               redirectTarget: "_modal",
//           };
//           cashfree.checkout(checkoutOptions).then((result: any) => {
//               if(result.error){
//                   // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
//                   console.log("User has closed the popup or there is some payment error, Check for Payment Status");
//                   console.log(result.error);
//                   navigate("/payment-failure", { replace: true });
//               }
//               if(result.redirect){
//                   // This will be true when the payment redirection page couldnt be opened in the same window
//                   // This is an exceptional case only when the page is opened inside an inAppBrowser
//                   // In this case the customer will be redirected to return url once payment is completed
//                   console.log("Payment will be redirected");
//               }
//               if(result.paymentDetails){
//                   // This will be called whenever the payment is completed irrespective of transaction status
//                   console.log("Payment has been completed, Check for Payment Status");
//                   console.log(result.paymentDetails.paymentMessage);
//                   navigate("/payment-success", { replace: true });
//               }
//           });
//     }

//     doPayment();
//   }

//   if(cashfreePaymentSession) Checkout()
// }, [cashfreePaymentSession, navigate]);



  const makePayment = useCallback(async() =>{

    //Making the error state to be empty
    setSelectedGatewayError(null);

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

      // Razorpay paymnet implementation
      if (response.gateway === "razorpay" && selectedGateway === "razorpay") {
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
      else if (selectedGateway === "payumoney") {
        if (response) {
          const cleanHtml = DOMPurify.sanitize(response.data);
          setPaymentFormHtml(cleanHtml);
        } else {
          throw new Error("Invalid PayUMoney response");
        }
      } 
      else if (selectedGateway === "cashfree") {
        if (response.success && response?.data) {
          // setCashfreePaymentSession({payment_sesion_id: response?.data?.payment_session_id, order_id: response?.data?.order_id});
          setCashfreePaymentSession(response?.data?.payment_session_id);
          // setIsModalOpen(true);
        } else {
          throw new Error("Invalid Cashfree response");
        }
      }
    }
    catch(err){
      console.log((err as Error).message);
      setSelectedGatewayError((err as Error).message);
    }

  },[token, selectedGateway, orderData])

  useEffect(() =>{
    if(selectedGateway){
      makePayment();
    }
  }, [makePayment, selectedGateway]);


  return (
    <>
      <div className="w-full h-full px-8 pt-8 lg:px-16">
        <div className="gap-8 min-h-screen grid place-items-center">
              
              {/* Payment method */}
              <div className="p-10">
                <h3 className="text-size-500 text-text-black font-medium uppercase mb-6">select desired payment gateway</h3>
                <div className="flex max-sm:justify-center gap-4 flex-wrap">
                  {
                    loadingSelectedGateways ? <div className='w-full h-full grid place-items-center'>
                      <Spinner />
                    </div>
                      :
                    <>
                      <label className={`custom-radio ${activeGateway !== "razorpay" && "bg-gray"}`}>
                        <input
                          type="radio"
                          disabled = {activeGateway !== "razorpay"}
                          // name="radio"
                          value="razorpay"
                          checked={selectedGateway === 'razorpay'}
                          onChange={handleSelectGateway}
                          className="hidden"
                        />
                        <span
                          className="radio-box flex items-center py-7 px-10 h-10 border-2 border-[#c0c0c0]  shadow-md gap-x-2 text-text-black rounded-md"
                        >
                        <div className={`w-4 h-4 rounded-full ${selectedGateway === "razorpay" ? "bg-blue" : "border-2 border-[#c0c0c0]"} `} />
                        <img src={razorpay_icon} alt = "razor pay icon" className="w-[5rem] h-[5rem] object-contain"/>
                        </span>
                      </label>
                      <label className={`custom-radio ${activeGateway !== "payUmoney" && "bg-gray"}`}>
                        <input
                          type="radio"
                          disabled = {activeGateway !== "payUmoney"}
                          // name="radio"
                          value="payumoney"
                          checked={selectedGateway === 'payumoney'}
                          onChange={handleSelectGateway}
                          className="hidden"
                        />
                        <span
                          className="radio-box flex items-center py-7 px-10 h-10 border-2 border-[#c0c0c0] shadow-md gap-x-4 text-text-black rounded-md"
                        >
                          <div className={`w-4 h-4 rounded-full ${selectedGateway === "payumoney" ? "bg-blue" : "border-2 border-[#c0c0c0]"}`} />
                          <img src={payumoney_icon} alt = "payumoney icon" className="w-[5rem] h-[5rem] object-contain"/>
                        </span>
                      </label>
                      <label className={`custom-radio ${activeGateway !== "cashfree" && "bg-gray"}`}>
                        <input
                          type="radio"
                          disabled = {activeGateway !== "cashfree"}
                          // name="radio"
                          value="cashfree"
                          checked={selectedGateway === 'cashfree'}
                          onChange={handleSelectGateway}
                          className="hidden"
                        />
                        <span
                          className="radio-box flex items-center py-7 px-10 h-10 border-2 border-[#c0c0c0] shadow-md gap-x-2 text-text-black rounded-md"
                        >
                        <div className={`w-4 h-4 rounded-full ${selectedGateway === "cashfree" ? "bg-blue" : "border-2 border-[#c0c0c0]"} cursor-pointer`} />
                        <img src={cashfree_icon} alt = "cashfree icon" className="w-[5rem] h-[5rem] object-contain"/>
                        </span>
                      </label>
                    </>              
                  }
                </div>
              </div>
          </div>
          <PayUMoneyForm formHtml={paymentFormHtml} />


          {/* toast for displaying the error state */}
          {selectedGatewayError && <Toast message={selectedGatewayError} type = "error" />}
      </div>

      {cashfreePaymentSession && <CashfreeCheckout cashfreePaymentSession={cashfreePaymentSession}/>}
    </>
  )
}

export default PaymentGateway

// New component to handle PayUMoney form rendering and submission
const PayUMoneyForm = ({ formHtml }: { formHtml: string }) => {
  useEffect(() => {
    const formContainer = document.getElementById('payUMoneyFormContainer');
    if (formContainer) {
      formContainer.innerHTML = formHtml;
      const form = formContainer.querySelector('form');
      if (form) {
        form.submit();
      }
    }
  }, [formHtml]);

  return <div id="payUMoneyFormContainer" />;
};