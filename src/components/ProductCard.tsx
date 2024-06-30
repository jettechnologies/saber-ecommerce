import { IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { Product, ProductType } from "@/types";
import { twMerge } from "tailwind-merge";

interface Props {
  tag?: {
    type: "success" | "warning" | "neutral";
    msg: string;
  };
  product: ProductType | Product;
}

const ProductCard: React.FC<Props> = ({ tag, product }) => {
  const { id, name, price, productImage } = product;

  const typeClassNames = {
    neutral: "bg-gray",
    warning: "bg-yellow",
    success: "bg-green-500"
  }

  return (
    <div className="w-full h-full shadow-lg rounded-md overflow-clip">
      <div className="w-full h-full relative z-20">
        <Link to={`/product/${id}`}>
          <div
            style={{
              background: `url(${productImage}) rgb(243 245 247)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full flex justify-center items-center h-[75%] rounded-md bg-gray product-img"
          >
            <div className="flex justify-between w-full pt-3 px-3 absolute top-0 left-0 z-80">
              {tag && (
                <div className={twMerge("p-2 rounded-md text-base capitalize font-medium shadow-md", typeClassNames[tag?.type])}>
                  <p>{tag.msg}</p>
                </div>
              )}
              {/* {!isLogin ? (
                <div className="w-8 h-8 shadow-md flex items-center justify-center rounded-full bg-gray wishlist-icon cursor-pointer">
                  <Link to="/auth/login">
                    <Heart size={20} />
                  </Link>
                </div>
              ) : (
                <div
                  className="w-8 h-8 shadow-md flex items-center justify-center rounded-full bg-gray wishlist-icon cursor-pointer"
                  onClick={() => setProductId(id)}
                >
                  <Heart size={20} />
                </div>
              )} */}
            </div>
          </div>
        </Link>
        <div className="w-full min-h-[25%] flex flex-col gap-2 px-4 pt-3 bg-[#f8f8f8]">
          <p className="text-size-500 font-medium first-letter:uppercase">{name}</p>
          <div className="w-full flex gap-2">
            <IndianRupee size={20} />
            <p className="text-size-500 font-medium">{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
