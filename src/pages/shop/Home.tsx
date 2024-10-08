import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Carrousel from "@/components/Carrousel";
import heroImg from "@/assets/images/hero.png";
import headphoneImg from "@/assets/images/headsets.png";
import earpodImg from "@/assets/images/earpods.webp";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { Truck, Banknote, LockKeyhole,Phone } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Promo from "@/components/Promo";
import ProductSlider from "@/components/ProductSlider";
import { useProductCatergories } from "@/context/productCatergoriesContext";
import { useEffect, useMemo, useState } from "react";
import Spinner from "@/components/Spinner";
import { ProductType } from "@/types";
import useGetRequest from "@/hooks/useGetRequest";
import { useAuth } from "@/context/authContext";  
import banner_one from "@/assets/images/banners/banner1.webp";
import banner_two from "@/assets/images/banners/banner2.webp";
import banner_three from "@/assets/images/banners/banner3.webp";
import { differenceInSeconds, formatDuration, intervalToDuration } from 'date-fns';
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { isNativePlatform } from "@/utils/platform";

interface PromoCode {
  id: number;
  OneTime_discountCode: string;
  createdAT: string;
  DiscountDuration_days: number;
  DiscountDuration_weeks: number;
  percentageOff: string;
  expires_in: string;
  updatedAT: string;
  isExpired: boolean;
}

