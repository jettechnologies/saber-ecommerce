import Button from "./Button";
import promoImage from "../assets/images/promotion-card.png";
import { Link } from "react-router-dom";

const Promo = () => {
  return (
    <div className="w-full h-full">
        <div className="flex flex-col md:flex-row">
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
                Hurry up! 40% OFF
              </h2>
              <p className="text-base font-medium text-[#121212]">Thousands of high tech are waiting for you</p>
            </div>
            <div className="space-y-3 text-[#121212]">
              <p className="text-base font-medium">Offer expires in:</p>
              <div className="flex gap-4">
                <div className="w-fit">
                  <div className="flex h-[60px] w-[60px] items-center justify-center bg-white">
                    <p className="text-3xl font-[500]">
                      02
                    </p>
                  </div>
                  <p className = "text-xs font-medium text-center">
                    Days
                  </p>
                </div>
                <div className="w-fit">
                  <div className="flex h-[60px] w-[60px] items-center justify-center bg-white">
                    <p className="text-3xl font-[500]">
                      12
                    </p>
                  </div>
                  <p className = "text-xs font-medium text-center">
                    Hours
                  </p>
                </div>
                <div className="w-fit">
                  <div className="flex h-[60px] w-[60px] items-center justify-center bg-white">
                    <p className="text-3xl font-[500]">
                      45
                    </p>
                  </div>
                  <p className = "text-xs font-medium text-center">
                    Minutes
                  </p>
                </div>
                <div className="w-fit">
                  <div className="flex h-[60px] w-[60px] items-center justify-center bg-white">
                    <p className="text-3xl font-[500]">
                      05
                    </p>
                  </div>
                  <p className = "text-xs font-medium text-center">
                    Seconds
                  </p>
                </div>
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