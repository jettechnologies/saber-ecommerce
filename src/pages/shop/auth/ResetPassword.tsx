import { useNavigate, useLocation } from "react-router-dom";
import FormContainer from "@/components/FormContainer";
import { CircleUserRoundIcon } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import useApiRequest from "@/hooks/useApiRequest";
// import Notification from "@/components/Notification";
import PasswordInput from "@/components/Password";
import { validateObjectWithStr } from  "@/utils/inputValidation";
import Toast from "@/components/Toast";
import Button from "@/components/Button";

interface ErrorType{
  status: boolean;
  msg: string;
}

const ResetPassword = () => {

  const location = useLocation();
    const navigate = useNavigate();
    const response = location.state?.response ?? "";

    const { response:success, loading, error:fetchError, makeRequest } = useApiRequest({
      method: "PATCH",
    })

    const [reset, setReset] = useState({
        password: {
          str: "",
          error: false,
        },
        confirmPassword: {
          str: "",
          error: false,
        },
    });

    const [error, setError] = useState<ErrorType>({
      status: false,
      msg : ""
    });

    const isFilled = useMemo(() => {
      try {
        return validateObjectWithStr(reset);
      } catch (err) {
        return false;
      }
    }, [reset]);

    const handleFormSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/i;
        const { password, confirmPassword } = reset;

        if(password.str === "" || confirmPassword.str === "" ){
          setError({status: true, msg: "All fields are required!"});
          return
        }

        if(!passwordRegex.test(password.str)){
          setReset({ ...reset, password: { ...password, error: true } });
          return;
        }
        else if(!passwordRegex.test(confirmPassword.str)){
          setReset({ ...reset, confirmPassword: { ...confirmPassword, error: true } });
          return;
        }
        else if(confirmPassword.str !== password.str){
          setError({status: true, msg: "Passwords do not match!"});
          return
      }

      const url = "user-auth/reset-password";
        const data = {
            password: password.str,
            confirmPassword: confirmPassword.str
        }

      // getting the users id from localstorage
      const localStorage = window.localStorage.getItem("user_id");
      if(!localStorage) return;

      const userId = JSON.parse(localStorage);

      const headers:HeadersInit = {
        "Accept": "application/json",
        id: userId
      }

      try{
        await makeRequest(data, url, headers);
      }
      catch(err){
        console.log((err as Error).message)
      }

    }

    useEffect(() =>{
      if(success && success!==null){
        navigate("/auth/login", { replace: true, state: {response:success} });
      }
    }, [success, navigate])

    // useEffect hook to set error state from api request
    useEffect(() =>{
      if(fetchError){
        setError({
          msg: fetchError,
          status: true
        })
      }
    }, [fetchError]);

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
        <FormContainer>
            {/* {(response && response !== "") && <Notification className="text-size-500 font-medium text-white first-letter:capitalize" message={response.message} type="success"/>} */}
            <div className="mx-auto mb-2 w-fit h-fit p-3 rounded-full flex items-center justify-center">
              <CircleUserRoundIcon size = {80} color="#121212"/>
            </div>
            <form className="relative bg-white rounded-md shadow-2xl p-5 pt-10" onSubmit={handleFormSubmit}>
              
                <h2 className="text-gray-800 font-bold text-sm md:text-xl mb-3 uppercase">Create a new password</h2>
                {/* <p className="text-md font-normal text-blue mb-8 text-center">Enter email u want the mail link to be sent to</p> */}
                {/* {error.status && <Notification message = {error.msg} type = "danger" className="text-white mb-4"/>} */}
                <PasswordInput name = "password" placeholder = "Password" password = {reset.password} setPassword={(newValue) => setReset({...reset, password: newValue})}/>
                <PasswordInput name = "confirmPassword" placeholder = "Confirm Password" password={reset.confirmPassword} setPassword={(newValue) => setReset({...reset, confirmPassword: newValue})}/>
                <div className="w-full">
                    <Button disabled = {loading || !isFilled} btnType = "submit" className="px-10 py-4 w-full rounded-md font-roboto text-size-500 uppercase font-semibold bg-black text-white ">
                        {loading ? "Loading..." : "verify email"}
                    </Button>
                </div>
            </form>
        </FormContainer>

        {error.status && <Toast message={error.msg} type="error" />}
        <Toast message={response.message} type="success" />
    </>
  )
}

export default ResetPassword