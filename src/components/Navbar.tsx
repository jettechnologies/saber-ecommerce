import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Modal from "./Modal";
import Search from "./Search";
import { routes } from "../config/router/paths";
import menuHamburger from "../assets/icons/menuHamburger.svg";
import menuArrowRight from "../assets/icons/menuArrowRight.svg";
import { SearchIcon, UserIcon } from "../icons/svg";
import { useCartContext } from "@/context/cartContext";
import { CartIcon } from "../icons/svg";
import { useProductCatergories } from "@/context/productCatergoriesContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const location = useLocation();
  const currentUrl = location.pathname;

  const { cartItems } = useCartContext();
  const { categories } = useProductCatergories();

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: routes.STORE, text: "Shop" },
    { to: routes.ABOUT, text: "About Us" },
  ];

  

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
