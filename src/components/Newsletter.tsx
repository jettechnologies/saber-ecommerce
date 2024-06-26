import Button from "@/components/Button";
import { Bell } from "lucide-react"

const Newsletter = () => {
  return (
    <div className="mt-14 bg-gray px-8">
        <div className="w-full flex flex-col items-center py-8">
            <h3 className="text-size-600 text-text-black uppercase">
                newsletter
            </h3>
            <p className="mt-6 mb-3 text-size-500 text-[#a0a0a0] text-center">
                Join our newsletter for the latest theGearMates deals and updates.
            </p>
            <form>
                <div className = "w-fit flex items-center p-1 border border-black focus-within:border-blue focus-within:border-2 rounded-md">
                    <input type="text" 
                        placeholder="Enter email address"
                        className="w-[16rem] md:w-[60vw] lg:w-[35vw] h-10 border-none outline-none text-text-black bg-transparent pl-2"
                    />
                    <Button size="small">
                        <Bell size = {30} color = "#fff" />
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Newsletter