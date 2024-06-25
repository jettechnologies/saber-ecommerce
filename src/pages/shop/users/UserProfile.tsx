import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { useUserProfile } from "@/context/userProfileContext";
import Spinner from "@/components/Spinner";
import { IndianRupee } from "lucide-react";

const UserProfile = () => {

  const {isLoading, user, error } = useUserProfile();

  if(isLoading){
    return <div className="w-full h-ful">
      <Spinner />
    </div>
  }

  if(error){
    return <div className="w-full h-full">
      <h2 className="text-size-600 text-text-black font-bold uppercase text-center">something when wrong while fetching the user....</h2>
    </div>
  }

  return (
    <div className="border-2 border-red-500 w-full h-full px-8 pt-8 lg:px-16">
      <div className="flex justify-between py-3 border-b-2 border-gray">
        <h2 className="text-szie-500 lg:text-size-600 xl:text-3xl font-semibold capitalize">
          welcome, tom john
        </h2>
          <Button size="small" className="font-medium text-size-400 lg:text-size-500 capitalize text-white">
            delete account
          </Button>
      </div>
      <div className="mt-8 rounded-b-md shadow-sm">
        {/* card header */}
        <div className="mt-6 py-5 px-4 bg-gray flex justify-between">
          <p className="text-size-500 lg:text-[17px] font-medium capitalize text-text-black">personal information</p>
          <div className="flex gap-x-8">
            <Link to = "/user/reset-password" className = "text-size-500 lg:text-[17px] font-medium capitalize text-text-black">
              change password
            </Link>
            <Link to = "/user/edit-account" className = "text-size-500 lg:text-[17px] font-medium capitalize text-text-black">
              edit
            </Link>
          </div>
        </div>
        {/* card body */}
        <div className="py-6 px-10 bg-white">
            {user && <ul className="flex flex-col gap-y-4">
              <li className="text-size-500 font-normal capitalize">
                name: {user.fullname}
              </li>
              <li className="text-size-500 font-normal capitalize">
                email: {user.email}
              </li>
              <li className="text-size-500 font-normal capitalize">
                phone number: {user.mobile}
              </li>
              <li className="text-size-500 font-normal capitalize">
                birthday: {user?.DOB && user?.DOB}
              </li>
              <li className="text-size-500 font-normal capitalize">
                nationality: {user?.Nationality && user?.Nationality}
              </li>
              <li className="text-size-500 font-normal capitalize">
                home address: {user?.home_address && user?.home_address}
              </li>
              <li className="text-size-500 font-normal capitalize flex gap-3">
                amount spent: <span className="flex gap-x-2"><IndianRupee size={20}/> {user?.totalRevenue && user?.totalRevenue}</span>
              </li>
            </ul>}
        </div>
      </div>
    </div>
  )
}

export default UserProfile