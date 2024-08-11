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
import Modal2 from '@/components/Modal2';
import Toast from '@/components/Toast';
// import useApiRequest from '@/hooks/useApiRequest';


type PaymentGatewayType = "razorpay" | "payumoney" | "cashfree";
 
type GatewayResponse = {
  id: number;
  selectedGateway: string;
  updatedAt: string;
}

const PaymentGateway = () => {

  const location = useLocation();
  const orderData:Order = location.state.order;
  const { token, loading:authLoading } = useAuth();

  console.log(authLoading);

  const [selectedGateway, setSelectedGateway] = useState<PaymentGatewayType>();
  const [selectedGateways, setselectedGateways] = useState<GatewayResponse[]>([]);
  const [loadingSelectedGateways, setLoadingSelectedGateways] = useState<boolean>(false);
  const [selectedGatewayError, setSelectedGatewayError] = useState<string | null>(null);
  // const [htmlContent, setHtmlContent] = useState('');
  const [paymentFormHtml, setPaymentFormHtml] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cashfreePaymentUrl, setCashfreePaymentUrl] = useState<string | null>(null);

  // const shouldFetch = useMemo(() => {
  //   return !!token && !authLoading;
  // }, [token, authLoading]);

  // const { data:selectedGateways, loading:loadingSelectedGateways, error:selectedGatewaysError } = useGetRequest<GatewayResponse[]>("payment-gateway-config/payment-config",
  //   {},
  //   shouldFetch
  // )

  // const executeScripts = useCallback((html:string) => {
  //   const scriptElements = getScripts(html);
  //   scriptElements.forEach(script => {
  //     const scriptText = script.text || script.textContent || script.innerHTML || '';
  //     const newScript = document.createElement('script');
  //     newScript.text = scriptText;
  //     document.body.appendChild(newScript);
  //   });
  // }, []);

  // const getScripts = (html:string) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(html, 'text/html');
  //   return Array.from(doc.querySelectorAll('script'));
  // };

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

  // useEffect hook to handle cashfree payment completion
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://sandbox.cashfree.com') {
        // Handle the payment result here
        console.log('Payment result:', event.data);
        setIsModalOpen(false);
        setCashfreePaymentUrl(null);
        // You may want to update the order status or redirect the user
      }
    };
  
    window.addEventListener('message', handleMessage);
  
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  

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

      // if(!selectedGateway?.includes("payumoney")){
      //   response = await res.json();
      // }
      // else{
      //   response = await res.text();
      // }

      if(!res.ok){
        throw new Error(response.message);
      }

      console.log(response);

      // Razorpay paymnet implementation
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
      // else if (selectedGateway === "payumoney") {
      //   const cleanHtml = DOMPurify.sanitize(response?.data);
      //   setHtmlContent(cleanHtml);
      //    // Extract and execute scripts separately after setting the HTML content
      //    setTimeout(() => {
      //     executeScripts(cleanHtml);
      //   }, 0);
      //   setIsModalOpen(true);
      // }
      else if (selectedGateway === "payumoney") {
        if (response) {
          const cleanHtml = DOMPurify.sanitize(response.data);
          setPaymentFormHtml(cleanHtml);
        } else {
          throw new Error("Invalid PayUMoney response");
        }
      } 
      else if (selectedGateway === "cashfree") {
        if (response.success && response.paymentUrl) {
          setCashfreePaymentUrl(response.paymentUrl);
          setIsModalOpen(true);
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

        {/* Modal for payUmoney payment processing */}
        {/* <Modal2 title='payUmoney payment' handleModalClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <div 
          className="payment-page-container w-full h-full" 
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        </Modal2> */}
        <Modal2 
          title={'Cashfree Payment'} 
          handleModalClose={() => {
            setIsModalOpen(false);
            setCashfreePaymentUrl(null);
          }} 
          isOpen={isModalOpen}
        >
          {cashfreePaymentUrl && <CashfreePaymentFrame paymentUrl={cashfreePaymentUrl} />}
        </Modal2>
        <PayUMoneyForm formHtml={paymentFormHtml} />


        {/* toast for displaying the error state */}
        {selectedGatewayError && <Toast message={selectedGatewayError} type = "error" />}

        {/* trying something new */}
        {/* {token && <PaymentPage token={token} orderID={orderData?.id}/>} */}
    </div>
  )
}

export default PaymentGateway


//cashfree Iframe component
const CashfreePaymentFrame = ({ paymentUrl }: { paymentUrl: string }) => {
  return (
    <iframe
      src={paymentUrl}
      width="100%"
      height="600px"
      allow="payment"
    />
  );
};

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