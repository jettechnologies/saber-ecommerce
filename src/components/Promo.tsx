import Button from "./Button";
import promoImage from "../assets/images/promotion-card.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface PromoCode {
  id: number;
  OneTime_discountCode: string;
  createdAT: string;
  DiscountDuration_days: number;
  DiscountDuration_weeks: number;
  percentageOff: string;
  expires_in: string;
  updatedAT: string;
  isExpired: boolean;
}

interface Prop{
  formattedTime: string;
  currentCoupon: PromoCode;
}

const Promo = ({formattedTime, currentCoupon}: Prop) => {

  const [timeArray, setTimeArray] = useState<string[]>([]);

  const splitFormattedTime = (formattedTime: string): string[] => {
    const regex = /(\d+ \w+)/g;
    return formattedTime.match(regex) || [];
  };

  useEffect(() =>{
    if(formattedTime){
      setTimeArray(splitFormattedTime(formattedTime));
    }
  }, [formattedTime]);

  // console.log(timeArray[0].split("")[0]);

  return (
    <div className="w-full h-full md:h-[25rem]">
        <div className="flex flex-col md:flex-row h-full">
            <div className="flex-1 bg-[#A8A8A8]">
                <img src={promoImage} alt="promo image" className="w-full h-full object-cover"/>
            </div>
            <div className="flex-1 bg-[#ffdd99]">
                <div className="w-full max-w-[720px] space-y-6 p-8">
                <div className="space-y-4">
              <p className="text-blue text-base font-semibold">
                Promotion
              </p>
              <h2 className="text-4xl font-bold text-[#121212]">
                Hurry up! apply <span className="text-size-700 text-blue">{currentCoupon.OneTime_discountCode}</span> to get {currentCoupon.percentageOff}% OFF
              </h2>
            </div>
            <div className="space-y-3 text-[#121212]">
              <p className="text-base font-medium">Offer expires in:</p>
              <div className="flex gap-4">
                {timeArray && timeArray.length > 0 && timeArray.map(time =>(
                  <div className="w-fit p-2 rounded-md bg-white">
                    <p className="text-size-500 text-text-black font-medium">
                      {time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Link to = "/store">
              <Button type = "black" size = "medium" className="mt-4 text-base">
                  Shop now
              </Button>
            </Link>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Promo