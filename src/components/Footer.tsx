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
                        Join our newsletter.
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
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 24 24" fill = "currentColor">
                        <path d="M17,3H7C4.791,3,3,4.791,3,7v10c0,2.209,1.791,4,4,4h5.621v-6.961h-2.343v-2.725h2.343V9.309 c0-2.324,1.421-3.591,3.495-3.591c0.699-0.002,1.397,0.034,2.092,0.105v2.43h-1.428c-1.13,0-1.35,0.534-1.35,1.322v1.735h2.7 l-0.351,2.725h-2.365V21H17c2.209,0,4-1.791,4-4V7C21,4.791,19.209,3,17,3z"></path>
                    </svg>
                      <span className="sr-only">Facebook page</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                    </svg>
                      <span className="sr-only">Instagram page</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                        {/* <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                            <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
                        </svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 24 24" fill = "currentColor">
                            <path d="M 4.4042969 3 C 3.7572969 3 3.3780469 3.7287656 3.7480469 4.2597656 L 9.7363281 12.818359 L 3.7246094 19.845703 C 3.3356094 20.299703 3.6578594 21 4.2558594 21 L 4.9199219 21 C 5.2129219 21 5.4916406 20.871437 5.6816406 20.648438 L 10.919922 14.511719 L 14.863281 20.146484 C 15.238281 20.680484 15.849953 21 16.501953 21 L 19.835938 21 C 20.482937 21 20.862187 20.272188 20.492188 19.742188 L 14.173828 10.699219 L 19.900391 3.9902344 C 20.232391 3.6002344 19.955359 3 19.443359 3 L 18.597656 3 C 18.305656 3 18.027891 3.1276094 17.837891 3.3496094 L 12.996094 9.0097656 L 9.3945312 3.8554688 C 9.0205313 3.3194687 8.4098594 3 7.7558594 3 L 4.4042969 3 z"></path>
                        </svg>
                      <span className="sr-only">X page</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50" fill="currentColor">
                        <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"></path>
                    </svg>
                    <span className="sr-only">Tiktok account</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30" fill="currentColor">
                        <path d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 17.251208 3.6323415 19.350068 4.7109375 21.150391 L 3.1074219 27 L 9.0820312 25.431641 C 10.829354 26.425062 12.84649 27 15 27 C 21.627 27 27 21.627 27 15 C 27 8.373 21.627 3 15 3 z M 10.892578 9.4023438 C 11.087578 9.4023438 11.287937 9.4011562 11.460938 9.4101562 C 11.674938 9.4151563 11.907859 9.4308281 12.130859 9.9238281 C 12.395859 10.509828 12.972875 11.979906 13.046875 12.128906 C 13.120875 12.277906 13.173313 12.453437 13.070312 12.648438 C 12.972312 12.848437 12.921344 12.969484 12.777344 13.146484 C 12.628344 13.318484 12.465078 13.532109 12.330078 13.662109 C 12.181078 13.811109 12.027219 13.974484 12.199219 14.271484 C 12.371219 14.568484 12.968563 15.542125 13.851562 16.328125 C 14.986562 17.342125 15.944188 17.653734 16.242188 17.802734 C 16.540187 17.951734 16.712766 17.928516 16.884766 17.728516 C 17.061766 17.533516 17.628125 16.864406 17.828125 16.566406 C 18.023125 16.268406 18.222188 16.319969 18.492188 16.417969 C 18.766188 16.515969 20.227391 17.235766 20.525391 17.384766 C 20.823391 17.533766 21.01875 17.607516 21.09375 17.728516 C 21.17075 17.853516 21.170828 18.448578 20.923828 19.142578 C 20.676828 19.835578 19.463922 20.505734 18.919922 20.552734 C 18.370922 20.603734 17.858562 20.7995 15.351562 19.8125 C 12.327563 18.6215 10.420484 15.524219 10.271484 15.324219 C 10.122484 15.129219 9.0605469 13.713906 9.0605469 12.253906 C 9.0605469 10.788906 9.8286563 10.071437 10.097656 9.7734375 C 10.371656 9.4754375 10.692578 9.4023438 10.892578 9.4023438 z"></path>
                    </svg>
                    <span className="sr-only">whatsapp account</span>
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
