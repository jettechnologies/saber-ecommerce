import React from 'react';
import { Star, StarHalf  } from 'lucide-react'; // Assuming you're using Material-UI icons

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;

  return (
    <div className='flex gap-4 items-center'>
      <p className="text-size-500 text-text-black font-medium">
        {`(${rating})`}
      </p>
      <div className="flex gap-2">
        {Array.from({ length: fullStars }).map((_, index) => (
            <Star fill="yellow" key={index} />
        ))}
        {Array.from({ length: halfStars }).map((_, index) => (
            <StarHalf fill="yellow" key={`half-${index}`} />
        ))}
      </div>
    </div>
  );
};


export default StarRating;
