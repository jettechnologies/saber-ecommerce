import { useCallback, useEffect, useState } from "react";
import Button from "@/components/Button";
import { BadgeCheck } from "lucide-react";
import Notification from "@/components/Notification";
import { useAuth } from "@/context/authContext";
import Modal2 from "@/components/Modal2";
import { useNavigate } from "react-router-dom";
import PasswordInput from "@/components/Password";

const ResetUserPassword = () => {

  const navigate = useNavigate();
  const [reset, setReset] = useState({
    oldPassword:{
      str: "",
      error: false,
    },
    newPassword:{
      str: "",
      error: false,
    },
    confirmPassword:{
      str: "",
      error: false,
    }
  });
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{msg:string; status:boolean}>({
    msg: "",
    status: false,
});
const [modalOpen, setModalOpen] = useState(false);
const { token } = useAuth();

console.log(reset)

  // const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
  //   const target = e.target as HTMLInputElement | HTMLTextAreaElement;
  //   const { name, value } = target;

  //   setReset({ ...reset, [name]: {str: value, error: false} })
  // }

  const resetPassword = useCallback(async(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = reset;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/i;

    if(newPassword.str === "" || confirmPassword.str === ""){
        setError({ msg: "All field are required", status: true });
        return;
    }

    if (!passwordRegex.test(newPassword.str)) {
      setReset({ ...reset, newPassword: { ...newPassword, error: true } });
      return;
    } else if (!passwordRegex.test(confirmPassword.str)) {
        setReset({ ...reset, confirmPassword: { ...confirmPassword, error: true } });
        return;
    }
    else if(newPassword.str !== confirmPassword.str){
      setError({ msg: "Confirm password and password should match", status: true });
      return;
    }

    const data = {
      oldPassword: oldPassword.str,
      password: newPassword.str,
      confirmPassword: confirmPassword.str,
    }

    console.log(data)
    const url = "profile-mgt/change-user-password";

    try{
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}${url}`,{
        method: "PATCH",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        if (res.status === 404) {
          const errorResponse = await res.json();
          console.error("Error 404:", errorResponse);
          throw new Error(`${errorResponse.message || "Resource not found"}`);
        }
        else if(res.status === 400){
          const errorResponse = await res.json();
          console.error("Error 404:", errorResponse);
          throw new Error(`${errorResponse.message || "Resource not found"}`);
        }
        else if(res.status === 406){
          const errorResponse = await res.json();
          console.error("Error 404:", errorResponse);
          throw new Error(`${errorResponse.message || "Resource not found"}`);
        }
        console.log(res.body);
        throw new Error("Request not sent, status code: " + res.status);
      }
      
      const response = await res.json();
      setModalOpen(true);
      console.log(response);
    }
    catch(err){
      console.log((err as Error).message);
      setError({msg:(err as Error).message, status:true});
    }
    finally{
      setLoading(false);
    }

  }, [token, reset])

  // useEffect to reove the error message correctly
  useEffect(() =>{
    let errorRemoval: ReturnType<typeof setTimeout>;

    if(error){
       errorRemoval =  setTimeout(() =>{
            setError({status: false, msg: ""});
        }, 2000)
    }

    return() => clearTimeout(errorRemoval)
}, [error]);

  return (
    <>
    <div className="w-full h-screen px-8 pt-8 bg-gray">
      <section className="w-full">
        <div className="max-w-2xl px-8 py-8 mx-auto lg:py-10 rounded-md shadow-md bg-white">
            <h2 className="text-xl font-bold text-text-black dark:text-white">Reset Password</h2>
            <hr className="my-5 border-[#c0c0c0]" />
            <form onSubmit={resetPassword}>
              {error.status && <Notification message = {error.msg} type = "danger" className="text-white mb-4"/>}
                <div className="flex flex-col gap-4 mb-8">
                  {/* <div className="sm:col-span-2">
                        <label htmlFor="old_password" className="block mb-2 text-sm font-medium text-text-black dark:text-white">Old Password</label>
                        <div className="flex flex-col gap-5">
                          <div className="flex border-2 border-[#c0c0c0] focus-within:border-blue focus:border-blue rounded-md items-center">
                            <input 
                              type="password" 
                              name="oldPassword" 
                              id="old_password" 
                              onChange={handleInputChange}
                              className="border-none focus-within:outline-none focus: outline-none text-text-black text-sm p-2.5 flex-1" 
                              value={reset.oldPassword.str}
                              placeholder="Enter your new password" 
                            />
                            {reset.oldPassword.error && <Info size={20} color=" rgb(239 68 68)" />}
                          </div>
                          {reset.oldPassword.error && <p className="text-red-500 text-size-400 font-normal m-2">password contain aphlabets, digits and special characters and be within 8 to 15 characters</p>}
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-text-black dark:text-white">New Password</label>
                        <div className="flex flex-col gap-5">
                          <div className="flex border-2 border-[#c0c0c0] focus-within:border-blue focus:border-blue rounded-md items-center">
                            <input 
                              type="password" 
                              name="password" 
                              id="password" 
                              onChange={handleInputChange}
                              className="border-none focus-within:outline-none focus: outline-none text-text-black text-sm p-2.5 flex-1" 
                              value={reset.password.str}
                              placeholder="Enter your new password" 
                            />
                            {reset.password.error && <Info size={20} color=" rgb(239 68 68)" />}
                          </div>
                          {reset.password.error && <p className="text-red-500 text-size-400 font-normal m-2">password contain aphlabets, digits and special characters and be within 8 to 15 characters</p>}
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-text-black dark:text-white">Confirm Password</label>
                        <div className="flex flex-col gap-5">
                          <div className="flex border-2 border-[#c0c0c0] focus-within:border-blue focus:border-blue rounded-md items-center">
                            <input 
                              type="password" 
                              name="confirmPassword" 
                              id="confirm_password" 
                              onChange={handleInputChange}
                              className="border-none focus-within:outline-none focus:outline-none text-text-black text-sm p-2.5 flex-1" 
                              value={reset.confirmPassword.str}
                              placeholder="Enter your new password" 
                            />
                            {reset.confirmPassword.error && <Info size={20} color=" rgb(239 68 68)" />}
                          </div>
                          {reset.confirmPassword.error && <p className="text-red-500 text-size-400 font-normal m-2">confirm Password contain aphlabets, digits and special characters and be within 8 to 15 characters</p>}
                        </div>
                    </div> */}
                    <PasswordInput name = "oldPassword" placeholder = "Old Password" password = {reset.oldPassword} setPassword={(newValue) => setReset({...reset, oldPassword: newValue})}/>
                    <PasswordInput name = "newPassword" placeholder = "New Password" password = {reset.newPassword} setPassword={(newValue) => setReset({...reset, newPassword: newValue})}/>
                    <PasswordInput name = "confirmPassword" placeholder = "Confirm Password" password={reset.confirmPassword} setPassword={(newValue) => setReset({...reset, confirmPassword: newValue})}/>
                  </div>
                    <div className="w-full">
                      <Button size="medium" className="text-size-500 font-medium uppercase text-white w-full">
                          {loading ? "Loading..." :  "Reset Password"}
                      </Button>
                    </div>
                </form>
              </div>
            </section>
          </div>
          {/* modal 2 for success mesage or error message */}
    <Modal2 isOpen = {modalOpen} handleModalClose = {()=> setModalOpen(false)}>
        <div className="flex flex-col w-full ">
          <div className="flex items-center gap-3">
            {/* <MessageSquareWarning size = {35} color = "rgb(239 68 68)"/> */}
            <BadgeCheck size = {35} color = "rgb(34 197 94 )"/>
            <p>
              Password updated successfully
            </p>
          </div>
          <div className="mt-5 border-t border-[#f0f0f0] pt-3">
            <Button  
              size="medium"
              handleClick={() => {
                navigate("/user", {replace: true});
              }}
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

export default ResetUserPassword