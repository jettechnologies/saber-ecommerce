import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { useUserProfile } from "@/context/userProfileContext";
import Spinner from "@/components/Spinner";
import { IndianRupee, CircleAlert } from "lucide-react";
import Modal2 from "@/components/Modal2";
import { useState } from "react";

const UserProfile = () => {

  const {isLoading, user, error } = useUserProfile();
  const [isDeleting, setIsDeleting] = useState(false);

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

  // const deleteProfile = useCallback(() =>{
  //   const url = "profile-mgt/delete-user-account";

  // }, []);

  return (
    <>
      <div className="w-full h-full px-8 pt-8 lg:px-16">
      <div className="flex justify-between py-3 border-b-2 border-gray">
        <h2 className="text-szie-500 lg:text-size-600 xl:text-3xl font-semibold capitalize">
          welcome, {user?.fullname}
        </h2>
          <Button 
            size="small" 
            handleClick={() => setIsDeleting(prevState => !prevState)}
            className="font-medium text-size-400 lg:text-size-500 capitalize text-white"
          >
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
              edit profile
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
      {/* modal 2 for success mesage or error message */}
    <Modal2 isOpen = {isDeleting} handleModalClose = {()=> setIsDeleting(prevState => !prevState)}>
    <div className="flex flex-col w-full ">
    <div className="flex items-center gap-3">
      {/* <MessageSquareWarning size = {35} color = "rgb(239 68 68)"/> */}
      <CircleAlert size = {35} color = "rgb(239 68 68)" />
      <p>
        Are you sure you want to delete this account
      </p>
    </div>
    <div className="mt-5 border-t border-[#f0f0f0] pt-3">
      <Button  
          size="medium"
          className="text-sm uppercase w-full"
        >
          Continue to profile
      </Button>
    </div>
    </div>
    </Modal2>
    </>
  )
}

export default UserProfile;