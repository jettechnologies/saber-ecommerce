import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { twMerge } from 'tailwind-merge';
import { useRef } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '../icons/svg';

interface Props{
    className?: string;
    children: React.ReactNode;
}

const ProductSlider:React.FC<Props> = ({
    className,
    children
}) => {

    const leftArrowEl = useRef(null);
    const rightArrowEl = useRef(null);

  return (
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
        }
    ]}
    arrows = {{
        prev: leftArrowEl.current,
        next: rightArrowEl.current
      }} 
    >
    <div className={twMerge("", className)}>
        <div className='w-24 h-24 rounded-full absolute top-1/2 left-1/2'>
            <ArrowLeftIcon />
        </div>
        {children}
        <div className='w-24 h-24 rounded-full absolute top-1/2 right-1/2'>
            <ArrowLeftIcon />
        </div>
    </div>
</Glider>
  )
}

export default ProductSlider