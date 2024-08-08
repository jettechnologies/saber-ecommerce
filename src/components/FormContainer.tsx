import Carrousel from "./Carrousel";
import heroImg from "@/assets/images/hero.png";
import headphoneImg from "@/assets/images/headsets.png";
import earpodImg from "@/assets/images/earpods.webp";
import { twMerge } from "tailwind-merge";

interface Props{
    children:React.ReactNode;
    className?:string;
}

const FormContainer:React.FC<Props> = ({children, className}) => {
  return (
    <div className="flex">
        <div className="hidden lg:block w-full lg:w-1/2 h-screen">
            <Carrousel
                content={[
                    <div className="grid place-items-center bg-yellow w-full min-h-full">
                        <img src={heroImg} alt="slider image" className="w-[80%] aspect-square object-contain"/>
                    </div>,
                    <div className="grid place-items-center bg-blue min-h-full">
                        <img src={headphoneImg} alt="slider image" className="w-[80%] aspect-square object-contain"/>
                    </div>,
                    <div className="grid place-items-center bg-black min-h-full">
                        <img src={earpodImg} alt="slider image" className="w-[80%] aspect-square object-contain"/>
                    </div>
                ]}
            />
          </div>
          <div className={twMerge("flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8", className)}>
            <div className="w-full px-8 md:px-16">
                {children}
            </div>
            
          </div>
        </div>
  )
}

export default FormContainer;