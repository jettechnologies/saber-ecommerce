import { useParams } from "react-router";
import { useEffect, useState } from "react";
// import Spinner from "@/components/Spinner";
// import ImageCarousel from "@/components/ImageCarousell";
import Icon from "@/components/Icon";
import creditCard from "@/assets/icons/creditCard.svg";
import star from "@/assets/icons/star.svg";
import repeat from "@/assets/icons/repeat.svg";
import AddToCartBtn from "@/components/addToCartBtn";
// import Button from "@/components/Button";
import Section from "@/components/Section";
import Recommended from "@/components/Recommended";
import { Link, useNavigate } from "react-router-dom";
import { ProductType } from "@/types";
import Spinner from "@/components/Spinner";
import { IndianRupee, ShoppingBag, CircleAlert } from "lucide-react";
import Button from "@/components/Button";
import { useCartContext } from "@/context/cartContext";
import { Heart } from "lucide-react";
import { useAuth } from "@/context/authContext";
// import useApiRequest from "@/hooks/useApiRequest";
import { useCallback } from "react";
import Notification from "@/components/Notification";
import Modal2 from "@/components/Modal2";

function Detail() {

  const { id } = useParams();
  const [data, setData] = useState<ProductType>()
  const [loading, setLoading] = useState(true);
  const { addVariantsToCart, productVariant } = useCartContext();
  const { token, isLogin } = useAuth();
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // const [favorites, setFavorites] = useState<FavoriteProductType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true)
        const response = await fetch(`https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/fetch-one-product/${id}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result: ProductType = await response.json();
        setData(result);
      } catch (err) {
        console.log(err)
      } 
      finally{
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const addProductToFav = useCallback(async (productId: number) => {
    console.log(productId);
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    try {
      setMessage("Adding to favorites...");
      const response = await fetch(`https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/add-product-to-favourite/${productId}`, {
        method: "POST",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result: any = await response.json();
      console.log(result.message);
      setMessage(result.message);
    } catch (err) {
      console.log(err);
      setMessage("Failed to add to favorites.");
    }
  }, [token]);


  console.log(message); 

  // console.log(response, error);

  if(loading){
    return <div className="w-full h-full border-2">
      <Spinner />
    </div>
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center text-center mx-4 lg:mx-24">
        <h1>
          The product you tried to reach does not exist, please search another
          one.
        </h1>

        <Link
          to="/store"
          className="w-full lg:w-[50%] mt-6 bg-main flex items-center justify-center text-lg text-white px-10 py-3 gap-3 font-semibold rounded-lg hover:scale-110 transition-transform"
        >
          <button className="flex items-center gap-2">Shop</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mx-4 md:mx-24 relative">
        {data && (
          <div className="flex-row lg:flex gap-12">
            <div className="grid place-items-center w-full lg:w-1/2">
              {/* <ImageCarousel images={product.image} /> */}
              <img src={data.productImage} alt="product image" className="w-[60%] aspect-[9/16] md:aspect-square object-contain"/>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="flex gap-x-4">
                  <div className="flex-1">
                    <h2 className="text-icon font-medium text-lg mt-6 mb-7 first-letter:uppercase">
                      {data.category?.name}
                    </h2>
                    <h1 className="text-[#3C4242] font-semibold text-3xl uppercase">
                      {data.name}
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-6 mt-[2.5rem] justify-center lg:justify-start">
                      <div className="w-full md:w-[16rem] xl:w-[25rem] max-sm:order-2">
                        {isLogin ? 
                          <AddToCartBtn productId={data.id}/>
                          : <Button size="medium" className="flex items-center justify-center gap-x-6 w-full text-size-500 text-white" handleClick={() => setIsOpen(prevState => !prevState)}>
                              <ShoppingBag color="#fff" />
                              Add to Cart
                            </Button>}
                      </div>
                      <div className="border-[#3C4242] border-[1px] max-sm:order-1 rounded-lg px-10 py-3 w-fit flex gap-1 items-center">
                        <IndianRupee size={20} />
                        <h1 className="font-semibold text-lg text-[#3C4242]">
                          {data.price}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="w-fit h-fit mt-6 mr-6">
                    {!isLogin ? (
                      <Link to = "/auth/login">
                        <div className="w-10 h-10 rounded-full shadow-md bg-gray grid place-items-center">
                          <Heart size = {25}/>
                        </div>
                      </Link>
                    ) : (
                      <div 
                        className="w-10 h-10 rounded-full shadow-md bg-gray grid place-items-center cursor-pointer"
                        onClick={() => addProductToFav(data.id)}
                      >
                          <Heart size = {25}/>
                      </div>
                    )}
                </div>
              </div>

              <hr className="my-6" />

              {/* Description */}

              <Section title="Description" >
                <div className="mt-4">
                  <p className="font-normal text-size-500 text-text-black first-letter:uppercase">{data.description}</p>
                </div>
              </Section>

              <hr className="my-6" />

              <section className="w-full flex flex-col">
                {(data.available_sizes && data.available_sizes !== "") && <div className="mb-8">
                  <h4 className="text-size-500 text-text-black font-semibold uppercase mb-4">
                    Select size
                  </h4>
                  <div className="flex gap-4 flex-wrap">
                    {data.available_sizes.split(",").map((size, index) =>(<div key = {index} className="w-full h-full">
                      <Button 
                        size="medium" 
                        type="white" 
                        className={`font-medium capitalize ${productVariant.size === size && "border border-blue text-blue"}`} 
                        handleClick={() => addVariantsToCart("size", size)}>
                        {size}
                      </Button>
                    </div>))}
                  </div>
                  </div>}
                  {(data.available_colors && data.available_colors !== "") && <div >
                  <h4 className="text-size-500 text-text-black font-semibold uppercase mb-4">
                    Select color
                  </h4>
                  <div className="flex gap-4 flex-wrap">
                    {data.available_colors.split(",").map((color, index) =>(<div key = {index} className="w-fit h-fit">
                      <Button 
                        size="medium" 
                        type="white" 
                        className={`font-medium capitalize ${productVariant.color === color && "border border-blue text-blue"}`}  
                        handleClick={() => addVariantsToCart("color", color)}>
                        {color}
                      </Button>
                    </div>))}
                  </div>
                  </div>}
              </section>

              <hr className="my-6" />       
              {/* Assurances */}

              <div className="grid grid-cols-2 gap-5 justify-items-left">
                <div className="flex items-center gap-3">
                  <Icon iconLink={creditCard} />
                  <h2 className="text-icon font-medium text-md">
                    Secure Payment
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <Icon iconLink={star} />
                  <h2 className="text-icon font-medium text-md">Fit for You</h2>
                </div>
                {/* <div className="flex items-center gap-3">
                  <Icon iconLink={truck} />
                  <h2 className="text-icon font-medium text-md">
                    Free Shipping
                  </h2>
                </div> */}
                <div className="flex items-center gap-3">
                  <Icon iconLink={repeat} />
                  <h2 className="text-icon font-medium text-md">
                    Free Returns
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Recomendations */}
        <div className="mt-16">
          <Section title="Similar Products">
            <div className="mt-4">
              <Recommended productId={data.id} categoryId = {data.category.id} />
            </div>
          </Section>
        </div>
      </div>

      {message !== "" && <div className="absolute top-[5rem] left-[4rem] w-[20rem] h-[4rem] first-letter:capitalize">
          <Notification type = "success" className="text-white" message = {message}/>
      </div> }

      {/* For telling guest users to login */}
      <Modal2 isOpen={isOpen} handleModalClose={() => setIsOpen(prevState => !prevState)}>
            <div className="flex flex-col w-full">
                <div className="flex items-center gap-3">
                    {/* <MessageSquareWarning size = {35} color = "rgb(239 68 68)"/> */}
                    <CircleAlert size = {35} color = "rgb(255 201 92)" />
                    <p>
                        Please Login before carting!
                    </p>
                </div>
                <div className="flex gap-5 mt-5 border-t border-[#f0f0f0] pt-3">
                    <Button  
                        size="medium"
                        handleClick={() => {
                          navigate("/auth/login", {replace: true});
                         }}
                        className="text-sm uppercase flex-1"
                    >
                      login
                    </Button>
                </div>
            </div>
        </Modal2>
    </>
  );
}

export default Detail;


