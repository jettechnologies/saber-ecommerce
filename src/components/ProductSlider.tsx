import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Props{
  autoPlay: boolean;
  isSwipeable?:boolean;
  isDraggable?:boolean;
  hasDots?:boolean;
  isInfinite?:boolean;
  contents:React.ReactNode[];
}


const ProductSlider:React.FC<Props> = ({
  autoPlay,
  isSwipeable = true,
  isDraggable = true,
  hasDots = false,
  isInfinite = true,
  contents
}) => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 850, min: 768 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 320 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <div className="w-full h-full py-4">
      <Carousel
        responsive={responsive}
        autoPlay={autoPlay}
        swipeable={isSwipeable}
        draggable={isDraggable}
        showDots={hasDots}
        infinite={isInfinite}
        partialVisible={false}
      >
        {contents.map((content) => {
          return (
            content
          );
        })}
      </Carousel>
    </div>
  )
}

export default ProductSlider