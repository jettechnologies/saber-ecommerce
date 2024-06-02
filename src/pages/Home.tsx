import Hero from "../components/Hero";
import Section from "../components/Section";
import Carrousel from "../components/Carrousel";
import heroImg from "../assets/images/hero.png";
import headphoneImg from "../assets/images/headsets.png";
import earpodImg from "../assets/images/earpods.webp";
import Button from "../components/Button";
import { Link } from "react-router-dom";
// import { ArrowRightIcon } from "../icons/svg";
import { ArrowRightIcon, Truck, Banknote, LockKeyhole,Phone } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Promo from "../components/Promo";
import TestimonialCard from "../components/TestimonialCard";
import testimonyOne from "../assets/images/testimonial/testimonial1.webp";
import testimonyTwo from "../assets/images/testimonial/testimonial2.webp";
import testimonyThree from "../assets/images/testimonial/testimonial3.webp";
// import ProductSlider from "../components/ProductSlider";
// import { useRef } from 'react';

function Home() {

  // const leftArrowEl = useRef<HTMLDivElement>(null);
  // const rightArrowEl = useRef<HTMLDivElement>(null);

  return (
    <main className="w-full h-full">
      {/* Hero section */}
      <header className="h-screen lg:h-[--hero-height]">
        <Carrousel
          hasDots = {true}
          content={[
            <Hero className=" bg-[#ffc95c] px-12">
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
                    <Button btnLink = "/shop" size = "medium" className="capitalize text-white text-lg w-[15rem]">
                        shopping now
                    </Button>
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
                    <Button btnLink = "/shop" size = "medium" className="capitalize text-white text-lg w-[15rem]">
                        shopping now
                    </Button>
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
                  <Button btnLink = "/shop" size = "medium" className="capitalize text-white text-lg w-[15rem]">
                      shopping now
                  </Button>
                </div>
              </div>
          </Hero>,

          ]}
        />
      </header>

      {/* Content section */}
      <section className="mx-4 mt-10 lg:mx-14 min-h-screen">
        {/* Highlighted categories */}
        {/* <div className="w-full h-[20rem] border-2 border-black flex overflow-hidden">
          <div className="w-[30rem] h-full border-2 border-black"></div>
          <div className="w-[30rem] h-full border-2 border-black"></div>
          <div className="w-[30rem] h-full border-2 border-black"></div>
          <div className="w-[30rem] h-full border-2 border-black"></div>
          <div className="w-[30rem] h-full border-2 border-black"></div>
          <div className="w-[30rem] h-full border-2 border-black"></div>
          <div className="w-[30rem] h-full border-2 border-black"></div>
        </div> */}

        {/* Shop catergories */}
        <div className="mt-14">
          <Section title="shop catergories" link="store">
            <div className="grid gap-4">
              <div className="grid grid-rows-4 md:grid-rows-[30vh_30vh] md:grid-cols-2 mt-8 gap-4 min-h-[42rem] w-full md:min-h-[22rem]">
                  <div className="w-full h-full py-4 px-6 bg-gray row-start-1 row-span-2 md:row-start-1 md:row-end-3 md:col-start-1 md:col-span-1">
                    <div className="w-full h-full flex flex-col gap-y-5">
                      <div className="w-full h-[70%] flex items-center justify-center">
                        <img src={headphoneImg} alt="headphone image" className="w-full h-full object-contain"/>
                      </div>
                      <div className="w-full h-fit">
                        <h4 className="text-size-600 md:text-3xl font-semibold text-black mb-3 capitalize">
                          Headband
                        </h4>
                        <Link to = "store">
                          <div className = "redirect-link w-fit h-fit relative flex gap-1 items-center">
                            <p className="text-size-500 font-medium text-black capitalize">shop</p>
                            <ArrowRightIcon size = {24}/>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-full py-4 px-6 bg-gray row-start-3 row-span-1 md:row-span-1 md:col-start-2 md:col-span-1">
                    <div className="w-full h-full gap-y-5 flex">
                      <div className="w-[70%] order-2 h-full flex items-center justify-center">
                        <img src={headphoneImg} alt="headphone image" className="w-full h-full object-contain"/>
                      </div>
                      <div className="w-[30%] h-fit order-1 self-center">
                        <h4 className="text-size-600 md:text-3xl font-semibold text-black mb-3 capitalize">
                          Headband
                        </h4>
                        <Link to = "store">
                          <div className = "redirect-link w-fit h-fit relative flex gap-1 items-center">
                            <p className="text-size-500 font-medium text-black capitalize">shop</p>
                            <ArrowRightIcon size = {24}/>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-full py-4 px-6 bg-gray row-start-4 row-span-1 md:row-span-1 md:col-start-2 md:col-span-1">
                  <div className="w-full h-full gap-y-5 flex">
                      <div className="w-[70%] order-2 h-full flex items-center justify-center">
                        <img src={earpodImg} alt="earpod image" className="w-full h-full object-contain"/>
                      </div>
                      <div className="w-[30%] h-fit order-1 self-center">
                        <h4 className="text-size-600 md:text-3xl font-semibold text-black mb-3 capitalize">
                          earpods
                        </h4>
                        <Link to = "store">
                          <div className = "redirect-link w-fit h-fit relative flex gap-1 items-center">
                            <p className="text-size-500 font-medium text-black capitalize">shop</p>
                            <ArrowRightIcon size = {24}/>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </Section>

          {/* Best sellers */}
          <div className="mt-14">
            <Section title="best sellers" link="store">
                <div className="w-full h-full flex flex-wrap justify-between gap-y-5 mt-8">
                    {
                      [1,2,3,4,5,6,7,8].map((index) =>(
                        <div className="w-[43.7vw] md:w-[30.5vw] lg:w-[20.8vw] xl:w-[22vw] h-[25rem]" key = {index}>
                          <ProductCard tag = "hot"/>
                        </div>
                      ))
                    }
                </div>
            </Section>
          </div>

          {/* Discont sales or Newletter */}
          <section className="mt-14">
            {/* remember to add a state in the global store that would enable the store owner to either turn a promo or a newletter on */}
            <Promo />
          </section>

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

          {/* Testimonials */}
          <section className="mt-14 h-fit">
            <h3 className="text-3xl md:text-5xl text-black font-bold capitalize mb-10">
              Testimonials
            </h3>
            <div className="flex flex-wrap gap-4">
                {
                  [{
                    id: 1,
                    img: testimonyOne,
                    name: "John Doe",
                    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, corporis Autem, corporis"
                  }, 
                  {
                    id: 2,
                    img: testimonyTwo,
                    name: "Alex Howard",
                    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, corporis Autem, corporis"
                  },
                  {
                    id: 3,
                    img: testimonyThree,
                    name: "Theresa Hue",
                    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, corporis Autem, corporis"
                  }
                  ].map((testimonial) =>(
                    <div className="flex-[1_1_25vw] min-h-40 " key={testimonial.id}>
                      <TestimonialCard img = {testimonial.img} name = {testimonial.name}>
                        <p className="text-size-500 font-medium text-text-black">{testimonial.content}</p>
                      </TestimonialCard>
                    </div>
                  ))
                }
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Home;
