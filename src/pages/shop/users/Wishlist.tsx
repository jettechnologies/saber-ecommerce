// import { useUserProfile } from "@/context/userProfileContext";
// import ProductCard from "@/components/ProductCard";
// import Spinner from "@/components/Spinner";

// const Wishlist = () => {

//   const { isLoading, error, user } = useUserProfile();

//   if(isLoading){
//     return <div className="w-full h-ful">
//       <Spinner />
//     </div>
//   }

//   if(error){
//     return <div className="w-full h-full">
//       <h2 className="text-size-600 text-text-black font-bold uppercase text-center">something when wrong while fetching the user....</h2>
//     </div>
//   }

//   return (
//     <div className="border-2 border-red-500 w-full h-full px-8 pt-8 lg:px-16">
//         <div className="flex justify-between">
//           {
//             user && user.favourites.map(favourite => (
//               <div className="w-[43.7vw] md:w-[30.5vw] lg:w-[20.8vw] xl:w-[22vw] h-[23rem]" key = {favourite.id}>
//                 <ProductCard product={favourite} tag={favourite.product.isOutOfStock} />
//               </div>
//             ))
//           }
//         </div>
//     </div>
//   )
// }

// export default Wishlist

const Wishlist = () => {
  return (
    <div>Wishlist</div>
  )
}

export default Wishlist