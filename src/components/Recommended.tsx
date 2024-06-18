// import { useEffect } from "react";
import useGetRequest from "@/hooks/useGetRequest";
import { CategoryTypeWithProduct } from "@/types";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";

interface RecommendedProps {
  categoryId:number;
  productId:number
}

const Recommended:React.FC<RecommendedProps> = ({ categoryId, productId }) => {
  // const { products, getProducts } = useProducts();
  
  const {data, loading, error} = useGetRequest<CategoryTypeWithProduct[]>(`https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/fetch-one-product-category-with-products/${categoryId}`)
  
  console.log(data, loading, error)
  const recommendedProducts = data[0]?.products.filter(product => product.id !== productId).slice(0,5)

  console.log(recommendedProducts)
  if(loading){
    return(
      <div className="w-full h-full">
        <Spinner />
      </div>)
  }

  if(recommendedProducts.length === 0){
    return(
      <div className="w-full h-full text-center">
        <p className="text-size-400 text-text-black font-normal">No similar product available</p>
      </div>)
  }


  // useEffect(() => {
  //   getProducts(1, "", product?.category);
  // }, [product]);

  return (
    <div className="flex flex-wrap gap-4">
      {recommendedProducts.map((product) => (
        <div className="w-[45%] lg:w-[30%] h-[20rem]">
          <ProductCard product={product}/>
        </div>
      ))}
    </div>
  );
};

export default Recommended;
