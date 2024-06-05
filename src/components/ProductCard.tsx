import headphoneImg from "../assets/images/headsets.png";
import { StarIcon } from "../icons/svg";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface Props{
    tag?: string;
}

const ProductCard:React.FC<Props> = ({tag}) => {
  return (
    <div className="w-full h-full shadow-sm rounded-md">
        <div className="w-full h-full relative z-20">
            <div className="w-full flex justify-center items-center h-[75%] rounded-md bg-gray product-img">
                <div className="flex justify-between w-full pt-3 px-3 absolute top-0 left-0 z-20">
                        {tag && <div className="p-2 rounded-sm text-base uppercase font-semibold bg-white">
                            <p>{tag}</p>
                    </div>}
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm wishlist-icon cursor-pointer">
                        <Link to = "/auth/login">
                            <Heart size = {20}/>
                        </Link>
                    </div>
                </div>
                <img src={headphoneImg} alt="product image" className="w-[60%] aspect-square object-contain"/>
            </div>
            <div className="w-full h-[25%] pt-4 flex flex-col gap-y-2">
                <div className="w-fit flex gap-1">
                {
                    [1,2,3,4,5].map((index) => (
                        <StarIcon className="text-yellow" fill="yellow" key={index}/>
                    ))
                }
                </div>
                <p className="text-size-500 font-medium">Lorem ipsum dolor sit.</p>
                <p className="text-size-500 font-medium">$100</p>
            </div>
        </div>
    </div>
  )
}

export default ProductCard

