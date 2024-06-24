
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

export interface CategoryTypeWithProduct{
  id: number;
  name: string;
  description: string;
  createdAT: string;
  updatedAT: string | null;
  banner: string;
  products: ProductType[];
}

// Define the Item interface
export interface Items {
  id: string;
  quantity: number;
  price: string;
  color: string;
  sizes: string;
  addedAT: string;
  product: ProductType;
}

// Define the Cart interface
export interface CartType {
  id: number;
  isCheckedOut: boolean;
  items: Items[];
}

export interface UserProfile {
  DOB: string | null;
  LGA_of_Home_Address: string | null;
  Nationality: string | null;
  RegisteredAt: string;
  UpdatedAt: string | null;
  age: number | null;
  carts: any[]; // Adjust the type of carts if you have a more specific type for the cart items
  cityOfResidence: string | null;
  email: string;
  favourites: any[]; // Adjust the type of favourites if you have a more specific type for the favourite items
  fullname: string;
  gender: string | null;
  home_address: string | null;
  id: number;
  isLoggedIn: boolean;
  isRegistered: boolean;
  isVerified: boolean;
  mobile: string;
  password: string;
  password_reset_link: string | null;
  profile_picture: string | null;
  reset_link_exptime: string | null;
  role: string;
  totalRevenue: string;
  userID: string;
}

export interface FavoriteProductType {
  id: number;
  createdAt: string;
  product: {
    id: number;
    productID: string;
    name: string;
    price: string;
    hasTax: boolean;
    taxRate: string;
    wholesalePrice: string;
    minWholesaleQuantity: number;
    productImage: string;
    description: string;
    stock: number;
    restockedAT: string | null;
    stockAdjustedAT: string | null;
    availability: string;
    isOutOfStock: boolean;
    available_colors: string;
    available_sizes: string;
    weight: number | null;
    purchaseCount: number;
    createdAT: string;
    updatedAT: string | null;
  };
}
