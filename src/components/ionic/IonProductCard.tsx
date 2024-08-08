import React from 'react';
import { IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { Product, ProductType } from "@/types";
// import { twMerge } from "tailwind-merge";
import {
  IonCard,
  IonCardContent,
//   IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
} from '@ionic/react';

interface Props {
//   tag?: {
//     type: "success" | "warning" | "neutral";
//     msg: string;
//   };
  product: ProductType | Product;
}

const IonProductCard: React.FC<Props> = ({ product }) => {
  const { id, name, price, productImage } = product;

//   const typeClassNames = {
//     neutral: "bg-gray",
//     warning: "bg-yellow",
//     success: "bg-green-500"
//   }

  return (
    <IonCard className="w-full h-full shadow-lg rounded-md">
      <Link to={`/product/${id}`}>
        <IonImg
          src={productImage}
          alt = {`${name} image`}
          className="w-full h-[75%] rounded-md bg-gray product-img"
        >
        </IonImg>
      </Link>
      <IonCardContent className="w-full min-h-[25%] flex flex-col gap-2 px-4 pt-3 bg-[#f8f8f8]">
        <IonCardTitle className="text-size-500 font-medium first-letter:uppercase">{name}</IonCardTitle>
        <div className="w-full flex gap-2">
          <IndianRupee size={20} />
          <IonCardSubtitle className="text-size-500 font-medium">{price}</IonCardSubtitle>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default IonProductCard;
