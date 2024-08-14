import React,{ useState, useRef, useEffect,  } from "react";
import FormContainer from "@/components/FormContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { MailOpen } from "lucide-react";

const ResetOtp = () => {
  const location = useLocation();
  const clientEmail = location.state?.email || "";
  // const link = location.state?.link || "";
  const navigate = useNavigate();

    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [activeOTPIndex, setActiveOTPIndex] = useState(0);
    const [error, setError] = useState({
      msg:"",
      status: false,
    });
    const [loading, setLoading] = useState(false);
    // const [response, setResponse] = useState<string | null>(null);
  
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

    const handleFormSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();

      const otpString = otp.map(otp => otp.toString()).join("");

      if(otpString === "" || otpString.length !== 4){
        setError({
          msg: "Please enter a valid otp",
          status: true
        });
        return
      }
      
      console.log(otpString, typeof otpString)

      const data = {
        otp: otpString,
      }

      console.log(data)
    
      // for the signup page to enable resend
      const url = "user-auth/verify-reset-password-token";
      const headers: HeadersInit = {
        'Content-type': 'application/json',
        "Accept": "application/json",
      }
      
      try {
        setLoading(true)
        const res = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}${url}`,{
          method: "POST",
          headers,
          body: JSON.stringify(data),
        });

        const response = await res.json();

        if(!res.ok){
          throw new Error(response.messge);
        }

        navigate("/reset-password", { replace: true, state: {response} });

        console.log(response);

      } catch (err) {
        console.log((err as Error).message)
        setError({
          msg: (err as Error).message,
          status: true
        })
      }
      finally{
        setLoading(false);
      } 
    }

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
                <form className="bg-white rounded-md shadow-2xl p-5 mt-6" onSubmit={handleFormSubmit}>
                    <div className="flex flex-col gap-y-4 items-center justify-center mb-8">
                        <div className="w-[96px] grid place-items-center bg-[#d6d5d5] aspect-square rounded-full shadow-sm">
                            <MailOpen size={60} strokeWidth={1}/>
                        </div>
                        <p className="font-semibold text-size-400 text-blue w-[80%] text-center">
                            Please verify your account by entering the 6 digit code sent to
                            <br />
                            <span className="text-black text-size-500 first-letter:uppercase">
                              {clientEmail}
                            </span>
                        </p>
                    </div>
                    <div className="flex flex-col gap-y-2 mb-8">
                      <div className="flex gap-1 md:gap-3 xl:gap-5 justify-center py-2">
                          {otp.map((_, index) => {
                          return (
                          <React.Fragment key={index}>
                              <input
                                ref={activeOTPIndex === index ? inputRef : null}
                                type="number"
                                className={
                                    `w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none ${error.status ? "border-red-500" : "border-[#d0d0d0]"} focus-within:border-blue text-gray-400 transition`
                                }
                                onChange={handleOnChange}
                                onKeyDown={(e) => handleOnKeyDown(e, index)}
                                value={otp[index]}
                              />
                          </React.Fragment>
                          );
                      })}
                      </div>
                      {error.status && (
                        <p className="text-red-500 text-size-400 font-normal m-2 text-center">{error.msg}</p>
                      )}
                    </div>
                    <div className="w-full">
                        <button disabled = {loading} type = "submit" className="px-10 py-4 w-full rounded-md font-roboto text-size-500 uppercase font-semibold bg-black text-white">
                          {loading ? "Loading..." : "Verify account"}
                        </button>
                    </div>
                </form>
            </FormContainer>
        </div>
      )

}


export default ResetOtp;
