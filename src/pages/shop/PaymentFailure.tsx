import Image from '@/components/Image';
import { useNavigate } from "react-router-dom";
import failIcon from "@/assets/icons/failed.svg";
import Button from '@/components/Button';

const PaymentFailure = () => {

    const navigate = useNavigate();

  return (
    <div className="w-full h-screen grid place-items-center">
        <div className="w-full flex flex-col gap-y-6 items-center">
            <Image src={failIcon} alt = "fail icon" className="w-[250px] h-[200px] lg:w-[500px] lg:h-[400px]" />
            <p className="text-text-black font-normal text-size-500 md:text-size-600 first-letter:uppercase text-center">
                Something went wrong. Please try again.
            </p>
            <Button 
                size="medium" 
                className="w-[25rem] text-size-500 text-white" 
                handleClick={() => navigate('/payment-gateway')}
            >
                Back to payment
            </Button>
        </div>
    </div>
  )
}

export default PaymentFailure