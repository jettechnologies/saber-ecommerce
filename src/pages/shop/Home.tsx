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
// import useGetRequest from "@/hooks/useGetRequest";
import { useEffect, useMemo, useState } from "react";
import Spinner from "@/components/Spinner";
import { ProductType } from "@/types";
import useGetRequest from "@/hooks/useGetRequest";
import { useAuth } from "@/context/authContext";  
import banner_one from "@/assets/images/banners/banner1.webp";
import banner_two from "@/assets/images/banners/banner2.webp";
import banner_three from "@/assets/images/banners/banner3.webp";
// import { timeToSeconds, formatTimeDays, formatTimeWeeks } from "@/utils/dateFormatting";
import { differenceInSeconds, formatDuration, intervalToDuration } from 'date-fns';
// import Newsletter from "@/components/Newsletter";

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

  const headers = useMemo(() => {
    if(token){
      return {
        'Authorization': `Bearer ${token}`,
      }
    }
  }, [token]);

  const { loading:fetchingCoupon, data:coupons, error } = useGetRequest<PromoCode[] | []>("browse/get-coupons", {headers: headers});

  const { loading, products, categories } = useProductCatergories();
  const [fetchActiveCoupon, setFetchActiveCoupon] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [formattedTime, setFormattedTime] = useState<string>("");

  const activeCoupon = useMemo(() => {
    if (coupons.length > 0) {
      const sortedCoupons = [...coupons].sort((a, b) => new Date(a.createdAT).getTime() - new Date(b.createdAT).getTime());
      return sortedCoupons[0];
    }
    return null;
  }, [coupons]);


  const calculateRemainingTime = (expiresIn: string): number => {
    const now = new Date();
    const expirationDate = new Date(expiresIn);
    return differenceInSeconds(expirationDate, now);
  };
  
  const formatTime = (seconds: number): string => {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    return formatDuration(duration, { format: ['days', 'hours', 'minutes', 'seconds'] });
  };


  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (activeCoupon && activeCoupon.expires_in) {
      setFetchActiveCoupon(true);
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
      setFetchActiveCoupon(false);
    };
  }, [activeCoupon]);

  useEffect(() => {
    setFormattedTime(formatTime(remainingTime));
  }, [remainingTime]);

  return (
    <main className="w-full h-full">
      {/* Hero section */}
      <header className="h-screen lg:h-[--hero-height]">
        <Carrousel
          hasDots = {true}
          hasArrows = {true}
          autoPlayInterval={3500}
          content={[
            <Hero className=" bg-[#ffc95c] px-12 z-20">
              <div className="flex-1 lg:w-[50%] h-[50%] lg:h-full order-2 lg:order-1">
                <img src={heroImg} alt="Hero image" className="w-full h-full object-contain"/>
              </div>
              <div className="flex-1 lg:w-[50%] h-full flex items-center justify-center lg:justify-start text-[#121212] order-1 lg:order-2">
                <div className="w-[90%] h-fit flex flex-col gap-y-4 items-center lg:items-start text-center lg:text-left">
                  <h2 className="text-[40px] md:text-6xl xl:text-7xl font-semibold">
                        Listen to the <span className="text-[#377dff]">amazing</span> music sound.
                    </h2>
                    <p className="text-base font-meduim">
                        Experience music like never before
                    </p>
                    <Link to = "/store">
                      <Button size = "medium" className="capitalize text-white text-lg w-[15rem]">
                          shopping now
                      </Button>
                    </Link>
                </div>
              </div>
            </Hero>,
            <Hero className=" bg-blue px-12">
              <div className="flex-1 lg:w-[50%] h-1/2 lg:h-full order-2 lg:order-1">
                <img src={headphoneImg} alt="Hero image" className="w-full h-full object-contain"/>
              </div>
              <div className="flex-1 lg:w-[50%] h-full flex items-center justify-center lg:justify-start text-[#121212] order-1 lg:order-2">
                <div className="w-[90%] h-fit flex flex-col gap-y-4 items-center lg:items-start text-center lg:text-left">
                  <h2 className="text-[40px] md:text-6xl xl:text-7xl font-semibold">
                        Listen to the <span className="text-white">heavenly</span> music sound.
                    </h2>
                    <p className="text-base font-meduim">
                        Experience music like never before with our headphones
                    </p>
                    <Link to = "/store">
                      <Button size = "medium" className="capitalize text-white text-lg w-[15rem]">
                          shopping now
                      </Button>
                    </Link>
                </div>
              </div>
            </Hero>,
            <Hero className="bg-black px-12">
              <div className="flex-1 lg:w-[50%] h-1/2 lg:h-full order-2 lg:order-1">
                <img src={earpodImg} alt="Hero image" className="w-full h-full object-contain"/>
              </div>
              <div className="flex-1 lg:w-[50%] h-full flex items-center justify-center lg:justify-start text-white order-1 lg:order-2">
                <div className="w-[90%] h-fit flex flex-col gap-y-4 items-center lg:items-start text-center lg:text-left">
                  <h2 className="text-[40px] md:text-6xl xl:text-7xl font-semibold">
                      Listen to the <span className="text-yellow">amazing</span> music sound.
                  </h2>
                  <p className="text-base font-meduim">
                      Experience music like never before
                  </p>
                  <Link to = "/store">
                      <Button size = "medium" className="capitalize text-white text-lg w-[15rem]">
                          shopping now
                      </Button>
                    </Link>
                </div>
              </div>
          </Hero>,

          ]}
        />

      </header>

      {/* Store Benefits */}
      <section className="mt-6 px-8">
            <div className="w-full h-full flex gap-4 flex-wrap">
              <div className="flex flex-col justify-center gap-y-5 bg-gray rounded-md p-5 flex-[1_1_18vw]">
                <Truck size = {30}/>
                <div>
                  <h5 className="text-size-500 font-semibold text-[#121212] capitalize">handles logistics</h5>
                  <p className = "text-size-400 text-[#121212] font-medium">
                    powered by Shiprocket
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-y-5 bg-gray rounded-md p-5 flex-[1_1_18vw]">
                <Banknote size = {30}/>
                <div>
                  <h5 className="text-size-500 font-semibold text-[#121212] capitalize">money-back</h5>
                  <p className = "text-size-400 text-[#121212] font-medium">
                    30 days guarantee
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-y-5 bg-gray rounded-md p-5 flex-[1_1_18vw]">
                <LockKeyhole size = {30}/>
                <div>
                  <h5 className="text-size-500 font-semibold text-[#121212] capitalize">secure payments</h5>
                  <p className = "text-size-400 text-[#121212] font-medium">
                    Secured by razorpay, payUmoney and cashfree
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-y-5 bg-gray rounded-md p-5 flex-[1_1_18vw]">
                <Phone size = {30}/>
                <div>
                  <h5 className="text-size-500 font-semibold text-[#121212] capitalize">24/7 support</h5>
                  <p className = "text-size-400 text-[#121212] font-medium">
                    Phone and Email support
                  </p>
                </div>
              </div>
            </div>
          </section>

      {/* Content section */}
      <section className="mx-4 mt-10 lg:mx-14 min-h-screen">
        {/* Highlighted categories sort out by timespan */}
        <Section title="new arrivals" link="/store">
          {!loading ? <ProductSlider 
            autoPlay = {false}
            contents={products.map((product:ProductType) =>(
              <div className="w-full md:w-[30.5vw] lg:w-[20.8vw] xl:w-[22vw] h-[23rem]" key = {product.id}>
                <ProductCard product={product}  tag={{
                  type: "neutral",
                  msg: product?.isOutOfStock ? "out of stock" : "",
                }} />
              </div>
            ))} 
          /> :
            <div className="w-full h-[25rem]">
              <Spinner />
            </div>
          }
          {/* <></> */}
        </Section>

        {/* Shop catergories */}
        {/* grid grid-rows-5 md:grid-rows-[30vh_30vh_30vh_30vh] md:grid-cols-2 */}
        <div className="mt-14">
        <Section title="shop categories" link="store">
          <div className="grid gap-4">
            {!loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8 min-h-[42rem]">
                {categories.length > 0 && categories.map((category) => (
                  <Link key={category.id} to={`store/${category.id}`}>
                    <div
                      id="category-card"
                      style={{
                        backgroundImage: `url(${category.banner})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                      }}
                      className="w-full py-4 px-6 h-[20rem] relative rounded-md overflow-clip"
                    >
                      <div className="w-full h-full flex flex-col justify-center">
                        <div className="w-[70%] h-fit self-center">
                          <h4 className="text-size-600 md:text-3xl font-semibold text-gray mb-3 capitalize">
                            {category.name}
                          </h4>
                        </div>
                      </div>
                      <div
                        id="category-card-desc"
                        className="absolute bg-black w-full h-full bottom-0 -right-[200%] p-4 z-10 flex items-center justify-center"
                      >
                        <div className="z-50 mx-auto">
                          <p className="text-white text-size-400 font-normal first-letter:uppercase">
                            {category.description}
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
        </Section>
          {/* Discont sales or Newletter */}
          <section className="mt-14">
            {/* remember to add a state in the global store that would enable the store owner to either turn a promo or a newletter on */}
            {activeCoupon ? <Promo formattedTime = {formattedTime} currentCoupon={activeCoupon}/> :
              fetchActiveCoupon && (<div className="w-full h-full border-2">
                <Carrousel 
                hasArrows = {true}
                autoPlayInterval={3500}
                content= {[
                  <div className="">
                    <img src={banner_one} alt="banner image" />
                  </div>,
                  <div className="">
                    <img src={banner_two} alt="banner image" />
                  </div>,
                  <div className="">
                    <img src={banner_three} alt="banner image" />
                  </div>
                ]}
              />
              </div>)
            }
          </section>

          {/* Best sellers  sort out by rating*/}
          <div className="mt-14">
            <Section title="best sellers" link="store">
              {!loading ? <div className="w-full h-full flex flex-wrap justify-between gap-y-6 mt-8 z-10">
                {
                  products.map((product:ProductType) =>(
                    <div className="w-full md:w-[46.5vw] lg:w-[20.8vw] xl:w-[22vw] h-[23rem]" key = {product.id}>
                      <ProductCard product={product} tag={{
                        type: "neutral",
                        msg: product?.isOutOfStock ? "out of stock" : "",
                      }} />
                    </div>))
                }
                </div>
                :
                <div className="w-full h-[25rem]">
                  <Spinner />
                </div>
              }
            </Section>
          </div>

          {/* Newsletter signups */}
          {/* <Newsletter /> */}

        </div>
      </section>
    </main>
  );
}

export default Home;