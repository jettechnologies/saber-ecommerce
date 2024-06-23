import React,{ useState, useRef, useEffect } from "react";
import FormContainer from "@/components/FormContainer";
import { MailOpen } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import useApiRequest from "@/hooks/useApiRequest";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/authContext";

interface OTPResponseType{
  accessToken: {
    token: string;
  };
  isValid: boolean;
}


const OTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const clientEmail:string = location.state?.email ?? "";

  const [countdown, setCountdown] = useState(2 * 60);
  const [isResend, setIsResend] = useState(false);
  // const [loading, setLoaidng] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [response, setResponse] = useState<string | null>(null);

  const { response, error, loading, makeRequest } = useApiRequest<OTPResponseType, {otp: string}>({
    method: "POST",
  });

  const { setToken, setIsLogin } = useAuth();

    let currentOTPIndex = 0;

    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [activeOTPIndex, setActiveOTPIndex] = useState(0);
    const [validateError, setValidateError] = useState(false);
  
    const inputRef = useRef<HTMLInputElement>(null);
  
    const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = target;
      const newOTP: string[] = [...otp];
      newOTP[currentOTPIndex] = value.substring(value.length - 1);
  
      if (!value) setActiveOTPIndex(currentOTPIndex - 1);
      else setActiveOTPIndex(currentOTPIndex + 1);
  
      setOtp(newOTP);
      console.log(otp)

      // makeRequest({

      // });

    };
  
    const handleOnKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
    ) => {
      currentOTPIndex = index;
      if (e.key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
    };
  
    useEffect(() => {
      inputRef.current?.focus();
    }, [activeOTPIndex]);

    const handleFormSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();

      const otpString = otp.map(otp => otp.toString()).join("");

      if(otpString === "" || otpString.length !== 4){
        setValidateError(prevError => !prevError);
        return
      }
      
      const data = {
        otp: otpString,
      }

      console.log(isResend)

      const url = isResend ? 'user-auth/resend-otp' : 'user-auth/verify-email';
      const headers: HeadersInit | undefined = isResend ? { "email": clientEmail } : undefined;

      await makeRequest(data, url, headers);
        if(error !== null){
          return;
        }

        if(response !== null && response !== undefined){   
          console.log(response?.accessToken?.token) 
          const decodedToken: any = jwtDecode(response?.accessToken?.token);
          console.log(decodedToken);
        
          Cookies.set("auth_token", response?.accessToken?.token, {
            expires: new Date(decodedToken?.exp * 1000)
          })
          
          setToken(response?.accessToken?.token)
          setIsLogin(true);
          navigate("/", {replace:true});
        }
    }

    // countdown logic
    useEffect(() => {
      // Exit early when countdown reaches 0
      if (countdown === 0) {
        setIsResend(true)
        return
      }
  
      // Set interval to decrease countdown by 1 every second
      const intervalId = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
  
      // Clean up interval on component unmount or when countdown reaches 0
      return () => clearInterval(intervalId);
    }, [countdown]);

  return (
    <div className="w-full">
        <FormContainer>
            <form onSubmit={handleFormSubmit} className="bg-white rounded-md shadow-2xl p-5 mt-6">
                <div className="flex flex-col gap-y-4 items-center justify-center mb-8">
                    <div className="w-[96px] grid place-items-center bg-[#d6d5d5] aspect-square rounded-full shadow-sm">
                        <MailOpen size={60} strokeWidth={1}/>
                    </div>
                    <p className="font-semibold text-size-400 text-blue w-[80%] text-center">
                        Please verify your account by entering the 6 digit code sent to
                        <br />
                        <span className="text-black text-size-500 capitalize">
                          {clientEmail}
                        </span>
                    </p>
                </div>
                <div className="flex gap-1 md:gap-3 xl:gap-5 justify-center mb-8 py-2">
                    {otp.map((_, index) => {
                    return (
                    <React.Fragment key={index}>
                        <input
                          ref={activeOTPIndex === index ? inputRef : null}
                          type="number"
                          className={
                              `w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none ${validateError ? "border-red-500" : "border-[#d0d0d0]"} focus-within:border-blue text-gray-400 transition`
                          }
                          onChange={handleOnChange}
                          onKeyDown={(e) => handleOnKeyDown(e, index)}
                          value={otp[index]}
                        />
                    </React.Fragment>
                    );
                })}
                </div>
                {/* <div className="w-full">
                    <button type = "submit" className="px-10 py-4 w-full rounded-md font-roboto text-size-500 uppercase font-semibold bg-black text-white">
                        Verify account
                    </button>
                </div> */}
                {!isResend ? <div className="w-full">
                    <button disabled = {loading} type = "submit" className="px-10 py-4 w-full rounded-md font-roboto text-size-500 uppercase font-semibold bg-black text-white">
                      {loading ? "Loading..." : "Verify account"}
                    </button>
                  </div>
                  : <div className="w-full">
                    <button disabled = {loading} type = "submit" className="px-10 py-4 w-full rounded-md font-roboto text-size-500 uppercase font-semibold bg-black text-white">
                      {loading ? "Loading..." : "Resend OTP"}
                    </button>
                  </div>
                }
                <div>
                  <h1>Timer Countdown</h1>
                  <div>Countdown: {countdown}</div>
                </div>
            </form>
        </FormContainer>
    </div>
  )
}

export default OTP
