import { useParams } from "react-router";
import { useEffect, useState } from "react";
// import Spinner from "@/components/Spinner";
// import ImageCarousel from "@/components/ImageCarousell";
import Icon from "@/components/Icon";
import creditCard from "@/assets/icons/creditCard.svg";
import star from "@/assets/icons/star.svg";
import truck from "@/assets/icons/truck.svg";
import repeat from "@/assets/icons/repeat.svg";
import AddToCartBtn from "@/components/addToCartBtn";
// import Button from "@/components/Button";
import Section from "@/components/Section";
import Recommended from "@/components/Recommended";
import { Link } from "react-router-dom";
import { ProductType } from "@/types";
import Spinner from "@/components/Spinner";
import { IndianRupee } from "lucide-react";
import Button from "@/components/Button";
import { useCartContext } from "@/context/cartContext";

function Detail() {

  const { id } = useParams();
  const [data, setData] = useState<ProductType>()
  const [loading, setLoading] = useState(true);
  const { addVariantsToCart, productVariant } = useCartContext();

  console.log(productVariant)

  // const {data, loading, error} = useGetRequest<ProductType[]>(`https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/fetch-one-product/${id}`)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true)
        const response = await fetch(`https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/fetch-one-product/${id}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result: ProductType = await response.json();
        console.log(result)
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

  console.log(data)

  console.log(data, id)

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
      <div className="mx-4 md:mx-24">
        {data && (
          <div className="flex-row lg:flex gap-12">
            <div className="mx-[-1rem] grid place-items-center">
              {/* <ImageCarousel images={product.image} /> */}
              <img src={data.productImage} alt="product image" className="w-[60%] aspect-square object-contain"/>
            </div>

            <div>
              <div>
                <h2 className="text-icon font-medium text-lg mt-6 mb-7 first-letter:uppercase">
                    {data.category?.name}
                </h2>
                <h1 className="text-[#3C4242] font-semibold text-3xl uppercase">
                  {data.name}
                </h1>
                <div className="flex items-center gap-6 mt-[2.5rem] justify-center lg:justify-start">
                  <div className="w-[14rem]">
                    <AddToCartBtn product={data}/>
                  </div>
                  <div className="border-[#3C4242] border-[1px] rounded-lg px-10 py-3 flex gap-1 items-center">
                    <IndianRupee size={20} />
                    <h1 className="font-semibold text-lg text-[#3C4242]">
                      {data.price}
                    </h1>
                  </div>
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
                {(data.available_sizes && data.available_sizes !== "") && <div className="">
                  <h4 className="text-size-400 text-text-black font-medium uppercase mb-4">
                    Select size
                  </h4>
                  <div className="flex gap-4">
                    {data.available_sizes.split(",").map((size, index) =>(<div key = {index} className="w-full h-full">
                      <Button size="medium" type="white" className="font-medium capitalize" handleClick={() => addVariantsToCart("color", size)}>
                        {size}
                      </Button>
                    </div>))}
                  </div>
                  </div>}
                  {(data.available_colors && data.available_colors !== "") && <div >
                  <h4 className="text-size-500 text-text-black font-semibold uppercase mb-4">
                    Select color
                  </h4>
                  <div className="flex gap-4">
                    {data.available_colors.split(",").map((color, index) =>(<div key = {index} className="w-full h-full">
                      <Button size="medium" type="white" className="font-medium capitalize" handleClick={() => addVariantsToCart("color", color)}>
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
                <div className="flex items-center gap-3">
                  <Icon iconLink={truck} />
                  <h2 className="text-icon font-medium text-md">
                    Free Shipping
                  </h2>
                </div>
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
    </>
  );
}

export default Detail;


