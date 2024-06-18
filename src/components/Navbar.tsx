import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Modal from "./Modal";
import Search from "./Search";
import { routes } from "../config/router/paths";
import menuHamburger from "../assets/icons/menuHamburger.svg";
import menuArrowRight from "../assets/icons/menuArrowRight.svg";
import { SearchIcon, UserIcon } from "../icons/svg";
// import { useCartContext } from "@/context/cartContext";
// import { categoriesFetch } from "../services/categories";

interface Catergories{
  id: number;
  name: string;
  description: string;
  createdAT: string;
  updatedAT: string | null;
  banner: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [categories, setCategories] = useState<Catergories[] | []>([]);
  const location = useLocation();
  const currentUrl = location.pathname;
  // const [categories,getCategories, loading, error] = useCategories();

  useEffect(() =>{
    const getCategories = async () => {
      try {
        const res = await fetch("https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/fetch-all-product-categories");
        
        const data = await res.json();
        console.log(data[0])
        
        setCategories(data[0]);

        if (!res.ok) {
          console.log(res);
          return;
        }
      } catch (e : any) {
        console.log(e.message);
      }
    }
    
    getCategories();   
  }, []);


  // const { cartItems } = useCartContext();

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: routes.STORE, text: "Shop" },
    { to: routes.ABOUT, text: "About Us" },
  ];

  

  return (
    <>
      <header className="font-roboto max-h-[--header-height] z-[400] sticky top-0 left-0 px-8 flex py-4 justify-between place-items-center border-b-[1px] md:px-24 bg-white">
        <div className=" flex justify-start lg:hidden">
          <button onClick={handleClick}>
            <img src={menuHamburger} alt="open menu" />
          </button>
        </div>

        <Logo />

        <div className="hidden lg:flex justify-center">
          {/* {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex gap-8 text-size-500 font-semibold ${
                currentUrl.includes(link.to) ? "underline" : ""
              }`}
            >
              <h1>{link.text}</h1>
              <div className="flex justify-end"></div>
            </Link>
          ))} */}
          <ul className="flex gap-5 border- border-black">
            <li id = "shop" className="w-[20rem] relative">
              <Link
                to={"/store"}
                className={`flex gap-8 text-size-500 font-semibold`}
              >
                <h1>Shop</h1>
              </Link>
              <ul className="hidden flex-col absolute top-[3rem] bg-white w-[17rem] items-center left-0 z-[999]">
                {
                  categories.length > 0 && categories.map((category) => (
                    <li key = {category.name} className="py-4 text-text-black text-md capitalize">
                      <Link
                        to={"/store"}
                        className={`flex gap-8 text-size-500 font-semibold`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </li>
            <li>
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
            {/* <CartIcon className="w-5 h-5 text-white"/>
            {cartItems.length >0 && <div className="absolute top-0 right-0 w-5 h-5 rounded-full flex items-center justify-center bg-black text-white">
              <p className="text-size-400 font-normal ">{cartItems.length}</p>
            </div>} */}
          </Link>
          <div
            className={` ${
              currentUrl.includes("/auth/login")
                && "bg-gray"
            } p-2 rounded-lg cursor-pointer user-icon `}
          >
            <UserIcon className="w-5 h-5 "/>

            {/* user subNav */}
            <div className="shadow-md py-2 absolute top-[3.25rem] rounded-md right-16 z-[9999px] bg-gray hidden user-sub-nav">
              <ul className="flex flex-col px-4 py-2">
                <Link to = "/auth/login" className="w-full py-3 border-b">
                  <li className="text-text-black hover:text-blue font-normal text-size-500 capitalize w-[10rem]">
                    Sign in
                  </li>
                </Link>
                <Link to = "/" className="w-full py-3">
                  <li className="text-text-black hover:text-blue font-normal text-size-500 capitalize w-[10rem]">
                    my order
                  </li>
                </Link>
                <Link to = "/" className="w-full py-3">
                  <li className="text-text-black hover:text-blue font-normal text-size-500 capitalize w-[10rem]">
                    my account
                  </li>
                </Link>
                <Link to = "/" className="w-full py-3">
                  <li className="text-text-black hover:text-blue font-normal text-size-500 capitalize w-[10rem]">
                    my wishlist
                  </li>
                </Link>
                <Link to = "/auth/signout" className="w-full py-3 hidden border-t">
                  <li className="text-text-black hover:text-blue font-normal text-size-500 capitalize w-[10rem]">
                    Sign out
                  </li>
                </Link>
              </ul>
            </div>

          </div>
          
        </div>
      </header>

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
