import Button from "@/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useUserProfile } from "@/context/userProfileContext";
import Spinner from "@/components/Spinner";
import { IndianRupee, CircleAlert, LockKeyhole, Info } from "lucide-react";
import Modal2 from "@/components/Modal2";
import { useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/context/authContext";
import Notification from "@/components/Notification";
// import useApiRequest from "@/hooks/useApiRequest";

const UserProfile = () => {

  const {isLoading, user, error } = useUserProfile();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resError, setResError] = useState("");
  const [password, setPassword] = useState({
    str: "",
    error: {msg:"", status: false},
  });

  console.log(user)

  const deleteProfile = useCallback(async() =>{
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/i;

    if(!passwordRegex.test(password.str)){
      setPassword({ ...password, error: {
        msg: "Password contain aphlabets, digits and special characters and be within 8 to 15 characters",
        status: true,
      } });
      return;
  }

    // if(password.str !== user?.password){
    //   console.log(user?.password, password.str)
    //   setPassword({
    //     ...password,
    //     error: {
    //       msg: "Re-enter your current password",
    //       status: true
    //     }
    //   })

    //   return;
    // }

    const url = "profile-mgt/delete-user-account";
    const data = {
      password: password.str,
    }
    const headers: HeadersInit = {
      'Content-type': 'application/json',
      "Accept": "application/json",
      'Authorization': `Bearer ${token}`,
    }

    try{
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}${url}`, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(data)
      });

      if(!res.ok){
        throw new Error(`Request not made ${res.status}`);
      }
      const response = await res.json();
      console.log(response);

      Cookies.remove("auth_token")
      navigate("/", {replace: true});
    }
    catch(err){
      console.log((err as Error).message);
      setResError("Password doesnt match the want saved in our application");
    }
    finally{
      setLoading(false)
    }

  console.log("deleting working")
  }, [navigate, token, password]);

  // to remove the error after 2s
  useEffect(() =>{
    let errorRemoval: ReturnType<typeof setTimeout>;

    if(resError){
       errorRemoval =  setTimeout(() =>{
            setResError("");
        }, 2000)
    }

    return() => clearTimeout(errorRemoval)
  }, [resError]);

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
    <>
    <div className="w-full h-full px-8 pt-8 lg:px-16">
      <div className="flex justify-between py-3 border-b-2 border-gray">
        <h2 className="text-szie-500 lg:text-size-600 xl:text-3xl font-semibold capitalize">
          welcome, {user?.fullname}
        </h2>
          {/* <Button 
            size="small" 
            handleClick={() => setIsDeleting(prevState => !prevState)}
            className="font-medium text-size-400 lg:text-size-500 capitalize text-white"
          >
            delete account
          </Button> */}
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
    <Modal2  isOpen = {isDeleting} handleModalClose = {()=> {
      setPassword({
        str: "",
        error:{
          msg:"",
          status:false
        }
      })

      setIsDeleting(prevState => !prevState)
    }}>
      <div className="flex flex-col w-full ">
       {resError !== "" && <Notification message = {resError} type = "danger" className="text-white mb-4"/>}
      <div className="flex items-center gap-4 flex-wrap">
        {/* <MessageSquareWarning size = {35} color = "rgb(239 68 68)"/> */}
        <CircleAlert size = {35} color = "rgb(239 68 68)" />
        <p>
          Are you sure you want to delete this account
        </p>
        <div className="w-full">
          <p className="text-xs text-[#c0c0c0] mb-2">Retry enter your password</p>
          <div className={`flex items-center ${password.error.status ? "border-2 border-red-500": "border-2 border-[#c0c0c0] focus-within:border-blue"} mb-3 py-3 px-3 rounded-md`}>
            <LockKeyhole size = {20}/>
              <input 
                className="pl-2 w-full outline-none border-none" 
                type="password" 
                name="password" 
                id="password" 
                value={password.str}
                placeholder="Retry enter your password" 
                onChange={(event) => setPassword({...password, str: event.target.value.trim()})}
              />
              {password.error.status && <Info size={20} color=" rgb(239 68 68)" />}
            </div>
              {password.error.status && <p className="text-red-500 text-size-400 font-normal m-2">{password.error.msg}</p>}
          </div>
        
      </div>
      <div className="flex gap-5 mt-5 border-t border-[#f0f0f0] pt-3">
        <Button  
            size="medium"
            className="text-sm uppercase w-full"
            type = "white"
            handleClick = {()=> {
              setPassword({
                str: "",
                error:{
                  msg:"",
                  status:false
                }
              })

              setIsDeleting(prevState => !prevState)
            }}
          >
            Cancel
        </Button>
        <Button  
            size="medium"
            className="text-sm uppercase w-full"
            handleClick = {() => deleteProfile()}
          >
            {loading ? "Loading..." : "Delete account"}
        </Button>
      </div>
      </div>
    </Modal2>
    </>
  )
}

export default UserProfile;