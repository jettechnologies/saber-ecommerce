import FormContainer from "@/components/FormContainer";
import { useNavigate } from "react-router-dom";
import { User, Mail, Info, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import Notification from "@/components/Notification";
// import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@/icons/svg";
import useApiRequest from "@/hooks/useApiRequest";
import PasswordInput from "@/components/Password";

interface StateObj{
 str: string;
 error: boolean;
}
  
interface User{
 name:StateObj;
 email: StateObj;
 mobile: StateObj,
 postal_code: StateObj;
 password: StateObj;
 confirmPassword: StateObj;
}

interface Error{
    status: boolean;
    msg: string;
}

const Signup = () => {

    const navigate = useNavigate()
    const { response, error, loading, makeRequest } = useApiRequest({
        method: "POST",
    });

    const [user, setUser] = useState<User>({
        name: {str: "", error: false},
        email: {str: "", error: false},
        mobile: {str: "", error: false},
        postal_code: {str: "", error: false},
        password: {str: "", error: false},
        confirmPassword: {str: "", error: false}
    });
    const [validateError, setValidateError] = useState<Error>({
        status: false,
        msg : ""
    });

      // setting the values of the input fields
  function handleInputChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;

    if(name === "password" || name === "confirmPassword"){
        setUser({ ...user, [name]: {str: value, error: false} })
        return;
    }

    setUser({ ...user, [name]: {str: value.toLocaleLowerCase(), error: false} });
}

const formSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameRegex = /^[a-zA-Z\s]*$/;
    // const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/i;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const {name, password, confirmPassword, email, mobile} = user;

    if(name.str === "" || email.str === "" || password.str === "" || confirmPassword.str === "" || mobile.str === ""){
        setValidateError({status: true, msg: "All fields are required!"});
        return
    }

    if(!nameRegex.test(name.str)){
        setUser({ ...user, name: { ...name, error: true } });
        return;
    }
    else if(!passwordRegex.test(password.str)){
        setUser({ ...user, password: { ...password, error: true } });
        return;
    }
    else if(confirmPassword.str !== password.str){
        setValidateError({status: true, msg: "Passwords do not match!"});
        return
    }
    else if(!emailRegex.test(email.str)){
        setUser({ ...user, email: { ...email, error: true } });
        return;
    }

    const data = {
        fullname: name.str,
        email: email.str,
        password: password.str,
        confirmPassword: confirmPassword.str,
        mobile: mobile.str,
    }
  
    // makeRequest("user-auth/register", data);
    await makeRequest(data, "user-auth/register");

}

useEffect(() =>{
    if(response && response!== null){
        navigate("/auth/otp", { replace: true, state: { email: user.email.str} });
    }
}, [response, navigate, user.email.str]);

useEffect(() =>{
    let errorRemoval: ReturnType<typeof setTimeout>;

    if(validateError){
       errorRemoval =  setTimeout(() =>{
            setValidateError({status: false, msg: ""});
        }, 2000)
    }

    return() => clearTimeout(errorRemoval)
}, [validateError]);
console.log(response, error, user);

  return (
    <>
        <FormContainer>
            <form className="bg-white rounded-md shadow-2xl p-5" onSubmit={formSubmit}>
                <h1 className="text-gray-800 font-bold text-2xl md:text-3xl mb-3 uppercase">Sign up</h1>
                <p className="text-md font-normal text-blue mb-8">Create a new account</p>
                {validateError.status && <Notification message = {validateError.msg} type = "danger" className="text-white mb-4"/>}
                {error && <Notification message = {error} type = "danger" className="text-white mb-4"/>}
                <div>
                    <div className={`flex items-center ${user.name.error ? "border-2 border-red-500": "border-2 border-gray focus-within:border-blue"} mb-3 py-3 px-3 rounded-md`}>
                        <User size = {20}/>
                        <input 
                            className="pl-2 w-full outline-none border-none" 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Name" 
                            onChange={handleInputChange}
                        />
                        {user.name.error && <Info size={20} color=" rgb(239 68 68)" />}
                    </div>
                    {user.name.error && <p className="text-red-500 text-size-400 font-normal m-2">Fullname should be alphabets only </p>}
                </div>
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
                    {user.email.error && <p className="text-red-500 text-size-400 font-normal m-2">Password contain aphlabets, digits and special characters and be within 8 to 15 characters</p>}
                </div>
                <div>
                    <div className={`flex items-center ${user.name.error ? "border-2 border-red-500": "border-2 border-gray focus-within:border-blue"} mb-3 py-3 px-3 rounded-md`}>
                        <Phone size = {20}/>
                        <input 
                            className="pl-2 w-full outline-none border-none" 
                            type="text" 
                            name="mobile" 
                            id="mobile" 
                            placeholder="mobile" 
                            onChange={handleInputChange}
                        />
                        {user.mobile.error && <Info size={20} color=" rgb(239 68 68)" />}
                    </div>
                    {user.mobile.error && <p className="text-red-500 text-size-400 font-normal m-2">Fullname should be alphabets only </p>}
                </div>
                <div>
                    <div className={`flex items-center ${user.name.error ? "border-2 border-red-500": "border-2 border-gray focus-within:border-blue"} mb-3 py-3 px-3 rounded-md`}>
                        <MapPin size = {20}/>
                        <input 
                            className="pl-2 w-full outline-none border-none" 
                            type="text" 
                            name="postal_code" 
                            id="postal_code" 
                            placeholder="Enter your current postal code" 
                            onChange={handleInputChange}
                        />
                        {user.postal_code.error && <Info size={20} color=" rgb(239 68 68)" />}
                    </div>
                    {user.postal_code.error && <p className="text-red-500 text-size-400 font-normal m-2">Fullname should be alphabets only </p>}
                </div>
                {/* <div>
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
                <div>
                    <div className={`flex items-center ${user.confirmPassword.error ? "border-2 border-red-500": "border-2 border-gray focus-within:border-blue"} mb-3 py-3 px-3 rounded-md`}>
                        <LockKeyhole size = {20}/>
                        <input 
                            className="pl-2 w-full outline-none border-none" 
                            type="password" 
                            name="confirmPassword" 
                            id="confirm_password" 
                            placeholder="Confirm Password" 
                            onChange={handleInputChange}
                        />
                        {user.confirmPassword.error && <Info size={20} color=" rgb(239 68 68)" />}
                    </div>
                    {user.confirmPassword.error && <p className="text-red-500 text-size-400 font-normal m-2">Password contain aphlabets, digits and special characters and be within 8 to 15 characters</p>}
                </div> */}
                <PasswordInput name = "password" placeholder = "Password" password = {user.password} setPassword={(newValue) => setUser({...user, password: newValue})}/>
                <PasswordInput name = "confirmPassword" placeholder = "Confirm Password" password={user.confirmPassword} setPassword={(newValue) => setUser({...user, confirmPassword: newValue})}/>
                <div className="w-full h-fit flex flex-col gap-y-3">
                    <button type = "submit" className="px-10 py-4 w-full rounded-md font-roboto text-size-500 uppercase font-semibold bg-black text-white">
                        {loading ? "Loading..." : "Create account"}
                    </button>
                    <Link to = "/" className="p-3 w-full hover:-translate-y-1 duration-500 transition-all text-blue text-size-500 font-medium capitalize flex gap-3 justify-center items-center">
                        <ArrowLeftIcon className="w-5 h-5 text-blue" />
                        back home
                    </Link>
                </div>
                
            </form>
        </FormContainer>
    </>
  )
}

export default Signup