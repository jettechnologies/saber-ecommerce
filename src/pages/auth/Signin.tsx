import { Link } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { Mail, LockKeyhole } from "lucide-react";

const Signin = () => {
  return (
    <>
        <FormContainer>
            <form className="bg-white rounded-md shadow-2xl p-5">
                <h1 className="text-gray-800 font-bold text-2xl md:text-3xl mb-3 uppercase">Hello Again!</h1>
                <p className="text-md font-normal text-blue mb-8">Welcome Back</p>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                    <Mail size = {20}/>
                    <input id="email" className=" pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" />
                </div>
                <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                    <LockKeyhole size = {20}/>
                    <input className="pl-2 w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" />
                </div>
                <div className="w-full">
                    <button type = "submit" className="px-10 py-4 w-full rounded-md font-roboto text-size-500 uppercase font-semibold bg-black text-white hover:text-text-black hover:bg-white hover:border-2 hover:border-black ">
                        login
                    </button>
                </div>
                <div className="flex justify-between mt-4">
                    <Link to = "/reset" className="text-sm ml-2 hover:text-blue cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</Link>

                    <Link to = "/auth/signup" className="text-sm ml-2 hover:text-blue cursor-pointer hover:-translate-y-1 duration-500 transition-all">Don't have an account yet?</Link>
                </div>
                
            </form>
        </FormContainer>
    </>
  )
}

export default Signin