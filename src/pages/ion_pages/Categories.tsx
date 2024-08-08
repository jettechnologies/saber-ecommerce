// // import React, { useEffect, useState } from 'react';
// import { useProductCatergories } from "@/context/productCatergoriesContext";
// import { IonPage, IonContent, IonSpinner } from '@ionic/react';
// import { Link } from 'react-router-dom';
// // import Skeleton from 'react-loading-skeleton';
// import CategoryCard from '@/components/ionic/CategoryCard';  // Adjust the path as needed

// const Categories: React.FC = () => {
//   const { loading, categories } = useProductCatergories();

//   return (
//     <IonPage className="min-h-screen border-2 border-black">
//       {/* <IonHeader className="border-2 border-black">
//         <IonToolbar>
//           <IonTitle>Categories</IonTitle>
//         </IonToolbar>
//       </IonHeader> */}
//       <IonContent>
//         <div className="mt-24 px-4">
//           <section>
//             <h2 className="text-2xl font-bold">Shop Categories</h2>
//             <div className="grid gap-4">
//               {!loading ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
//                   {categories.length > 0 && categories.map((category) => (
//                     <Link key={category.id} to={`/store/${category.id}`} className="rounded-lg">
//                       <CategoryCard 
//                         title={category.name}
//                         description={category.description}
//                         imageUrl={category.banner}
//                       />
//                     </Link>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="w-full h-[25rem] flex items-center justify-center">
//                   <IonSpinner name="crescent" />
//                 </div>
//               )}
//             </div>
//           </section>
//         </div>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Categories;


import React, { useEffect, useState } from 'react';
import { useProductCatergories } from "@/context/productCatergoriesContext";
import { IonSpinner } from '@ionic/react';
import { Link } from 'react-router-dom';
import CategoryCard from '@/components/ionic/CategoryCard';  // Adjust the path as needed
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';  // Import the skeleton CSS

const Categories: React.FC = () => {
  const { loading, categories } = useProductCatergories();
  const [contentLoading, setContentLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setContentLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen py-8"> {/* Adjust padding bottom to make space for CustomTabs */}
      <div className="px-4">
        <section>
          <h2 className="text-2xl font-bold">Shop Categories</h2>
          <div className="grid gap-4">
            {!loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
                {contentLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="rounded-lg">
                      <Skeleton height={130} />
                    </div>
                  ))
                ) : (
                  categories.length > 0 && categories.map((category) => (
                    <Link key={category.id} to={`/store/${category.id}`} className="rounded-lg">
                      <CategoryCard 
                        title={category.name}
                        description={category.description}
                        imageUrl={category.banner}
                      />
                    </Link>
                  ))
                )}
              </div>
            ) : (
              <div className="w-full h-[25rem] flex items-center justify-center">
                <IonSpinner name="crescent" />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Categories;