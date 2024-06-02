import { twMerge } from "tailwind-merge";
import modalCloseIcon from "../assets/icons/menuClose.svg";
import Logo from "./Logo";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position: string;
  className?:string
}

export default function Modal({
  open,
  onClose,
  children,
  position,
  className
}: ModalProps) {
  const overlayOpacity = open ? "opacity-50" : "opacity-0 pointer-events-none";
  const modalPosition = (open:boolean, position:string) =>{
    let positionRes = ""
    
    if(open && position === "left"){
      positionRes = "left-0";
    }
    else if(open && position === "right")
    {
      positionRes = "right-0";
    }

    return positionRes;
  }


  return (
    <div className="z-40 absolute">
      {/* Overlay */}
      <div
        className={`${overlayOpacity} fixed inset-0 bg-black`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={twMerge(`transition-all duration-200 inset-0 fixed ${modalPosition} bg-white max-w-screen-sm`, className)}
      >
        <div className="grid grid-cols-[16%_68%_16%] py-7 px-2 justify-center place-items-center border-b-[1px]">
          <div className="w-full" />
          <div onClick={onClose}>
            <Logo />
          </div>
          <button onClick={onClose}>
            <img src={modalCloseIcon} alt="close popup" />
          </button>
        </div>
        <div className="p-4" >{children}</div>
      </div>
    </div>
  );
}
