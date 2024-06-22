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
import useGetRequest from "@/hooks/useGetRequest";
// import { useEffect, useMemo, useState } from "react";
import Spinner from "@/components/Spinner";
import { ProductType, CategoryType } from "@/types";

function Home() {
  const fetchCategory = useGetRequest<CategoryType[]>("browse/fetch-all-product-categories");
  const productsFetch = useGetRequest<ProductType[]>("browse/fetch-all-products");

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

      {/* Content section */}
      <section className="mx-4 mt-10 lg:mx-14 min-h-screen">
        {/* Highlighted categories sort out by timespan */}
        <Section title="new arrivals" link="/store">
          {!productsFetch.loading ? <ProductSlider 
            autoPlay = {false}
            contents={productsFetch.data.map((product:ProductType) =>(
              <div className="w-[43.7vw] md:w-[30.5vw] lg:w-[20.8vw] xl:w-[22vw] h-[23rem]" key = {product.id}>
                <ProductCard product={product} tag={product.isOutOfStock}/>
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
          <Section title="shop catergories" link="store">
            <div className="grid gap-4">
              {!fetchCategory.loading ? <div className="flex flex-col mt-8 gap-4 min-h-[42rem] w-full md:min-h-[22rem]">
                {fetchCategory.data.length > 0 && <Link to = {`store/${fetchCategory.data[0].id}`}><div 
                  id = "category-card"
                  style = {{backgroundImage: `url(${fetchCategory.data[0].banner})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}} 
                  className={`w-full h-[25rem] py-4 px-6 relative rounded-md overflow-clip`}>
                    <div className="w-full h-full gap-y-5 flex">
                      <div className="w-[30%] h-fit self-center">
                            <h4 className="text-size-600 md:text-3xl font-semibold text-gray mb-3 capitalize">
                              {fetchCategory.data[0].name}
                            </h4>
                            {/* <Link to = {`store/${fetchCategory.data[0].id}`}>
                              <div className = "redirect-link w-fit h-fit relative flex gap-1 items-center">
                                <p className="text-size-500 font-medium text-blue capitalize">shop</p>
                                <ArrowRightIcon size = {24} color="#fff"/>
                              </div>
                            </Link> */}
                          </div>
                    </div>
                    <div id = "category-card-desc" className="absolute bg-black w-[60%] lg:w-[40%] h-full bottom-0 -right-[200%] p-4 opacity-60 z-10 flex items-center justify-center">
                      <div className="z-50">
                        <p className="text-white text-size-500 font-normal first-letter:uppercase">
                          {fetchCategory.data[0].description}
                        </p>
                      </div>
                    </div>
                    </div></Link>}
                  <div className = "flex max-sm:flex-col flex-wrap w-full min-h-[42rem] max-sm:gap-y-4 justify-between">
                      {
                        fetchCategory.data.length > 0 && fetchCategory.data.slice(1,5).map((category) => (
                        <Link to = {`store/${category.id}`}>
                        <div 
                          id = "category-card"
                          style = {{backgroundImage: `url(${category.banner})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}} 
                          className="w-full lg:w-[44.5vw] md:w-[47vw] py-4 px-6 h-[20rem] relative rounded-md overflow-clip border-2">
                          <div className="w-full h-full gap-y-5 flex">
                          <div className="w-[30%] h-fit self-center">
                            <h4 className="text-size-600 md:text-3xl font-semibold text-gray mb-3 capitalize">
                              {category.name}
                            </h4>
                            {/* <Link to = {`store/${category.id}`}>
                              <div className = "redirect-link w-fit h-fit relative flex gap-1 items-center">
                                <p className="text-size-500 font-medium text-blue capitalize">shop</p>
                                <ArrowRightIcon size = {24} color="#fff"/>
                              </div>
                            </Link>
                          </div> */}
                        </div>
                        </div>
                    <div id = "category-card-desc" className="absolute bg-black w-[60%] lg:w-[40%] h-full bottom-0 -right-[200%] p-4 opacity-60 z-10 flex items-center justify-center">
                      <div className="z-50 mx-auto">
                        <p className="text-white text-size-400 font-normal first-letter:uppercase">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    </div>
                    </Link>
                      ))
                    }
                    </div>
                </div>
                :
                <div className="w-full h-[25rem]">
                  <Spinner />
                </div>
              }
            </div>
          </Section>

          {/* Discont sales or Newletter */}
          <section className="mt-14">
            {/* remember to add a state in the global store that would enable the store owner to either turn a promo or a newletter on */}
            <Promo />
          </section>

          {/* Best sellers  sort out by rating*/}
          <div className="mt-14">
            <Section title="best sellers" link="store">
              {!productsFetch.loading ? <div className="w-full h-full flex flex-wrap justify-between gap-y-5 mt-8 z-10">
                {
                  productsFetch.data.map((product:ProductType) =>(
                    <div className="w-[43.7vw] md:w-[30.5vw] lg:w-[20.8vw] xl:w-[22vw] h-[23rem]" key = {product.id}>
                      <ProductCard product={product} tag={product.isOutOfStock}/>
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

          {/* newsletter section */}

          {/* Store Benefits */}
          <section className="mt-14">
            <div className="w-full h-full flex gap-4 flex-wrap">
              <div className="flex flex-col justify-center gap-y-5 bg-gray rounded-md p-8 flex-[1_1_18vw]">
                <Truck size = {50}/>
                <div>
                  <h5 className="text-size-500 font-semibold text-[#121212] capitalize">free shipping</h5>
                  <p className = "text-size-400 text-[#121212] font-medium">
                    Order above $200
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-y-5 bg-gray rounded-md p-8 flex-[1_1_18vw]">
                <Banknote size = {50}/>
                <div>
                  <h5 className="text-size-500 font-semibold text-[#121212] capitalize">money-back</h5>
                  <p className = "text-size-400 text-[#121212] font-medium">
                    30 days guarantee
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-y-5 bg-gray rounded-md p-8 flex-[1_1_18vw]">
                <LockKeyhole size = {50}/>
                <div>
                  <h5 className="text-size-500 font-semibold text-[#121212] capitalize">secure payments</h5>
                  <p className = "text-size-400 text-[#121212] font-medium">
                    Secured by Striped
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-y-5 bg-gray rounded-md p-8 flex-[1_1_18vw]">
                <Phone size = {50}/>
                <div>
                  <h5 className="text-size-500 font-semibold text-[#121212] capitalize">24/7 support</h5>
                  <p className = "text-size-400 text-[#121212] font-medium">
                    Phone and Email support
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Home;
