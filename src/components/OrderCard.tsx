import {Order} from "@/types";

interface Props{
    order:Order;
}

const OrderCard = ({
    order,
}: Props) => {

    console.log(order)
  return (
    
    <div  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex w-full justify-between">
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {order.orderID}
            </h3>
            <p className="text-text-black text-size-500 font-medium">
                {order.trackingID}
            </p>
        </div>
       {order?.items.length > 0 && order?.items.map(item => (
        <div key = {item.id} className="w-full min-h-48 p-10 flex gap-5 flex-wrap">
            {/* <p className="text-text-black text-size-500 font-medium">
                name:{item?.quantity}
            </p> */}
            <p className="text-text-black text-size-500 font-medium">
                quantity: {item?.quantity}
            </p>
            <p className="text-text-black text-size-500 font-medium">
                cost: {item?.price}
            </p>
        </div>
       ))}
        <p className="text-text-black text-size-500 font-medium">
            status: {order?.status}
        </p>
    </div>

  )
}

export default OrderCard

{/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisi  </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}