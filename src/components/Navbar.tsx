import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Modal from "./Modal";
import Search from "./Search";
import { routes } from "../config/router/paths";
import menuHamburger from "../assets/icons/menuHamburger.svg";
import menuArrowRight from "../assets/icons/menuArrowRight.svg";
import { CartIcon, SearchIcon, UserIcon } from "../icons/svg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const location = useLocation();
  const currentUrl = location.pathname;

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: routes.STORE, text: "Shop" },
    { to: routes.ABOUT, text: "About Us" },
  ];

  return (
    <>
      <header className="max-h-[--header-height] px-8 flex py-4 justify-between place-items-center border-b-[1px] md:px-24 bg-white z-[999] sticky top-0 left-0">
        <div className=" flex justify-start lg:hidden">
          <button onClick={handleClick}>
            <img src={menuHamburger} alt="open menu" />
          </button>
        </div>

        <Logo />

        <div className="hidden lg:flex justify-center">
          {navLinks.map((link) => (
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
          ))}
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
            } p-2 rounded-lg`}
          >
            <CartIcon className="w-5 h-5 text-white"/>
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
