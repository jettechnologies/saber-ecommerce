import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { DropdownIcon } from "@/icons/svg";

const UserLayout = () => {

    const location = useLocation();
    const paths:string[] = location.pathname.split("/").filter(Boolean);
    const currentPath = paths.at(-1)

    // let pathList;
    // if(currentPath === "profile"){
    //     pathList = <>
    //         <Link to = {`/user/${currentPath}`}>
    //             my profile
    //         </Link>
    //         <DropdownIcon stroke="#6C7275" className="h-3 w-3 -rotate-90" />
    //     </>

    //     return pathList
    // }
    // else if(currentPath === "orders"){
    //     pathList = <>
    //         <Link to = {`/user/${currentPath}`}>
    //             My orders
    //         </Link>
    //         <DropdownIcon stroke="#6C7275" className="h-3 w-3 -rotate-90" />
    //     </>

    //     return pathList;
    // }

  return (
    <section className="grid grid-rows-[auto_1fr] grid-cols-1 md:grid-cols-[auto_1fr] border-2 border-black w-full min-h-screen mt-4 md:gap-3">
        <div className="w-full py-10 pl-10 border-2 border-red-500 col-start-1 col-span-2 row-start-1 row-end-2">
            <ul className="w-fit flex gap-2 text-size-500 font-semibold text-text-black capitalize">
                <li className="flex items-center gap-2">
                <Link to = "/">
                    home
                </Link>
                <DropdownIcon stroke="#6C7275" className="h-3 w-3 -rotate-90" />
                </li>
                <li className="flex items-center gap-2" >
                    <Link to = {`/user/${currentPath}`}>
                        my {currentPath}
                    </Link>
                    <DropdownIcon stroke="#6C7275" className="h-3 w-3 -rotate-90" />
                </li>
            </ul>
        </div>
        <div id = "side-nav" className="h-full w-[280px] lg:w-[360px]  hidden md:flex border-2 border-green-500 row-start-2 row-span-2 col-start-1 col-span-1">
            <nav className="w-full h-full border-2 border-red-500 px-2">
                <ul className="flex flex-col">
                    <li className="w-full py-4 border border-gray">
                        <div className="flex gap-3">
                            
                        </div>
                    </li>
                    <li className=""></li>
                    <li className=""></li>
                </ul>
            </nav>
        </div>
        <div className="border-2 border-black row-start-2 row-span-2 md:col-start-2 col-span-1 max-sm:mt-3">
            <Outlet />
        </div>

    </section>
  )
}

export default UserLayout