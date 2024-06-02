import Hero from "../components/Hero";
import Card from "../components/Card";
import Section from "../components/Section";
import Carrousel from "../components/Carrousel";
import banner1 from "../assets/images/banners/banner1.webp";
import banner2 from "../assets/images/banners/banner2.webp";
import banner3 from "../assets/images/banners/banner3.webp";
import banner4 from "../assets/images/banners/banner4.webp";
import banner5 from "../assets/images/banners/banner5.webp";
import banner6 from "../assets/images/banners/banner6.webp";
import heroImg from "../assets/images/hero.png";
import headphoneImg from "../assets/images/headsets.png";
import earpodImg from "../assets/images/earpods.webp";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";


function Home() {
  return (
    <main className="border-2 border-black w-full">
      {/* Hero section */}
      <header className="h-screen lg:h-[--hero-height]">
        <Carrousel
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
      <section className="mx-4 mt-10 lg:mx-14">
        {/* Highlighted categories */}
        <div className="flex gap-2 justify-center md:gap-6 border-2 border-black">
          {/* <div className="h-[16rem] lg:h-[22rem] w-full">
            <Card
              title="High Coziness"
              subtitle="Category placehldr"
              textLocation="left"
              imgLink={banner3}
              btnLink="/store"
              btnText="Shop Now"
              btnTransparent
            />
          </div>

          <div className="h-[16rem] lg:h-[22rem] w-full">
            <Card
              title="Summer Style"
              subtitle="Category placehldr"
              textLocation="left"
              imgLink={banner2}
              btnLink="/store"
              btnText="Shop Now"
              btnTransparent
            />
          </div> */}
          <div className="w-[228px] h-[24.25rem]">
            <ProductCard />
          </div>
          <div className="w-[228px] h-[24.25rem]">
            <ProductCard />
          </div>
          <div className="w-[228px] h-[24.25rem]">
            <ProductCard />
          </div>
          <div className="w-[228px] h-[24.25rem]">
            <ProductCard />
          </div>  
        </div>

        {/* Big saving zone */}
        <div className="mt-16">
          <Section title="Big Saving Zone">
            <div className="grid  gap-4">
              <div className="grid md:grid-cols-3 mt-8 gap-4 h-[42rem] w-full md:h-[22rem]">
                <Card
                  title="Hawaiian Shirts"
                  subtitle="Category placehldr"
                  textLocation="left"
                  imgLink={banner1}
                  btnLink="/store"
                  btnText="Shop Now"
                  btnTransparent
                />

                <Card
                  title="Printed T-Shirt"
                  subtitle="Category placehldr"
                  textLocation="right"
                  imgLink={banner4}
                  btnLink="/store"
                  btnText="Shop Now"
                  btnTransparent
                />

                <Card
                  title="Cargo Joggers"
                  subtitle="Category placehldr"
                  textLocation="right"
                  imgLink={banner5}
                  btnLink="/store"
                  btnText="Shop Now"
                  btnTransparent
                />
              </div>
              <div className="grid grid-cols-2 gap-4 h-[16rem] w-full md:h[22rem]">
                <Card
                  title="Urban Shirts"
                  subtitle="Category placehldr"
                  textLocation="right"
                  imgLink={banner5}
                  btnLink="/store"
                  btnText="Shop Now"
                  btnTransparent
                />

                <Card
                  title="Oversized"
                  subtitle="Category placehldr"
                  textLocation="right"
                  imgLink={banner6}
                  btnLink="/store"
                  btnText="Shop Now"
                  btnTransparent
                />
              </div>
            </div>
          </Section>
        </div>
      </section>
    </main>
  );
}

export default Home;
