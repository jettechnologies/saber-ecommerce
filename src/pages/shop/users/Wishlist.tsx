import { useUserProfile } from "@/context/userProfileContext";
import ProductCard from "@/components/ProductCard";
import Spinner from "@/components/Spinner";
import notFoundIcon from "@/assets/icons/not_found_1.svg";
import Image from "@/components/Image";

const Wishlist = () => {

  const { isLoading, error, user } = useUserProfile();

  if(isLoading){
    return <div className="w-full h-ful">
      <Spinner />
    </div>
  }

  // if(error){
  //   return <div className="w-full h-full">
  //     <h2 className="text-size-600 text-text-black font-bold uppercase text-center">something when wrong while fetching the user....</h2>
  //   </div>
  // }

  console.log(user?.favourites)

  return (
    <div className="w-full h-full px-8 pt-8 pb-4 lg:px-16">
      <div className="px-6 pb-4 border-b border-[#c0c0c0] mb-8">
        <h4 className="text-sm lg:text-size-600 font-semibold uppercase">my wishlist</h4>
      </div>
        <div className="flex justify-around flex-wrap w-full gap-8">
          {
            user && user.favourites.length > 0 ? user.favourites.map(favourite => (
              <div className="w-full md:w-[30.5vw] lg:w-[25vw] xl:w-[29vw] h-[23rem]" key = {favourite.id}>
                <ProductCard product={favourite.product} tag={{
                  type: "neutral",
                  msg: favourite?.product?.isOutOfStock ? "out of stock" : "",
                }}/>
              </div>
            )) : <div className="w-full h-full grid place-items-center">
              <h2 className="text-size-600 text-text-black font-bold uppercase text-center">No item in your wishlist....</h2>
            </div>
          }

          {
            error && <div className="w-full h-screen grid place-items-center">
                <div className="w-full flex flex-col gap-y-6 items-center">
                  <Image src={notFoundIcon} alt = "not found icon" className="w-[250px] h-[200px] lg:w-[500px] lg:h-[400px]" />
                  <p className="text-text-black font-normal text-size-500 md:text-size-600 first-letter:uppercase text-center">
                    {error}
                  </p>
                </div>
              </div>
          }     
        </div>
    </div>
  )
}

export default Wishlist
