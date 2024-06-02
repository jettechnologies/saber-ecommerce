import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { twMerge } from 'tailwind-merge';
import { ArrowLeftIcon, ArrowRightIcon } from '../icons/svg';

interface Props {
  className?: string;
  children: React.ReactNode;
  leftArrowEl: React.RefObject<HTMLDivElement>;
  rightArrowEl: React.RefObject<HTMLDivElement>;
}

const ProductSlider: React.FC<Props> = ({
  className,
  children,
  leftArrowEl,
  rightArrowEl,
}) => {
  return (
    <div className={twMerge('relative w-full', className)}>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-0" ref={leftArrowEl}>
        <ArrowLeftIcon />
      </div>
      <Glider
        className="glider-container"
        draggable
        hasArrows
        slidesToShow={2}
        scrollLock
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
            },
          },
        ]}
        arrows={{
          prev: leftArrowEl.current,
          next: rightArrowEl.current,
        }}
      >
        {children}
      </Glider>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-0" ref={rightArrowEl}>
        <ArrowRightIcon />
      </div>
    </div>
  );
};

export default ProductSlider;
