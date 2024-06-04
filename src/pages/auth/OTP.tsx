import FormContainer from "../../components/FormContainer";
import { MailOpen } from "lucide-react";

const OTP = () => {
  return (
    <>
        <FormContainer>
            <form className="bg-white rounded-md shadow-2xl p-5 mt-6">
                <div className="flex flex-col gap-y-4 items-center justify-center mb-8">
                    <div className="w-[96px] grid place-items-center bg-[#d6d5d5] aspect-square rounded-full shadow-sm">
                        <MailOpen size={60} strokeWidth={1}/>
                    </div>
                    <p className="font-semibold text-size-500 text-blue w-[80%] text-center">
                        Please verify your account by entering the 6 digit code sent to your email
                    </p>
                </div>
                <div className="flex gap-1 md:gap-3  justify-center lg:justify-between mb-8 py-2">
                    <input type="text" className="border p-3 w-[3rem] rounded-md bg-white text-black font-roboto font-normal"/>
                    <input type="text" className="border p-3 w-[3rem] rounded-md bg-white text-black font-roboto font-normal"/>
                    <input type="text" className="border p-3 w-[3rem] rounded-md bg-white text-black font-roboto font-normal"/>
                    <input type="text" className="border p-3 w-[3rem] rounded-md bg-white text-black font-roboto font-normal"/>
                    <input type="text" className="border p-3 w-[3rem] rounded-md bg-white text-black font-roboto font-normal"/>
                    <input type="text" className="border p-3 w-[3rem] rounded-md bg-white text-black font-roboto font-normal"/>
                </div>
                <div className="w-full">
                    <button type = "submit" className="px-10 py-4 w-full rounded-md font-roboto text-size-500 uppercase font-semibold bg-black text-white hover:text-text-black hover:bg-white hover:border-2 hover:border-black ">
                        Verify account
                    </button>
                </div>
            </form>
        </FormContainer>
    </>
  )
}

export default OTP;