import { CircleX } from "lucide-react"

interface Props{
    message: string;
    isCloseIcon?: boolean;
    type: "danger" | "warning" | "success";
}

const Notification:React.FC<Props> = ({
    message,
    isCloseIcon = false,
    type
}) => {

    const notificationType = {
        danger: "bg-red-500",
        warning: "bg-yellow",
        success: "bg-green-500",
    }

  return (
    <div className={`py-2 px-4 ${notificationType[type]} text-white mb-4 flex items-center justify-between`}>
        <p className="text-size-400 font-normal">{message}</p>
        {isCloseIcon && <div className="border-2 border-black p-1 cursor-pointer"><CircleX size = {20} /></div>}
    </div>
  )
}

export default Notification