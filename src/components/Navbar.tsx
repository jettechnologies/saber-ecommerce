import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Modal from "./Modal";
import Search from "./Search";
import { routes } from "../config/router/paths";
import menuHamburger from "../assets/icons/menuHamburger.svg";
import menuArrowRight from "../assets/icons/menuArrowRight.svg";
import { SearchIcon, UserIcon } from "../icons/svg";
import { CircleAlert } from "lucide-react";
import { useCartContext } from "@/context/cartContext";
import { CartIcon } from "../icons/svg";
import { useProductCatergories } from "@/context/productCatergoriesContext";
// import { useAuth } from "@/context/authContext";
// import { UserProfile } from "@/types";
import { useUserProfile } from "@/context/userProfileContext";
import Cookies from "js-cookie";
import Modal2 from "./Modal2";
import Button from "./Button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const location = useLocation();
  const currentUrl = location.pathname;
  const navigate = useNavigate();

  const { cartItems } = useCartContext();
  const { categories } = useProductCatergories();
  // const { token, isLogin, loading } = useAuth();
  const { user } = useUserProfile();
  // const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLogout, setIsLogout] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: routes.STORE, text: "Shop" },
    { to: routes.ABOUT, text: "About Us" },
  ];

  // useEffect(() =>{
  //   const getUserProfile = async() =>{
  //     try{
  //       const res = await fetch("https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/user-auth/profile", {
  //         headers:{
  //           Authorization: `Bearer ${token}`,
  //         }
  //       });
  //       if(!res.ok){
  //         throw new Error(`Error: ${res.status} ${res.statusText}`);
  //       }

  //       const response = await res.json();
  //       setUserProfile(response);
  //     }
  //     catch(err){
  //       console.error((err as Error).message)
  //     }
  //   }

  //   if(!loading){getUserProfile()}
  // }, [token, setUserProfile, loading]);

  const handleLogout = () =>{
    Cookies.remove("auth_token");
    
    navigate("/", {replace: true});
    window.location.reload();
  }

  return (
    <>
      <header className="font-roboto max-h-[--header-height] z-[400] sticky top-0 left-0 border-b-[1px] md:px-24 bg-white px-8 py-4 ">
        <div className="flex justify-between place-items-center w-full h-full relative">
          <div className=" flex justify-start lg:hidden">
            <button onClick={handleClick}>
              <img src={menuHamburger} alt="open menu" />
            </button>
          </div>

          <Logo />
          {/* <img loading = "lazy" width={120} height = {120} src={logo} alt="Logo image"/> */}

          <div className="hidden lg:flex justify-center">
            <ul className="flex gap-5">
              <li id = "shop" className="w-fit p-2">
                <Link
                  to={"/store"}
                  className={`flex gap-8 text-size-500 font-semibold`}
                >
                  <h1>Shop</h1>
                </Link>
                <ul className="hidden absolute top-[2.65rem] bg-white w-full items-center justify-evenly left-0 z-[999] shadow-md border border-gray gap-4 pt-6 category-nav">
                  {
                    categories.length > 0 && categories.slice(0,5).map((category) => (
                      <li key = {category.name} className="px-4 pb-4 text-text-black text-md capitalize h-fit">
                        <Link
                          to={`/store/${category.id}`}
                          className={`flex gap-8 text-size-500 font-semibold`}
                        >
                          <div className="flex-1 w-max">
                            <p className= "font-semibold text-text-black text-lg first-letter:uppercase">{category.name}</p>
                            <hr className="my-4 text-gray border"/>
                            <img src={category.banner} alt="category banner" loading="lazy" className="w-full h-[8rem] object-cover"/>
                          </div>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </li>
              <li className="p-2">
              <Link
                  to={"/aboutus"}
                  className={`flex gap-8 text-size-500 font-semibold`}
                >
                  <h1>About</h1>
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <div className="items-center gap-x-4 hidden md:flex">
              {!searchVisible && <div className="w-fit h-fit" onClick={() => setSearchVisible(!searchVisible)}>
                <SearchIcon className="w-5 h-5"/>
              </div>}
              {searchVisible && <Search setSearchVisible = {setSearchVisible}/>}
            </div>
            
            <Link
              to={"/cart"}
              className={` ${
                currentUrl.includes("cart")
                  && "bg-gray"
              } p-2 rounded-lg relative`}
            >
              <CartIcon className="w-5 h-5 text-white"/>
              {cartItems.length >0 && <div className="absolute top-0 right-0 w-5 h-5 rounded-full flex items-center justify-center bg-black text-white">
                <p className="text-size-400 font-normal ">{cartItems.length}</p>
              </div>}
            </Link>
            <div
              className={` ${
                currentUrl.includes("/auth/login")
                  && "bg-gray"
              } p-2 rounded-lg cursor-pointer user-icon `}
            >
              <UserIcon className="w-5 h-5 "/>

              {/* user subNav */}
              <div className="shadow-md py-2 absolute top-[2.65rem] rounded-md right-0 z-[9999px] bg-gray hidden user-sub-nav">
                <ul className="flex flex-col px-4 py-2">
                  {(!user) && <Link to = "/auth/login" className="w-full py-3 border-b">
                    <li className="text-text-black hover:text-blue font-normal text-size-500 capitalize w-[10rem]">
                      Sign in
                    </li>
                  </Link>}
                  {user && 
                    <li className="text-text-black hover:text-blue font-normal text-size-500 capitalize w-[10rem] border-b py-3">
                      {user.fullname}
                    </li>
                  }
                  <Link to = "/user" className="w-full py-3">
                    <li className="text-text-black hover:text-blue font-normal text-size-500 capitalize w-[10rem]">
                      my account
                    </li>
                  </Link>
                  {user && 
                    <li 
                      className="text-text-black hover:text-blue font-normal text-size-500 capitalize w-[10rem] py-3 border-t"
                      onClick={() => setIsLogout(prevState => !prevState)}
                    >
                      Logout
                    </li>}
                </ul>
              </div>

            </div>
            
          </div>
        </div>
      </header>

      {/* Modal2 for confirming if the user wants to logout */}

      <Modal2 title = "Logout" isOpen = {isLogout} handleModalClose = {()=> setIsLogout(prevState => !prevState)}>
        <div className="flex flex-col w-full ">
          <div className="flex items-center gap-3">
            {/* <MessageSquareWarning size = {35} color = "rgb(239 68 68)"/> */}
            <CircleAlert size = {35} color = "rgb(239 68 68)" />
            <p>
              Are you sure u want to delete this Account ?
            </p>
          </div>
          <div className="flex gap-5 mt-5 border-t border-[#f0f0f0] pt-3">
            <Button 
              type="white" 
              size="medium" 
              className="text-sm uppercase flex-1"
              handleClick = {() => setIsLogout(prevState => !prevState)}
            >
              cancel
            </Button>
            <Button  
              size="medium"
              handleClick={() => handleLogout()}
              className="text-sm uppercase flex-1"
            >
              logout
            </Button>
          </div>
        </div>
      </Modal2>

      <Modal 
        open={isMenuOpen} 
        onClose={handleClick} 
        position="left"
      >
        <div className="flex flex-col gap-4">
          <Search />
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="grid grid-cols-[80%_20%] text-xl font-bold"
              onClick={handleClick}
            >
              <h1>{link.text}</h1>
              <div className="flex justify-end">
                <img src={menuArrowRight} alt={link.to} />
              </div>
            </Link>
          ))}
        </div>
      </Modal>
    </>
  );
}
