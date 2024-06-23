import { Link, useNavigate } from "react-router-dom";
import FormContainer from "@/components/FormContainer";
import { Mail, LockKeyhole, Info } from "lucide-react";
import { useState, useEffect } from "react";
import Notification from "@/components/Notification";
import useApiRequest from "@/hooks/useApiRequest";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/authContext";

interface User{
    email: {
        str: string,
        error: boolean
    },
    password: {
        str: string,
        error: boolean  
    }
}

const Signin = () => {

    const navigate = useNavigate();

    const { loading, error, response, makeRequest } = useApiRequest<{token: string}, {email:string, password: string}>({
        method:"POST",
    });

    const { setIsLogin, setToken, token } = useAuth();

    const [user, setUser] = useState<User>({
        email: {
            str: "",
            error: false,
        },
        password: {
            str: "",
            error: false,
        }
    });

    const [validateError, setValidateError] = useState<{msg:string; status:boolean}>({
        msg: "",
        status: false,
    });

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        const { name, value } = target;

        if(name === "password"){
            setUser({ ...user, [name]: {str: value, error: false} })
            return;
        }

        setUser({ ...user, [name]: {str: value.toLocaleLowerCase(), error: false} });
    }

    console.log(user)
    const handleFormSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/i;

        const { email, password } = user;

        if(email.str === "" || password.str === "" ){
            setValidateError({status: true, msg: "All fields are required!"});
            return
        }

        if(!emailRegex.test(email.str)){
            setUser({ ...user, email: { ...email, error: true } });
            return;
        }
        else if(!passwordRegex.test(password.str)){
            setUser({ ...user, password: { ...password, error: true } });
            return;
        }

        const data = {
            email: email.str,
            password: password.str,
        }

        console.log(data);

        await makeRequest(data, "user-auth/login");

        if(response !== undefined && response !== null){
            console.log(response);

            const token = Cookies.get("auth_token");
            if(!token){
                const decodedToken: any = jwtDecode(response?.token);
                console.log(decodedToken);
              
                Cookies.set("auth_token", response?.token, {
                  expires: new Date(decodedToken?.exp * 1000)
                });
            }

           if(token){setToken(token);
            setIsLogin(true)}
        }

        navigate("/", { replace: true });
        
    }

    console.log(response?.token, token)

    useEffect(() =>{
        let errorRemoval: ReturnType<typeof setTimeout>;
    
        if(error){
           errorRemoval =  setTimeout(() =>{
                setValidateError({status: false, msg: ""});
            }, 2000)
        }
    
        return() => clearTimeout(errorRemoval)
    }, [error]);

  return (
    <>
        <FormContainer>
            <form className="bg-white rounded-md shadow-2xl p-5" onSubmit={handleFormSubmit}>
                <h1 className="text-gray-800 font-bold text-2xl md:text-3xl mb-3 uppercase">Hello Again!</h1>
                <p className="text-md font-normal text-blue mb-8">Welcome Back</p>
                {validateError.status && <Notification message = {validateError.msg} type = "danger" className="text-white mb-4"/>}
                {error && <Notification message = {error} type = "danger" className="text-white mb-4"/>}
                <div>
                    <div className={`flex items-center ${user.email.error ? "border-2 border-red-500": "border-2 border-gray focus-within:border-blue"} mb-3 py-3 px-3 rounded-md`}>
                        <Mail size = {20}/>
                        <input 
                            className="pl-2 w-full outline-none border-none" 
                            type="text" 
                            name="email" 
                            id="email" 
                            placeholder="Email" 
                            onChange={handleInputChange}
                        />
                        {user.email.error && <Info size={20} color=" rgb(239 68 68)" />}
                    </div>
                    {user.email.error && <p className="text-red-500 text-size-400 font-normal m-2">Enter a correct email format</p>}
                </div>
                <div>
                    <div className={`flex items-center ${user.password.error ? "border-2 border-red-500": "border-2 border-gray focus-within:border-blue"} mb-3 py-3 px-3 rounded-md`}>
                        <LockKeyhole size = {20}/>
                        <input 
                            className="pl-2 w-full outline-none border-none" 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Password" 
                            onChange={handleInputChange}
                        />
                        {user.password.error && <Info size={20} color=" rgb(239 68 68)" />}
                    </div>
                    {user.password.error && <p className="text-red-500 text-size-400 font-normal m-2">Password contain aphlabets, digits and special characters and be within 8 to 15 characters</p>}
                </div>
                <div className="flex w-full h-fit p-2 mb-3 justify-between">
                    <div className="flex gap-2">
                        <input type="checkbox" name="remember" id="remember" className="w-5 h-5 border-gray"/>
                        <p className="text-sm font-normal text-text-black">Remember me</p>
                    </div>
                    <Link to = "/reset" className="w-fit text-sm text-blue cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</Link>
                </div>
                <div className="w-full">
                    <button type = "submit" className="px-10 py-4 w-full rounded-md font-roboto text-size-500 uppercase font-semibold bg-black text-white ">
                       {loading? "Loading..." : "login"}
                    </button>
                </div>
                <div className="flex w-full justify-center gap-3 accent-blue mt-4">
                    <Link to = "/auth/signup" className="text-sm ml-2 text-blue cursor-pointer hover:-translate-y-1 duration-500 transition-all">Don't have an account yet? Signup</Link>
                </div>
                
            </form>
        </FormContainer>
    </>
  )
}

export default Signin