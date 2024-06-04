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
      <header className="max-h-[--header-height] px-8 flex py-4 justify-between place-items-center border-b-[1px] md:px-24 bg-white">
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
                ? "bg-icon text-white"
                : "bg-gray-200 text-secondary"
            } p-2 rounded-lg`}
          >
            <CartIcon className="w-5 h-5 text-white"/>
          </Link>
          <Link
            to={"/auth/signup"}
            className={` ${
              currentUrl.includes("cart")
                ? "text-white"
                : "bg-gray-200 text-secondary"
            } p-2 rounded-lg`}
          >
            <UserIcon className="w-5 h-5 "/>
          </Link>

          {/* user subNav */}
          {/* <div className="border-2 border-black py-4 absolute top-10 right-4 z-[9999px]">
            <ul className="flex flex-col px-4 py-2">
              <Link to = "/auth/signin" className="w-full py-3">
                <li className="text-text-black hover:text-blue font-medium text-size-500 capitalize w-[10rem]">
                  signin
                </li>
              </Link>
              <Link to = "/auth/signin" className="w-full py-3">
                <li className="text-text-black hover:text-blue font-medium text-size-500 capitalize w-[10rem]">
                  signin
                </li>
              </Link>
              <Link to = "/auth/signin" className="w-full py-3">
                <li className="text-text-black hover:text-blue font-medium text-size-500 capitalize w-[10rem]">
                  signin
                </li>
              </Link>
              <Link to = "/auth/signin" className="w-full py-3">
                <li className="text-text-black hover:text-blue font-medium text-size-500 capitalize w-[10rem]">
                  signin
                </li>
              </Link>
            </ul>
          </div> */}
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
