import { Outlet } from "react-router-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DropdownIcon } from "@/icons/svg";
import { ImageUp, BadgeCheck, CircleAlert } from "lucide-react" 
import { useUserProfile } from "@/context/userProfileContext";
import Image from "@/components/Image";
import { useCallback, useState } from "react";
import { useAuth } from "@/context/authContext";
import Modal2 from "@/components/Modal2";
import Button from "@/components/Button";
import { isNativePlatform } from "@/utils/platform";


const UserLayout = () => {

    const isNative = isNativePlatform();
    const location = useLocation();
    const paths:string[] = location.pathname.split("/").filter(Boolean);
    const currentPath = paths.at(-1);
    const navigate = useNavigate();

    const { user } = useUserProfile();
    const { token } = useAuth();
    const [response, setResponse] = useState("");
    const [resError, setResError] = useState("");
    const [isOpen,setIsOpen] = useState(false);

    const imageValidate = (imageArr: File[]) =>{
        // always pass the imageArr asan array;
    
        const allowedExtensions = /\.(jpg|jpeg|png|svg)$/i;
        let isValid = true;
    
        imageArr.forEach(file => {
            const fileSize = parseInt((file.size / 1048576).toFixed(2))
    
            if (!allowedExtensions.test(file.name)) {
                alert("Invalid file type. Only jpg, jpeg, png, and svg files are allowed.");
                isValid = false;
                return;
            }
            else if(fileSize > 6){
                alert("File to bigger than 6mb");
                console.log("file to big");
                isValid = false;
                return;
            }   
        })  
        return isValid;
    }

    const handleImgUpload = useCallback(async(e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const formData = new FormData();
        const { files } = target;
    
        if (!files || files.length === 0) {
          return;
        }
    
        const imgArr = Array.from(files);
        const validate = imageValidate(imgArr);
    
        if (!validate) {
          console.log("the validation failed");
    
          return;
        }

        const profilePic = imgArr[0];
        console.log(profilePic)

        formData.append("profilePics", profilePic);
        console.log(formData)
        try {
            const res = await fetch(
                "https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/profile-mgt/upload-profile-pics",
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );
    
            if (res.ok) {
                setResponse('Profile image uploaded successfully');
                setIsOpen(prevState => !prevState);
            } else {
                const errorData = await res.json();
                console.error('Failed to create product:', errorData.message);
                // setResError('Failed to create product: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error:', (error as Error).message);
            setResError('Failed to uploaded profile image');
            setIsOpen(prevState => !prevState);
        }

    }, [token]);

  return (
    <>
        <section className="grid grid-rows-[auto_1fr] grid-cols-1 md:grid-cols-[auto_1fr] w-full min-h-screen md:gap-3">
        {(!isNative || (isNative && currentPath?.includes("profile"))) && (
            <div className="w-full p-10 border-b border-[#c0c0c0] col-start-1 col-span-2 row-start-1 row-end-2 flex justify-between">
                <ul className="w-fit flex gap-2 text-size-500 font-semibold text-text-black capitalize">
                <li className="flex items-center gap-2">
                    <Link to="/">
                    home
                    </Link>
                    <DropdownIcon stroke="#6C7275" className="h-3 w-3 -rotate-90" />
                </li>
                <li className="flex items-center gap-2">
                    <Link to={`/user/${currentPath}`}>
                    my {currentPath}
                    </Link>
                    <DropdownIcon stroke="#6C7275" className="h-3 w-3 -rotate-90" />
                </li>
                </ul>
                {user && (
                <div id="edit_user_div" className="w-[3rem] h-[3rem] rounded-full relative">
                    {user?.profile_picture ? (
                    <Image 
                        src={user?.profile_picture} 
                        alt="profile image"
                        className="w-[3rem] h-[3rem] rounded-full"  
                    />
                    ) : (
                    <p className="text-size-600 uppercase text-white bg-black text-center flex items-center justify-center w-full h-full rounded-full border">
                        {user?.fullname.split(" ")[0].substring(0, 1)}
                    </p>
                    )}
                    <label 
                    htmlFor="edit_user_img" 
                    id="edit_user_img"
                    className="hidden bg-black z-80 absolute top-[0.25rem] left-[0.25rem] items-center justify-center w-[2.5rem] h-[2.5rem] rounded-full cursor-pointer"
                    >
                    <ImageUp size={20} color="#fff" />
                    <input 
                        type="file" 
                        id="edit_user_img" 
                        onChange={handleImgUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    </label>
                </div>
                )}
            </div>
            )}

        <div id = "side-nav" className="h-full w-[280px] lg:w-[360px] border-r border-[#c0c0c0] hidden md:flex row-start-2 row-span-2 col-start-1 col-span-1" >
            <nav className="w-full h-full px-6">
                <ul className="flex flex-col py-4">
                    <li className="w-full py-4  mb-4">
                        <div className="flex gap-3 flex-col">
                            <h4 className="text-size-500 lg:text-size-600 text-text-black font-semibold capitalize">
                                Transaction management
                            </h4>
                            <hr className="mb-2 border-[#c0c0c0]"/>
                            <Link to = "/user/orders" className="text-sm capitalize font-normal text-black">my orders</Link>
                        </div>
                    </li>
                    <li className="mt-4">
                        <div className="flex gap-3 flex-col">
                            <h4 className="text-size-500 lg:text-size-600 text-text-black font-semibold capitalize">
                                Account
                            </h4>
                            <hr className="mb-2 border-[#c0c0c0]"/>
                            <Link to = "/user/profile" className="text-sm capitalize font-normal text-black">Personal information</Link>
                            <Link to = "/user/wishlist" className="text-sm capitalize font-normal text-black">my wish</Link>
                        </div>
                    </li>
                    <li className=""></li>
                </ul>
            </nav>
        </div>
        <div className="row-start-2 row-span-2 md:col-start-2 col-span-1 max-sm:mt-3 min-h-full">
            <Outlet />
        </div>

    </section>

    {/* For showing success message or error message */}
    <Modal2 isOpen={isOpen} handleModalClose={() => setIsOpen(prevState => !prevState)}>
        <div className="flex flex-col w-full">
            <div className="flex items-center gap-3">
                {/* <MessageSquareWarning size = {35} color = "rgb(239 68 68)"/> */}
                {resError !== "" ? <CircleAlert size = {35} color = "rgb(255 201 92)" /> : 
                    response !== "" && <BadgeCheck size = {35} color = "rgb(34 197 94)"/>
                }

                {response !== "" ?<p>
                    {response}
                </p> 
                : resError !== "" && <p>
                    {response}
                </p>
                }
            </div>
            <div className="flex gap-5 mt-5 border-t border-[#f0f0f0] pt-3">
                {response !== "" ?
                <Button
                    btnType="button"
                    size="medium"
                    handleClick={() => {
                    // navigate("/auth/login", {replace: true});
                        window.location.reload();
                    }}
                    className="text-sm uppercase flex-1"
                >
                    Back to profile
                </Button>
                    : resError !== "" && 
                    <Button
                    btnType="button"  
                    size="medium"
                    handleClick={() => {
                    navigate("/user/profile", {replace: true});
                        // window.location.reload();
                    }}
                    className="text-sm uppercase flex-1"
                >
                    retry again
                </Button>    
            }
            </div>
        </div>
    </Modal2>
    </>
  )
}

export default UserLayout