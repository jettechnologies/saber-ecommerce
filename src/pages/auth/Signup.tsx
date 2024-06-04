import FormContainer from "../../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { User, Mail, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import Notification from "../../components/Notification";

interface StateObj{
 str: string;
 error: boolean;
}
  
interface User{
 name:StateObj;
 email: StateObj;
 password: StateObj;
 confirmPassword: {str:string};
}

const Signup = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState<User>({
        name: {str: "", error: false},
        email: {str: "", error: false},
        password: {str: "", error: false},
        confirmPassword: {str: ""}
    });
    const [error, setError] = useState<boolean>(false);

      // setting the values of the input fields
  function handleInputChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;

    setUser({ ...user, [name]: {str: value.toLocaleLowerCase(), error: false} });
}

const formSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameRegex = /^[a-zA-Z\s]*$/;
    // const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/i;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const {name, password, confirmPassword, email} = user;

    if(!nameRegex.test(name.str)){
        setUser({ ...user, name: { ...name, error: true } });
        return;
    }
    else if(!passwordRegex.test(password.str)){
        setUser({ ...user, password: { ...password, error: true } });
        return;
    }
    else if(confirmPassword.str !== password.str){
        setError(true);
        return
    }
    else if(!emailRegex.test(email.str)){
        setUser({ ...user, email: { ...email, error: true } });
        return;
    }

    const data = {
        name: name.str,
        email: email.str,
        password: password.str
    }
  console.log(data);

  navigate("/auth/otp", { replace: true });

}

useEffect(() =>{
    let errorRemoval: ReturnType<typeof setTimeout>;

    if(error){
       errorRemoval =  setTimeout(() =>{
            setError(!error);
        }, 2000)
    }

    return() => clearTimeout(errorRemoval)
}, [error]);

console.log(user)

  return (
    <>
        <FormContainer>
            <form className="bg-white rounded-md shadow-2xl p-5" onSubmit={formSubmit}>
                <h1 className="text-gray-800 font-bold text-2xl md:text-3xl mb-3 uppercase">Sign up</h1>
                <p className="text-md font-normal text-blue mb-8">Create a new account</p>
                {error && <Notification message = "Passwords dont't match" type = "danger"/>}
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                    <User size = {20}/>
                    <input 
                        id="name" className=" pl-2 w-full outline-none border-none" 
                        type="text" 
                        name="name" 
                        placeholder="Full name" 
                        onChange={handleInputChange}
                    />
                    {user.name.error && <p className="text-red-500 text-size-400 font-normal">Full name shouldn't be empty and should be a aplhabet</p>}
                </div>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                    <Mail size = {20}/>
                    <input 
                        id="email" 
                        className=" pl-2 w-full outline-none border-none" 
                        type="email" 
                        name="email" 
                        placeholder="Email Address" 
                        onChange={handleInputChange}
                    />
                    {user.email.error && <p className="text-red-500 text-size-400 font-normal">Email shouldn't be empty and should be a aplhabet</p>}
                </div>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
                    <LockKeyhole size = {20}/>
                    <input 
                        className="pl-2 w-full outline-none border-none" 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Password" 
                        onChange={handleInputChange}
                    />
                    {user.password.error && <p className="text-red-500 text-size-400 font-normal">Password shouldn't be empty and should be within 8 to 15 characters</p>}
                </div>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
                    <LockKeyhole size = {20}/>
                    <input 
                        className="pl-2 w-full outline-none border-none" 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPassword" 
                        placeholder="Confirm password" 
                        onChange={handleInputChange}
                    />
                </div>
                <div className="w-full">
                    <button type = "submit" className="px-10 py-4 w-full rounded-md font-roboto text-size-500 uppercase font-semibold bg-black text-white hover:text-text-black hover:bg-white hover:border-2 hover:border-black ">
                        Create account
                    </button>
                </div>
                {/* <div className="flex justify-between mt-4">
                    <Link to = "/reset" className="text-sm ml-2 hover:text-blue cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</Link>

                    <Link to = "/auth/signup" className="text-sm ml-2 hover:text-blue cursor-pointer hover:-translate-y-1 duration-500 transition-all">Don't have an account yet?</Link>
                </div> */}
                
            </form>
        </FormContainer>
    </>
  )
}

export default Signup