function Home() {

  const { token } = useAuth();
  const isNative = isNativePlatform();

  const headers = useMemo(() => {
    if(token){
      return {
        'Authorization': `Bearer ${token}`,
      }
    }
  }, [token]);


  const { data:coupons } = useGetRequest<PromoCode[] | []>("browse/get-coupons", {headers: headers});

  const { loading, products, categories } = useProductCatergories();
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [formattedTime, setFormattedTime] = useState<string>("");

  const activeCoupon = useMemo(() => {
    if (coupons.length > 0) {
      const sortedCoupons = [...coupons].sort((a, b) => new Date(a.createdAT).getTime() - new Date(b.createdAT).getTime());
      return sortedCoupons[0];
    }
    return null;
  }, [coupons]);

  // console.log(activeCoupon)


  const calculateRemainingTime = (expiresIn: string): number => {
    const now = new Date();
    const expirationDate = new Date(expiresIn);
    return differenceInSeconds(expirationDate, now);
  };
  
  const formatTime = (seconds: number): string => {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    return formatDuration(duration, { format: ['months','days', 'hours', 'minutes', 'seconds'] });
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (activeCoupon && activeCoupon.expires_in) {
      const seconds = calculateRemainingTime(activeCoupon.expires_in);
      setRemainingTime(seconds);

      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(intervalId);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId)
    };
  }, [activeCoupon]);

  useEffect(() => {
    setFormattedTime(formatTime(remainingTime));
  }, [remainingTime]);

  // console.log(formattedTime)

  return (
    <main className="w-full h-full">
      {/* Hero section */}
      <header className="h-[120vh] lg:h-[--hero-height]">
        <Carrousel
          hasDots = {true}
          hasArrows = {true}
          autoPlayInterval={3500}
          content={[
            <Hero className=" bg-[#ffc95c] px-12 z-20 h-full">
              <div className="flex-1 lg:w-[50%] h-[50%] lg:h-full order-2 lg:order-1">
                <img src={heroImg} alt="Hero image" className="w-full h-full object-contain"/>
              </div>
              <div className="flex-1 lg:w-[50%] h-full flex items-center justify-center lg:justify-start text-[#121212] order-1 lg:order-2">
                <div className="w-[90%] h-fit flex flex-col gap-y-4 items-center lg:items-start text-center lg:text-left">
                  {/* <h2 className="text-[40px] md:text-6xl xl:text-7xl font-semibold">
                    Tech Essentials Delivered <span className="text-[#377dff]">Elevate</span> Your Gadget Game
                    </h2> */}
                    <h2 className="text-[40px] md:text-6xl xl:text-7xl font-semibold">
                      Tech Gear Delivered <span className="text-[#377dff]">Elevate</span> Your Experience
                    </h2>
                    <p className="text-base font-meduim">
                      Discover Must-Have Accessories for Every Device
                    </p>
                    <Link to = "/store">
                      <Button size = "medium" className="capitalize text-white text-lg w-[15rem]">
                          shop now
                      </Button>
                    </Link>
                </div>
              </div>
            </Hero>,
            <Hero className=" bg-blue px-12 h-full">
              <div className="flex-1 lg:w-[50%] h-1/2 lg:h-full order-2 lg:order-1">
                <img src={headphoneImg} alt="Hero image" className="w-full h-full object-contain"/>
              </div>
              <div className="flex-1 lg:w-[50%] h-full flex items-center justify-center lg:justify-start text-[#121212] order-1 lg:order-2">
                <div className="w-[90%] h-fit flex flex-col gap-y-4 items-center lg:items-start text-center lg:text-left">
                  {/* <h2 className="text-[40px] md:text-6xl xl:text-7xl font-semibold">
                    Tech, Reimagined <span className="text-white">Explore</span> for Every Tech Enthusiast.
                    </h2> */}
                    <h2 className="text-[40px] md:text-6xl xl:text-7xl font-semibold">
                      Tech for You <span className="text-white">Discover</span> Explore, and Enjoy.
                    </h2>
                    <p className="text-base font-meduim">
                      Upgrade Your Tech Experience with Cutting-Edge Accessories
                    </p>
                    <Link to = "/store">
                      <Button size = "medium" className="capitalize text-white text-lg w-[15rem]">
                          shop now
                      </Button>
                    </Link>
                </div>
              </div>
            </Hero>,
            <Hero className="bg-black px-12 h-full">
              <div className="flex-1 lg:w-[50%] h-1/2 lg:h-full order-2 lg:order-1">
                <img src={earpodImg} alt="Hero image" className="w-full h-full object-contain"/>
              </div>
              <div className="flex-1 lg:w-[50%] h-full flex items-center justify-center lg:justify-start text-white order-1 lg:order-2">
                <div className="w-[90%] h-fit flex flex-col gap-y-4 items-center lg:items-start text-center lg:text-left">
                  <h2 className="text-[40px] md:text-6xl xl:text-7xl font-semibold">
                    Unleash the Power <span className="text-yellow">Top Gear</span> music sound.
                  </h2>
                  <p className="text-base font-meduim">
                    Discover Essential Tech Tools for Your Every Need
                  </p>
                  <Link to = "/store">
                      <Button size = "medium" className="capitalize text-white text-lg w-[15rem]">
                          shop now
                      </Button>
                    </Link>
                </div>
              </div>
          </Hero>,

          ]}
        />

      </header>

          <section className="mt-6 px-8">
            <div className="w-full h-full grid gap-4 grid-cols-2 md:grid-cols-4">
              <div className="flex flex-col justify-center gap-y-5 bg-gray rounded-md p-5">
                <Truck size={30} />
                <div>
                  <h5 className="text-size-500 font-semibold text-[#121212] capitalize">handles logistics</h5>
                  <p className="text-size-400 text-[#121212] font-medium">powered by Shiprocket</p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-y-5 bg-gray rounded-md p-5">
                <Banknote size={30} />
                <div>
                  <h5 className="text-size-500 font-semibold text-[#121212] capitalize">money-back</h5>
                  <p className="text-size-400 text-[#121212] font-medium">30 days guarantee</p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-y-5 bg-gray rounded-md p-5">
                <LockKeyhole size={30} />
                <div>
                  <h5 className="text-size-500 font-semibold text-[#121212] capitalize">secure payments</h5>
                  <p className="text-size-400 text-[#121212] font-medium">Secured by Razorpay, PayUMoney, and Cashfree</p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-y-5 bg-gray rounded-md p-5">
                <Phone size={30} />
                <div>
                  <h5 className="text-size-500 font-semibold text-[#121212] capitalize">24/7 support</h5>
                  <p className="text-size-400 text-[#121212] font-medium">Phone and Email support</p>
                </div>
              </div>
            </div>
          </section>


      {/* Content section */}
      <section className="mx-4 mt-10 lg:mx-14 min-h-screen">

        {/* trying new stuff out with the skeleton content loader */}
        <Section title="New Arrivals" link="/store">
          {!loading ? (
            <ProductSlider 
              autoPlay={false} 
              contents={products
                ?.sort((a, b) => {
                  const timeDiffA = new Date(a.createdAT).getTime();
                  const timeDiffB = new Date(b.createdAT).getTime();
                  return timeDiffA - timeDiffB;
                })
                .map((product: ProductType) => (
                  <div
                    key={product.id}
                    className="w-full md:w-[30.5vw] lg:w-[20.8vw] xl:w-[22vw] h-[23rem] mb-4 md:mb-0"
                  >
                    <ProductCard
                      product={product}
                      tag={{
                        type: 'neutral',
                        msg: product.isOutOfStock ? 'Out of stock' : '',
                      }}
                    />
                  </div>
                ))}
            />
          ) : (
            <div className="w-full h-[25rem]">
              <ProductSlider 
                autoPlay={false} 
                contents={Array(6).fill(0).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              />
            </div>
          )}
        </Section>

        {/* Shop catergories */}
        {/* grid grid-rows-5 md:grid-rows-[30vh_30vh_30vh_30vh] md:grid-cols-2 */}
        <div className="mt-14">
        {!isNative && 
          <Section title="shop categories" link="store">
            <div className="grid gap-4">
              {!loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
                  {categories?.length > 0 && categories?.map((category) => (
                    <Link key={category.id} to={`store/${category?.id}`}>
                      <div
                        id="category-card"
                        style={{
                          backgroundImage: `url(${category?.banner})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                        className="w-full py-4 px-6 h-[20rem] relative rounded-md overflow-hidden group"
                      >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

                        {/* Title */}
                        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center transition-transform duration-300 ease-in-out">
                          <div className="w-[70%] text-center">
                            <h4 className="text-size-600 md:text-3xl font-semibold text-white mb-3 capitalize">
                              {category?.name}
                            </h4>
                          </div>
                        </div>

                        {/* Description (Initially Hidden, Shows on Hover/Focus) */}
                        <div
                          id="category-card-desc"
                          className="absolute p-2 hidden md:flex bg-black w-full h-full top-full group-hover:top-0 group-focus:top-0 transition-all duration-300 ease-in-out z-20 items-center justify-center"
                        >
                          <div className="mx-auto">
                            <p className="text-white text-size-400 font-normal first-letter:uppercase">
                              {category?.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="w-full h-[25rem]">
                  <Spinner />
                </div>
              )}
            </div>
          </Section>}
          {/* Discont sales or Newletter */}
          <section className="mt-14">
            {/* remember to add a state in the global store that would enable the store owner to either turn a promo or a newletter on */}
            {activeCoupon ? <Promo formattedTime = {formattedTime} currentCoupon={activeCoupon}/> :
              (<div className="w-full h-[20rem] lg:h-[30rem]">
                <Carrousel 
                hasArrows = {true}
                autoPlayInterval={3500}
                content= {[
                  <div className="h-full">
                    <img src={banner_one} alt="banner image" className="w-full h-full"/>
                  </div>,
                  <div className="h-full">
                    <img src={banner_two} alt="banner image" className="w-full h-full"/>
                  </div>,
                  <div className="h-full">
                    <img src={banner_three} alt="banner image" className="w-full h-full"/>
                  </div>
                ]}
              />
              </div>)
            }
          </section>

          {/* Best sellers  sort out by rating*/}
          <div className="mt-14">
            {/* trying new stuff out with the skeleton content loader */}
            <Section title="Best sellers" link="/store">
              {!loading ? (
                <ProductSlider 
                  autoPlay={false} 
                  contents={products
                    ?.sort((a, b) => {
                      return a.purchaseCount - b.purchaseCount
                    })
                    .map((product: ProductType) => (
                      <div
                        key={product?.id}
                        className="w-full md:w-[30.5vw] lg:w-[20.8vw] xl:w-[22vw] h-[23rem] mb-4 md:mb-0"
                      >
                        <ProductCard
                          product={product}
                          tag={{
                            type: 'neutral',
                            msg: product?.isOutOfStock ? 'Out of stock' : '',
                          }}
                        />
                      </div>
                    ))}
                />
              ) : (
                <div className="w-full h-[25rem]">
                  <ProductSlider 
                    autoPlay={false} 
                    contents={Array(6).fill(0).map((_, index) => (
                      <ProductCardSkeleton key={index} />
                    ))}
                  />
                </div>
              )}
            </Section>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;