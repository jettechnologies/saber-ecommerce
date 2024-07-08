import Select from "@/components/Select";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import { useUserProfile } from "@/context/userProfileContext";
import { UserProfile } from '@/types';
import { validateObject } from "@/utils/inputValidation";
import { useNavigate } from "react-router-dom";
import Modal2 from "@/components/Modal2";
import useApiRequest from "@/hooks/useApiRequest";
import { CircleAlert, BadgeCheck } from "lucide-react";
import { useAuth } from "@/context/authContext";

interface ProfileType{
  fullname: string;
  email: string;
  mobile: string;
  gender: string;
  // postal_code: string;
  home_address: string;
  cityOfResidence: string;
  Nationality: string;
}

const Nationalities: {key:string; value:string}[] = [
  { "key": "united states", "value": "United States" },
  { "key": "china", "value": "China" },
  { "key": "india", "value": "India" },
  { "key": "brazil", "value": "Brazil" },
  { "key": "russia", "value": "Russia" },
  { "key": "nigeria", "value": "Nigeria" },
  { "key": "japan", "value": "Japan" },
  { "key": "germany", "value": "Germany" },
  { "key": "united kingdom", "value": "United Kingdom" },
  { "key": "france", "value": "France" },
  { "key": "egypt", "value": "Egypt" },
  { "key": "south africa", "value": "South Africa" },
  { "key": "australia", "value": "Australia" },
  { "key": "canada", "value": "Canada" },
  { "key": "mexico", "value": "Mexico" },
  { "key": "saudi arabia", "value": "Saudi Arabia" },
  { "key": "argentina", "value": "Argentina" },
  { "key": "italy", "value": "Italy" },
  { "key": "spain", "value": "Spain" },
  { "key": "indonesia", "value": "Indonesia" }
]

const EditAccount = () => {

  const { user:currentUser, updateUserProfile } = useUserProfile();
  console.log(currentUser)
  const navigate = useNavigate();
  const { token } = useAuth();
  const { response, error, loading, makeRequest } = useApiRequest<UserProfile, ProfileType>({
    method: "PATCH",
  });
  const [feedback, setFeedBack] = useState<{msg:string, type:string, status:boolean}>({
    msg: "",
    type: "",
    status: false,
  });
  const mapData = (originalData: UserProfile | null): ProfileType => {
    return {
      fullname: originalData?.fullname || "",
      email: originalData?.email || "",
      mobile: originalData?.mobile || "",
      gender: originalData?.gender || "",
      home_address: originalData?.home_address || "",
      cityOfResidence: originalData?.cityOfResidence || "",
      Nationality: originalData?.Nationality || "",
    };
  };
  // const reducedInfo:ProfileType = mapData(currentUser);
  // console.log(currentUser, reducedInfo);
  const [profile, setProfile] = useState<ProfileType>(() => mapData(currentUser));

  console.log(profile)

  // to update the profile incase the currentuser object changes
  useEffect(() => {
    setProfile(mapData(currentUser));
  }, [currentUser]);

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const { name, value } = target;

    setProfile({ ...profile, [name]: value });
}


const updateProfile = async(e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    validateObject(profile);
  } catch (error) {
    console.log(error);
    return;
  }

  const data = {
    fullname: profile.fullname.trim(),
    email: profile.email,
    mobile: profile.mobile,
    gender: profile.gender,
    home_address: profile.home_address,
    cityOfResidence: profile.cityOfResidence,
    Nationality: profile.Nationality,
  }
  const url = "profile-mgt/edit-user-profile";
  const headers:HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
} 

console.log(data);

  try{
    await makeRequest(data, url, headers);
  }
  catch(e){
    console.log((e as Error).message);
  }
}

useEffect(() =>{
  if(response){
    setFeedBack({
      msg: "Profile updated successfully",
      type: "success",
      status: true,
    });
  }
  else if(error){
    setFeedBack({
      msg: "Profile not updated successfully",
      type: "failed",
      status: true,
    });
  }
}, [response, error]);

// function to update the user state in the goobal context
const handleUpdateProfile = () =>{
  if(!currentUser) return;

  const changes = Object.entries(profile).filter(([key, value]) => currentUser[key as keyof UserProfile] !== value);

  changes.forEach(([key, value]) => {
    console.log(key, value)
    updateUserProfile(key, value);
  });

  navigate("/user", {replace: true, state: {reload:true}});
}

