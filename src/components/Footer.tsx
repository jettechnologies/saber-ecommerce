import { Link } from "react-router-dom";
import { Bell, MailCheck } from "lucide-react";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import useApiRequest from "@/hooks/useApiRequest";
import Spinner from "./Spinner";
// import Button from "./Button";
import Modal2 from "./Modal2";

interface Email {
    str: string;
    error: boolean;
}

export default function Footer() {

    const { response, loading, makeRequest } = useApiRequest<{message: string}, {email: string}>({
        method: "POST",
    })
    const [email, setEmail] = useState<Email>({
        str: "",
        error: false,
    });
    const [isSubscribe, setIsSubscribe] = useState({
        message: "",
        status: false,
    });

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

        console.log(data);

        // const url = "https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/newsletter";
        const url = "browse/newsletter";
        console.log(url)

        try{
        //     const response = await fetch(url, {
        //         method: "POST",
        //         headers:{
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(data)
        //     })

        //     if (!response.ok) {
        //         throw new Error("Network response was not ok");
        //       }
        
        //       const resData = await response.json();
        //       console.log(resData);
        // }
        // catch(e){
        //     console.log((e as Error).message);
        // }
            await makeRequest(data, url);
        }
        catch(e){
            console.log((e as Error).message);
        }
    }

    useEffect(() =>{
        if(response){setIsSubscribe({message: response?.message, status: true})}
    }, [response]);

    console.log(response, isSubscribe)

  return (
    <>
    <footer className="bg-footer font-roboto text-white px-2 mt-10">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between md:flex-wrap">
              <div className="mb-6 md:mb-0">
                  <Link to = "/" className="flex items-center">
                      <Logo />
                  </Link>
              </div>
              <div className="min-w-full md:min-w-[25rem] justify-between flex mb-8">
                  <div>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Main nav</h2>
                      <ul className="text-gray-500 dark:text-gray-400 font-medium">
                          <li className="mb-4">
                              <Link to="/store" className="hover:underline">Store</Link>
                          </li>
                          <li>
                              <Link to="/about" className="hover:underline">About us</Link>
                          </li>
                      </ul>
                  </div>
                  <div>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                      <ul className="text-gray-500 dark:text-gray-400 font-medium">
                          <li className="mb-4">
                              <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Github</a>
                          </li>
                          <li>
                              <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
                          </li>
                      </ul>
                  </div>
                  <div>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                      <ul className="text-gray-500 dark:text-gray-400 font-medium">
                          <li className="mb-4">
                              <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                          </li>
                          <li className="mb-4">
                              <Link to="/terms-and-condition" className="hover:underline">Terms &amp; Conditions</Link>
                          </li>
                          <li>
                              <Link to="/refund-policy" className="hover:underline">Refund Policy</Link>
                          </li>
                      </ul>
                  </div>
              </div>
              <div className="md:px-8 max-md:mx-auto">
                <div className="w-full flex flex-col items-center">
                  <div className="max-sm:hidden">
                    <p className="mb-3 text-size-500 text-[#a0a0a0] text-center">
                        Join our newsletter for the latest theGearMates deals and updates.
                    </p>
                  </div>
                  <form onSubmit={handleFormSubmit}> 
                      <div className = {`w-fit flex items-center p-1 border ${email.error ? "border-red-500" : "border-gray"} focus-within:border-blue focus-within:border-2 rounded-md`}>
                          <input type="text" 
                              placeholder="Enter email address"
                              className="w-[20rem] h-10 border-none outline-none text-white font-roboto font-normal bg-transparent pl-2 "
                              onChange={handleInputChange}
                          />
                          <button type="submit"  className="px-4 py-2 h-[10] cursor-pointer">
                              {!loading ? <Bell size = {25} color = "#fff" /> : <Spinner />}
                          </button>
                      </div>
                  </form>
                </div>
              </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="/" className="hover:underline">Thegearmate</a>. All Rights Reserved.
              </span>
              <div className="flex mt-4 sm:justify-center sm:mt-0">
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                            <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                        </svg>
                      <span className="sr-only">Facebook page</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                            <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                        </svg>
                      <span className="sr-only">Discord community</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                        <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
                    </svg>
                      <span className="sr-only">Twitter page</span>
                  </a>
                  {/* <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                      </svg>
                      <span className="sr-only">GitHub account</span>
                  </a> */}
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clip-rule="evenodd"/>
                    </svg>
                      <span className="sr-only">Dribbble account</span>
                  </a>
              </div>
          </div>
        </div>
    </footer>
    
    {/* Modal2 for confirming if the user wants to logout */}

    <Modal2 title = "Congratulation" isOpen = {isSubscribe.status} handleModalClose = {()=> setIsSubscribe(prevState => ({
        ...prevState,
        status: false
    }))}>
        <div className="flex flex-col w-full ">
          <div className="flex items-center gap-3">
            {/* <MessageSquareWarning size = {35} color = "rgb(239 68 68)"/> */}
            <MailCheck size = "25" color = "rgb(34 197 94)"/>
            <p className="font-roboto font-normal text-text-black text-sm first-letter:capitalize">
                {isSubscribe.message}
            </p>
          </div>
          <div className="flex gap-5 mt-5 border-t border-[#f0f0f0] pt-3">
            {/* <Button 
              type="white" 
              size="medium" 
              className="text-sm uppercase flex-1"
              handleClick = {() => setIsSubscribe(prevState => ({
                    ...prevState,
                    status: false
                }))}
            >
              
            </Button> */}
            {/* <Button  
              size="medium"
              handleClick={() => handleLogout()}
              className="text-sm uppercase flex-1"
            >
              logout
            </Button> */}
          </div>
        </div>
      </Modal2>
    </>
  );
}
