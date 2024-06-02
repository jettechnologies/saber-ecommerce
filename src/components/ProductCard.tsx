import headphoneImg from "../assets/images/headsets.png";
import { StarIcon } from "../icons/svg";

interface Props{
    tag: string;
}

const ProductCard:React.FC<Props> = ({tag}) => {
  return (
    <div className="w-full h-full flex flex-col relative">
        <div className="w-full flex justify-center items-center h-[75%] rounded-md bg-gray">
            <div className="py-2 px-3 rounded-sm text-base uppercase absolute top-3 left-3 font-semibold bg-white">
                <p>{tag}</p>
            </div>
            <img src={headphoneImg} alt="product image" className="w-[80%] aspect-square object-cover"/>
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
  )
}

export default ProductCard