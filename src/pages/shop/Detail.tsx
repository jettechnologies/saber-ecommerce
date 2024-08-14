// trying with loading skeleton
import { useParams } from "react-router";
import { useEffect, useMemo, useState, useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import Icon from "@/components/Icon";
import creditCard from "@/assets/icons/creditCard.svg";
import star from "@/assets/icons/star.svg";
import repeat from "@/assets/icons/repeat.svg";
import AddToCartBtn from "@/components/addToCartBtn";
import Section from "@/components/Section";
import Recommended from "@/components/Recommended";
import { Link, useNavigate } from "react-router-dom";
import { ProductType } from "@/types";
// import Spinner from "@/components/Spinner";
import { IndianRupee, ShoppingBag, CircleAlert, Heart } from "lucide-react";
import Button from "@/components/Button";
import { useCartContext } from "@/context/cartContext";
import { useAuth } from "@/context/authContext";
import Modal2 from "@/components/Modal2";
import { useUserProfile } from "@/context/userProfileContext";
import Toast from "@/components/Toast";

function Detail() {
  const { id } = useParams();
  const { user: userProfile, addToFavourite } = useUserProfile();
  const [data, setData] = useState<ProductType>();
  const [loading, setLoading] = useState(true);
  const { addVariantsToCart, productVariant } = useCartContext();
  const { token, isLogin } = useAuth();
  const [message, setMessage] = useState<{ msg: string, type: "success" | "danger" | "warning" }>({
    msg: "",
    type: "success",
  });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const isFavorite = useMemo(() => {
    if (!userProfile || !userProfile.favourites || !id) return false;
    return userProfile.favourites.some(favorite => favorite.product?.id === parseInt(id, 10));
  }, [userProfile, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/fetch-one-product/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result: ProductType = await response.json();
        setData(result);
      } catch (err) {
        console.log((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const addProductToFav = useCallback(async (productId: number) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(`https://sagar-e-commerce-backend.onrender.com/api/v1/sagar_stores_api/browse/add-product-to-favourite/${productId}`, {
        method: "POST",
        headers: headers,
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result: any = await response.json();
      setMessage({ msg: result.message, type: "success" });
      const favourite = {
        createdAt: result?.like?.createdAt,
        product: result?.like?.product,
      }
      addToFavourite(favourite);
    } catch (err) {
      setMessage({ msg: "Failed to add to favorites.", type: "danger" });
    }
  }, [token, addToFavourite]);

  useEffect(() => {
    let messageRemoval: ReturnType<typeof setTimeout>;
    if (message) {
      messageRemoval = setTimeout(() => {
        setMessage({ msg: "", type: "success" });
      }, 2000);
    }
    return () => clearTimeout(messageRemoval);
  }, [message]);

  if (loading) {
    return (
      <div className="w-full h-full px-4 md:px-24 mt-10">
        <div className="flex-row lg:flex gap-12 py-6">
          <div className="w-full lg:w-1/2">
            <Skeleton height={650} />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col gap-5 w-full border-b-2 border-gray pb-5">
              <Skeleton width={200} height={30} />
              <Skeleton height={40} />
              <div className="flex w-full gap-5">
                <Skeleton width={200} height={40} />
                <Skeleton width = {150} height={40} />
              </div>
            </div>
            <div className="w-full py-5 border-b-2 border-gray">
              <Skeleton width={200} height={30} />
              <Skeleton height={140} className="mt-3"/>
            </div>
            <div className="w-full py-5 border-b-2 border-gray">
              <Skeleton width={200} height={40} />
              <div className="flex gap-5 mt-3">
                <Skeleton width = {150} height={40} />
                <Skeleton width = {150} height={40} />
              </div>
            </div>
            <div className="py-5">
              <Skeleton height={100} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center text-center mx-4 lg:mx-24">
        <h1>
          The product you tried to reach does not exist, please search another one.
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
            <div className="w-full lg:w-1/2 py-4">
              <img src={data.productImage} alt="product image" className="w-full h-full object-cover" />
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
                        <AddToCartBtn productId={data.id} />
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
                    <Link to="/auth/login">
                      <div className={`w-10 h-10 rounded-full shadow-md bg-gray grid place-items-center`}>
                        <Heart size={25} />
                      </div>
                    </Link>
                  ) : (
                    <button
                      disabled={isFavorite}
                      className={`w-10 h-10 rounded-full shadow-md bg-gray grid place-items-center cursor-pointer ${isFavorite && "text-yellow"}`}
                      onClick={() => addProductToFav(data.id)}
                    >
                      {isFavorite ? <Heart size={25} fill="rgb(255 201 92)" /> : <Heart size={25} />}
                    </button>
                  )}
                </div>
              </div>
              <hr className="my-6" />
              <Section title="Description">
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
                    {data.available_sizes.split(",").map((size, index) => (<div key={index} className="w-full h-full">
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
                {(data.available_colors && data.available_colors !== "") && <div>
                  <h4 className="text-size-500 text-text-black font-semibold uppercase mb-4">
                    Select color
                  </h4>
                  <div className="flex gap-4 flex-wrap">
                    {data.available_colors.split(",").map((color, index) => (<div key={index} className="w-fit h-fit">
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
                  <Icon iconLink={repeat} />
                  <h2 className="text-icon font-medium text-md">
                    Free Returns
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-16">
          <Section title="Similar Products">
            <div className="mt-4">
              <Recommended productId={data.id} categoryId={data?.category?.id} />
            </div>
          </Section>
        </div>
      </div>
      {/* {message.msg !== "" && <div className="absolute top-[5rem] left-[4rem] w-[20rem] h-[4rem] first-letter:capitalize">
        <Notification type={message.type} className="text-white" message={message.msg} />
      </div>} */}
      <Modal2 isOpen={isOpen} handleModalClose={() => setIsOpen(prevState => !prevState)}>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-3">
            <CircleAlert size={35} color="rgb(255 201 92)" />
            <p>
              Please Login before carting!
            </p>
          </div>
          <div className="flex gap-5 mt-5 border-t border-[#f0f0f0] pt-3">
            <Button
              size="medium"
              handleClick={() => {
                navigate("/auth/login", { replace: true });
              }}
              className="text-sm uppercase flex-1"
            >
              login
            </Button>
          </div>
        </div>
      </Modal2>

      {/* toast component */}
      <Toast message={message.msg} type="success" />

    </>
  );
}

export default Detail;