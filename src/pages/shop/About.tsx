import bannerOne from "@/assets/images/banner-one.jpg"
import bannerTwo from "@/assets/images/banner-two.jpg"
import bannerThree from "@/assets/images/banner-three.jpg"

const AboutUs = () => {
  return (
    <>
      {/* <section
        id="about"
        className="container grid md:grid-cols-2 gap-4 mx-auto px-6 my-10"
      >
        <div className="space-y-10">
          <h1 className="text-4xl font-bold text-center md:text-5-xl md:text-left">
            Streamlined Ecommerce Made Easy
          </h1>
          <p className="text-md text-center text-secondary md:text-left">
            We are a dedicated group of e-commerce aficionados committed to
            enhancing your online shopping journey. Our platform empowers you to
            seamlessly discover and explore a wide range of products, ensuring
            you always find what you're looking for. With our intuitive
            interface and extensive product catalog, navigating the world of
            online shopping has never been more convenient.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src={working}
            alt="An image of people working"
            className="w-[60%]"
          />
        </div>
      </section>

      <section id="team" className="container mx-auto px-6 my-10 mt-10">
        <h1 className="text-4xl font-bold text-center md:text-5-xl">
          Meet the Team
        </h1>
        <div className="grid gap-4 md:grid-cols-3">
          <TestimonialCard name="John Smith" img={testimonial1}>
            Strategic visionary overseeing overall operations and leading the
            team towards innovation and growth.
          </TestimonialCard>
          <TestimonialCard name="Sarah Johnson" img={testimonial3}>
            Driven leader spearheading the development of cutting-edge features
            and ensuring a seamless user experience.
          </TestimonialCard>
          <TestimonialCard name="David Lee" img={testimonial2}>
            Expert in managing and optimizing the product database, ensuring
            efficient and reliable functionalities for users.
          </TestimonialCard>
        </div>
      </section> */}
    <div className="bg-white text-gray-800 xl:px-[10rem] lg:px-[5rem] md:px-12 px-7">
      {/* Banner */}
      <div className="bg-gray text-text-black py-12 h-[300px] flex items-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Welcome to Gearmates</h1>
          <p className="mt-4 text-lg">Your trusted partner in the world of cutting-edge gadgets and innovative technology.</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Who We Are */}
        <section className="mb-12 flex gap-5 flex-col md:flex-row">
          <div className="flex-1 self-center max-sm:order-2">
            <h2 className="text-3xl font-semibold text-text-black mb-4">Who We Are</h2>
            <p className="text-text-black text-sm">
              Founded by a group of passionate tech enthusiasts, Gearmates is dedicated to bringing the latest advancements in technology to consumers around the world. Our team is a vibrant mix of engineers, designers, and visionaries who work tirelessly to create products that not only meet but exceed the expectations of our global clientele. We believe in the power of technology to transform lives, and we are committed to making high-quality gadgets accessible to everyone.
            </p>
          </div>
          <div className="flex-1 ">
            <img loading="lazy" src={bannerOne} alt="banner-one image" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* Our Vision */}
        <section className="mb-12 flex flex-col md:flex-row gap-5">
          <div className="flex-1 order-1 md:order-2 self-center">
            <h2 className="text-3xl font-semibold text-text-black mb-4">Our Vision</h2>
            <p className="text-text-black text-sm">
              At Gearmates, our vision is to be a global leader in the technology industry, known for our innovation, reliability, and customer-centric approach. We aspire to create a future where technology seamlessly integrates into everyday life, enhancing experiences and connecting people across the globe.
            </p>
          </div>
          <div className="flex-1 order-2 md:order-1">
            <img loading="lazy" src={bannerTwo} alt="banner-two image" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* Our Mission */}
        <section className="flex flex-col md:flex-row">
          <div className="flex-1 self-center">
            <h2 className="text-3xl font-semibold text-text-black mb-4">Our Mission</h2>
            <p className="text-text-black text-sm">
              Our mission is to deliver top-notch gadgets that combine cutting-edge technology with sleek design at competitive prices. We strive to push the boundaries of innovation, ensuring our products are not only advanced but also intuitive and user-friendly. By fostering a culture of continuous improvement and customer feedback, we aim to build a loyal community of tech enthusiasts who trust Gearmates for their technology needs.
            </p>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <img loading="lazy" src={bannerThree} alt="banner-three image" className="w-full h-full object-cover" />
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default AboutUs;
