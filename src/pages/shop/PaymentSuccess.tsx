import { useNavigate } from "react-router-dom";
import Image from '@/components/Image';
import successIcon from "@/assets/icons/success.svg";
import Button from '@/components/Button';
import { CartIcon } from "@/icons/svg";

const PaymentSuccess = () => {

    const navigate = useNavigate();

  return (
    <>
        <div className="w-full h-screen grid place-items-center">
            <div className="w-full flex flex-col gap-y-6 items-center">
                <Image src={successIcon} alt = "success icon" className="w-[250px] h-[200px] lg:w-[500px] lg:h-[400px]" />
                <p className="text-text-black font-normal text-size-500 md:text-size-600 first-letter:uppercase text-center">
                    Your order has been successfully placed
                </p>
                <Button 
                    size="medium" 
                    className="w-[18rem] md:w-[25rem] text-size-500 text-white" 
                    handleClick={() => navigate("/product-feedback")}
                >
                    Give a feedback
                </Button>
                <Button 
                    type='white'
                    size="medium" 
                    className="w-[18rem] md:w-[25rem] text-size-500 text-text-black flex items-center justify-center gap-4" 
                    handleClick={() => navigate('/store')}
                >
                    <CartIcon className="w-5 h-5 text-white"/>
                    <p>Continue shopping</p>
                </Button>
            </div>
        </div>
    </>
  )
}

export default PaymentSuccess