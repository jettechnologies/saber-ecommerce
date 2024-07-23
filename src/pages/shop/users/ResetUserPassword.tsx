import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import { BadgeCheck, LockKeyhole, Eye, Info, EyeOff } from "lucide-react";
// import Notification from "@/components/Notification";
import { useAuth } from "@/context/authContext";
import Modal2 from "@/components/Modal2";
import { useNavigate } from "react-router-dom";
import PasswordInput from "@/components/Password";
import Toast from "@/components/Toast";
import { validateObjectWithStr } from "@/utils/inputValidation";

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
const [showPassword, setShowPassword] = useState(false)

  const isFilled = useMemo(() => {
    try {
      return validateObjectWithStr(reset);
    } catch (err) {
      return false;
    }
  }, [reset]);


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
        }, 3000)
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
              {/* {error.status && <Notification message = {error.msg} type = "danger" className="text-white mb-4"/>} */}
                <div className="flex flex-col gap-4 mb-8">
                    {/* <PasswordInput name = "oldPassword" placeholder = "Old Password" password = {reset.oldPassword} setPassword={(newValue) => setReset({...reset, oldPassword: newValue})}/> */}
                    <div className={`flex items-center ${reset.oldPassword.error ? "border-2 border-red-500": "border-2 border-gray focus-within:border-blue"} mb-3 py-3 px-3 rounded-md`}>
                        <LockKeyhole size = {20}/>
                        <input 
                            className="pl-2 w-full outline-none border-none" 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            id="password" 
                            value = {reset.oldPassword.str}
                            placeholder="Password" 
                            onChange={(e) => setReset({...reset, oldPassword: {
                              str: e.target.value,
                              error: false
                            }})}
                        />
                        <button type = "button" onClick={() => setShowPassword(!showPassword)} className="w-4 h-4 rounded-full flex justify-center items-center">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        {reset.oldPassword.error && <Info size={20} color=" rgb(239 68 68)" />}
                    </div>
                    <PasswordInput name = "newPassword" placeholder = "New Password" password = {reset.newPassword} setPassword={(newValue) => setReset({...reset, newPassword: newValue})}/>
                    <PasswordInput name = "confirmPassword" placeholder = "Confirm Password" password={reset.confirmPassword} setPassword={(newValue) => setReset({...reset, confirmPassword: newValue})}/>
                  </div>
                    <div className="w-full">
                      <Button btnType="submit" disabled = {!isFilled} size="medium" className={`text-size-500 font-medium uppercase text-white w-full`}>
                          {loading ? "Loading..." :  "Reset Password"}
                      </Button>
                    </div>
                </form>
              </div>
            </section>
          </div>
          {/* modal 2 for success mesage or error message */}
          <Modal2 title = "Reset Password" isOpen = {modalOpen} handleModalClose = {()=> setModalOpen(false)}>
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
                  btnType="button" 
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

        {error.status && <Toast message={error.msg} type="error" />}
    </>        
  )
}

export default ResetUserPassword