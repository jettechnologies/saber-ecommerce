// export interface ProductType {
//     product_id: number;
//     name: string;
//     description: string;
//     price: number;
//     category: string;
//     image: string;
//     availability: boolean;
//     rating: number;
//   }

export interface ProductType {
  availability: "in_stock" | "out_stock";
  available_colors: null | string;
  available_sizes: null | string;
  category: {
    id: number;
    name: string;
    description: string;
    createdAT: string;
    updatedAT: string;
  };
  createdAT: string;
  description: string;
  favourites: unknown[];
  hasTax: boolean;
  id: number;
  isOutOfStock: boolean;
  minWholesaleQuantity: number;
  name: string;
  price: string;
  productID: string;
  productImage: string;
  purchaseCount: number;
  restockedAT: null | string;
  stock: number;
  stockAdjustedAT: null | string;
  taxRate: string;
  updatedAT: null | string;
  video: unknown[];
  wholesalePrice: string;
}

export interface CategoryType{
  id: number;
  name: string;
  description: string;
  createdAT: string;
  updatedAT: string | null;
  banner: string;
}

// export interface CategoryTypeWithProduct extends CategoryType{
//   products: ProductType[];
// }

export interface CategoryTypeWithProduct{
  id: number;
  name: string;
  description: string;
  createdAT: string;
  updatedAT: string | null;
  banner: string;
  products: ProductType[];
}