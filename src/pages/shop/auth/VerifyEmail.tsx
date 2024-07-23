import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRoundIcon } from "lucide-react";
import useApiRequest from "@/hooks/useApiRequest";
import FormContainer from "@/components/FormContainer";
import { Mail, Info } from "lucide-react";
import { validateObject } from "@/utils/inputValidation";
import Button from "@/components/Button";


interface Email{
    str: string;
    error: boolean;
}

const VerifyEmail = () => {

    const navigate = useNavigate();
    const { response:verifyEmailResponse,loading , error:fetchError, makeRequest } = useApiRequest({
        method: "POST" 
    });

    console.log(fetchError);

    const [email, setEmail] = useState<Email>({
        str: "",
        error: false,
    });

    // const { response, error, loading, makeRequest } = useApiRequest({
    //     method: "POST",
    // });

    const isFilled = useMemo(() =>{
        try {
            return validateObject(email);
          } catch (err) {
            return false;
          }
    },[email]);

    console.log(isFilled)

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        const value = target.value;

        setEmail({str: value.toLocaleLowerCase(), error: false});
    }

    const handleFormSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email.str) || email.str === ""){
            setEmail({...email, error: true } );
            return;
        }
        const data = {
            email: email.str,
        }

        const headers: HeadersInit = {
            "Accept": "application/json",
        };
        const url = "user-auth/send-password-reset-token";

        try{
            await makeRequest(data, url, headers);
        }
        catch(e){
            console.log((e as Error).message)
        }
    }

    useEffect(() =>{
        if(verifyEmailResponse && verifyEmailResponse!== null){
            navigate("/reset-password/otp", { replace: true, state: { email: email.str, link: "/reset-password" } });
            console.log(verifyEmailResponse)
        }
    }, [verifyEmailResponse, navigate, email.str]);

  return (
    <>
        <FormContainer>
            <div className="mx-auto mb-2 w-fit h-fit p-3 rounded-full flex items-center justify-center">
              <CircleUserRoundIcon size = {80} color="#121212"/>
            </div>
            <form className="relative bg-white rounded-md shadow-2xl p-5 pt-10" onSubmit={handleFormSubmit}>
              
                {/* <h1 className="text-gray-800 font-bold text-2xl md:text-3xl mb-3 uppercase">Hello Again!</h1> */}
                <p className="text-md font-normal text-blue mb-8 text-center">Enter registered email</p>
                {/* {error.status && <Notification message = {error.msg} type = "danger" className="text-white mb-4"/>} */}
                <div>
                    <div className={`flex items-center ${email.error ? "border-2 border-red-500": "border-2 border-gray focus-within:border-blue"} mb-3 py-3 px-3 rounded-md`}>
                        <Mail size = {20}/>
                        <input 
                            className="pl-2 w-full outline-none border-none" 
                            type="text" 
                            name="email" 
                            id="email" 
                            placeholder="Enter email" 
                            onChange={handleInputChange}
                        />
                        {email.error && <Info size={20} color=" rgb(239 68 68)" />}
                    </div>
                    {email.error && <p className="text-red-500 text-size-400 font-normal m-2">Enter a correct email format</p>}
                </div>
                <div className="w-full">
                <Button disabled = {loading || !isFilled} btnType = "submit" className="px-10 py-4 w-full rounded-md font-roboto text-size-500 uppercase font-semibold bg-black text-white">
                      {loading ? "Loading..." : "Verify email"}
                </Button>
                </div>
            </form>
        </FormContainer>
    </>
  )
}

export default VerifyEmail