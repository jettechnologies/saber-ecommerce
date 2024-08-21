import React,{ useState, useRef, useEffect } from "react";
import FormContainer from "@/components/FormContainer";
import { MailOpen } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import useApiRequest from "@/hooks/useApiRequest";
import Cookies from 'js-cookie';
import { useAuth } from "@/context/authContext";
import { differenceInSeconds, addSeconds } from 'date-fns';
import Notification from "@/components/Notification";

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

  const { response, error:fetchError, loading, makeRequest } = useApiRequest<OTPResponseType, {otp: string}>({
    method: "POST",
  });

  const { setToken } = useAuth();

    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [activeOTPIndex, setActiveOTPIndex] = useState(0);
    const [error, setError] = useState({
      msg: "",
      status: false
    })
    const [validateError, setValidateError] = useState(false);
    const [countdown, setCountdown] = useState(2 * 60);
    const [isResend, setIsResend] = useState(false);
    const [formattedTime, setFormattedTime] = useState<string>('');
  
    const inputRef = useRef<HTMLInputElement>(null);
  
    const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = target;
      const newOtp = [...otp];
  
      // If input is cleared or backspace is pressed
      if (!value) {
        newOtp[activeOTPIndex] = "";
        setOtp(newOtp);
  
        // Move to the previous index if within bounds
        if (activeOTPIndex > 0) {
          setActiveOTPIndex(activeOTPIndex - 1);
        }
      } else {
        // Handle input and overwrite the current value
        newOtp[activeOTPIndex] = value.slice(-1);
        setOtp(newOtp);
  
        // Move to the next index if within bounds
        if (activeOTPIndex < otp.length - 1) {
          setActiveOTPIndex(activeOTPIndex + 1);
        } else {
          // Reset the index to 0 if the entire Otp has been filled
          setActiveOTPIndex(0);
        }
      }
    };
  
    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        const newOtp: string[] = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        setActiveOTPIndex(index > 0 ? index - 1 : 0);
      }
    };
  
    useEffect(() => {
      inputRef.current?.focus();
    }, [activeOTPIndex]);

    // function to format the countdown in a proper way
    useEffect(() => {
      const endTime = addSeconds(new Date(), countdown);
  
      const updateTimer = () => {
        const now = new Date();
        const secondsLeft = differenceInSeconds(endTime, now);
  
        if (secondsLeft >= 0) {
          const minutes = Math.floor(secondsLeft / 60);
          const seconds = secondsLeft % 60;
          setFormattedTime(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
        } else {
          setFormattedTime("0:00");
          clearInterval(intervalId);
        }
      };
  
      updateTimer(); // Initial call to set the time immediately
      const intervalId = setInterval(updateTimer, 1000);
  
      return () => clearInterval(intervalId);
    }, [countdown]);
  

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

      try{
        await makeRequest(data, url, headers);
        navigate("/auth/login", { replace: true });
      }
      catch(err){
        console.log((err as Error).message)
      }

    }

    // useEffect for setting the token in cookies and in state
    useEffect(() =>{
      if(response && response !== null){
          // setting the expiration day for 30 days
          const expires = new Date();
          expires.setDate(expires.getDate() + 30);
          
          Cookies.set("auth_token", response?.accessToken?.token, {
              expires: expires
          });

          setToken(response?.accessToken?.token);
          navigate("/", {replace:true});
      }
  }, [response, setToken, navigate]);

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


    // useEffect hook to get the local error state been saved
    useEffect(() =>{
      if(fetchError){
        setError({
          msg: fetchError,
          status: true
        })
      }
    }, [fetchError])

    useEffect(() =>{
      let errorRemoval: ReturnType<typeof setTimeout>;
  
      if(error){
         errorRemoval =  setTimeout(() =>{
              setError({
                msg: "",
                status: false
              });
          }, 2000)
      }
  
      return() => clearTimeout(errorRemoval)
  }, [error]);

  return (
    <div className="w-full">
        <FormContainer>
            <form onSubmit={handleFormSubmit} className="bg-white rounded-md shadow-2xl p-5 mt-6">
              {error.status && <Notification type="danger" message={error.msg} />}

                <div className="flex flex-col gap-y-4 items-center justify-center mb-6">
                    <div className="w-[96px] grid place-items-center bg-[#d6d5d5] aspect-square rounded-full shadow-sm">
                        <MailOpen size={60} strokeWidth={1}/>
                    </div>
                    <p className="font-semibold text-size-400 text-blue w-[80%] text-center">
                        Please verify your account by entering the 4 digit code sent to
                        <br />
                        <span className="text-black text-size-500 first-letter:uppercase">
                          {clientEmail}
                        </span>
                    </p>
                </div>
                <div className="w-full mb-5 flex justify-center">
                  <div className="mx-auto">{formattedTime}</div>
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
            </form>
        </FormContainer>
    </div>
  )
}

export default OTP
