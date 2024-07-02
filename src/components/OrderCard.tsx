import { Order } from "@/types";
import { IndianRupee } from "lucide-react";
// import CopyToClipboard from "@/components/CopyToClipBoard"

interface Props {
    order: Order
}

const OrderCard = ({
    order
}:Props) => {

    console.log(order)

  return (
    <div className="w-full p-4 bg-gray rounded-md shadow-md">
    <div className="flex items-center justify-between mb-4 flex-wrap">
        <div className="w-fit">
            <h5 className="text-text-black font-bold text-md lg:text-xl">Order Id</h5>
            <p className="text-sm font-medium text-blue">
                {order.orderID}
            </p>
        </div>
        <div className="w-fit">
            <h5 className="text-text-black font-bold text-md lg:text-xl">Tracking Id</h5>
            <p className="text-sm font-medium text-blue">
                {order.trackingID}
            </p>
        </div>
   </div>
   <div className="w-full flex justify-between">
    <div>
        <h5 className="text-text-black font-bold text-md lg:text-xl">Total amount</h5>
        <div className="flex gap-2 mt-2">
            <IndianRupee size = {20}/>
            <p className = "text-text-black text-md font-normal">{order.total}</p>
        </div>
    </div>
    <div>
        <h5 className="text-text-black font-bold text-md lg:text-xl space-y-5">Status</h5>
        {/* <div className="flex gap-2">
            <IndianRupee size = {20}/>
            
        </div> */}
        <p 
            className = {`mt-2 capitalize ${order.status === "processing" ? "text-yellow" : (order.status === "shipped" || order.status ==="delivered") ? "text-green-500" : "text-text-black"} text-md font-normal`}
        >
            {order.status}
        </p>
    </div>
   </div>
   {/* <hr className="my-2 bg-gray" /> */}
   <div className="flow-root mt-6">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {
                order && order.items.length > 0 && order.items.map(item => (
                <li className="py-3 sm:py-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="w-10 h-10 rounded-md" src={item?.product?.productImage} alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                            <p className="text-md font-medium text-gray-900 truncate dark:text-white first-letter:uppercase">
                               {item?.product?.name}
                            </p>
                            {/* <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {item?.product?.cat}
                            </p> */}
                        </div>
                        <div className="flex gap-2 mt-2">
                            <IndianRupee size = {20}/>
                            <p className = "text-text-black text-md font-normal">{item?.product?.price}</p>
                        </div>
                    </div>
                </li>
                ))
            }
        </ul>
   </div>
</div>

  )
}

export default OrderCard