console.log(response, feedback)

  return (
    <>
    <div className="w-full h-full px-8 pt-8">
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-text-black dark:text-white">Update profile</h2>
            <form onSubmit={updateProfile}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                    <div className="sm:col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-text-black dark:text-white">Fullname</label>
                        <input 
                          type="text" 
                          name="fullname" 
                          id="name" 
                          onChange={handleInputChange}
                          className="bg-gray-50 border border-[#c0c0c0] text-text-black capitalize text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                          value={profile.fullname} placeholder="Enter fullname" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-text-black dark:text-white">Email</label>
                        <input 
                          type="email" 
                          name="email" 
                          id="email" 
                          onChange={handleInputChange}
                          className="bg-gray-50 border border-[#c0c0c0] text-text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                          value={profile.email}
                          placeholder="Enter email" 
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-text-black dark:text-white">Mobile</label>
                        <input 
                          type="text" 
                          name="mobile" 
                          id="mobile" 
                          value = {profile.mobile}
                          onChange={handleInputChange}
                          className="bg-gray-50 border border-[#c0c0c0] text-text-black text-sm rounded-lg block w-full p-2.5 dark:text-white "  
                          placeholder="Enter a valid mobile number" 
                        />
                    </div>
                    <div>
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-text-black dark:text-white">Gender</label>
                        <div className="w-full h-full">
                          <Select 
                            id = "gender" 
                            name="gender" 
                            className="w-full border border-[#c0c0c0]" 
                            defaultText="gender"
                            handleInputChange={handleInputChange} 
                            select={[{key: "male", value: "male"}, {key: "female", value: "female"}, {key: "undefined", value: "rather not say"}]}/>
                      </div>
                    </div>
                    <div>
                        <label htmlFor="nationality" className="block mb-2 text-sm font-medium text-text-black dark:text-white">Gender</label>
                        <div className="w-full h-full">
                          <Select 
                            id = "nationality" 
                            name="Nationality" 
                            value={profile.Nationality}
                            className="w-full border border-[#c0c0c0]" 
                            defaultText="nationality"
                            handleInputChange={handleInputChange} 
                            select={Nationalities}/>
                      </div>
                    </div>
                    {/* <div className="sm:col-span-2">
                        <label htmlFor="postal_code" className="block mb-2 text-sm font-medium text-text-black dark:text-white">Postal code</label>
                        <input 
                          type="text" 
                          name="postal_code" 
                          id="postal_code" 
                          value={profile.postal_code}
                          onChange={handleInputChange}
                          className="bg-gray-50 border border-[#c0c0c0] text-text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  
                          placeholder="Eg. 2109201" 
                        />
                    </div>  */}
                    <div className="sm:col-span-2">
                        <label htmlFor="home_address" className="block mb-2 text-sm font-medium text-text-black dark:text-white">Home address</label>
                        <input 
                          type="text" 
                          name="home_address" 
                          id="home_address" 
                          value={profile.home_address}
                          onChange={handleInputChange}
                          className="bg-gray-50 border border-[#c0c0c0] text-text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  
                          placeholder="Eg. 28 road, london street" 
                        />
                    </div> 
                    <div className="sm:col-span-2">
                        <label htmlFor="city_of_residence" className="block mb-2 text-sm font-medium text-text-black dark:text-white">Resident city</label>
                        <input 
                          type="text" 
                          name="cityOfResidence" 
                          id="city_of_residence" 
                          value ={profile.cityOfResidence}
                          onChange={handleInputChange}
                          className="bg-gray-50 border border-[#c0c0c0] text-text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  
                          placeholder="Eg. Chicago or London" 
                        />
                    </div>
                </div>
                <div className="">
                    <Button size="medium" className="text-size-500 font-medium uppercase text-white w-full">
                        {loading ? "Loading..." :  "Update profile"}
                    </Button>
                </div>
            </form>
        </div>
      </section>
    </div>

    {/* modal 2 for success mesage or error message */}
    <Modal2 isOpen = {feedback.status} handleModalClose = {()=> setFeedBack({...feedback, status: !feedback.status})}>
        <div className="flex flex-col w-full ">
          <div className="flex items-center gap-3">
            {/* <MessageSquareWarning size = {35} color = "rgb(239 68 68)"/> */}
            {feedback.type === "failed" ? <CircleAlert size = {35} color = "rgb(239 68 68)" />
              : feedback.type === "success" && <BadgeCheck size = {35} color = "rgb(34 197 94 )"/>}
            <p>
              {
                feedback.type === "failed" ? feedback.msg : 
                feedback.type === "success" && feedback.msg
              }
            </p>
          </div>
          <div className="mt-5 border-t border-[#f0f0f0] pt-3">
            {feedback.type === "success" ?<Button  
              size="medium"
              handleClick={handleUpdateProfile}
              className="text-sm uppercase w-full"
            >
              Continue to profile
            </Button> : feedback.type === "failed" && <Button  
              size="medium"
              handleClick={() => {
                navigate("/user/edit-account", {replace: true});
              }}
              className="text-sm uppercase w-full"
            >
              Retry profile update
            </Button>}
          </div>
        </div>
      </Modal2>
    </>
  )
}

export default EditAccount
