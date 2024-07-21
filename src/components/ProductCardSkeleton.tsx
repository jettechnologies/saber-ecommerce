// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// const ProductCardSkeleton: React.FC = () => (
//   <div className="w-full md:w-[30.5vw] lg:w-[20.8vw] xl:w-[22vw] h-[23rem] mb-4 md:mb-0">
//     <Skeleton height="100%" />
//   </div>
// );


// export default ProductCardSkeleton;

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductCardSkeleton: React.FC = () => (
  <div className="w-full md:w-[30.5vw] lg:w-[20.8vw] xl:w-[22vw] h-[23rem] mb-4 md:mb-0 p-2 rounded-lg shadow-lg">
    <div className="h-2/3 mb-2">
      <Skeleton height="100%" />
    </div>
    <div className="flex flex-col gap-y-3 h-1/3">
      <div className="mb-2">
        <Skeleton height={20} width="80%" />
      </div>
      <div className="mb-2">
        <Skeleton height={20} width="60%" />
      </div>
      {/* <div>
        <Skeleton height={20} width="40%" />
      </div> */}
    </div>
  </div>
);

export default ProductCardSkeleton;
