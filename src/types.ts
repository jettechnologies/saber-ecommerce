
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

// data type for userProfile
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
  favourites: FavoriteProductType[]; // Adjust the type of favourites if you have a more specific type for the favourite items
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

// interface FavouriteType {
//   id: number;
//   createdAt: string;
  // product: {
  //   id: number;
  //   productID: string;
  //   name: string;
  //   price: string;
  //   hasTax: boolean;
  //   taxRate: string;
  //   wholesalePrice: string;
  //   minWholesaleQuantity: number;
  //   productImage: string;
  //   description: string;
  //   stock: number;
  //   restockedAT: string | null;
  //   stockAdjustedAT: string | null;
  //   availability: string;
  //   isOutOfStock: boolean;
  //   available_colors: string;
  //   available_sizes: string;
  //   weight: string | null;
  //   purchaseCount: number;
  //   createdAT: string;
  //   updatedAT: string | null;
  //   affiliateLink: string | null;
  // };
// }

export interface Product {
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
  affiliateLink: string | null;
}

export interface FavoriteProductType {
  id: number;
  createdAt: string;
  product: Product;
}

// user type for the user object in the order object
interface User {
  id: number;
  userID: string;
  email: string;
  role: string;
  DOB: string | null;
  age: number | null;
  password: string;
  mobile: string;
  fullname: string;
  cityOfResidence: string;
  UpdatedAt: string;
  RegisteredAt: string;
  home_address: string;
  profile_picture: string;
  LGA_of_Home_Address: string | null;
  gender: string;
  Nationality: string | null;
  totalRevenue: string;
  isLoggedIn: boolean;
  isRegistered: boolean;
  isVerified: boolean;
  reset_link_exptime: string | null;
  password_reset_link: string | null;
}

interface OrderItem {
  product: Product;
  quantity: number;
  price: string;
  id: number;
}

interface Order {
  orderID: string;
  subTotal: number;
  shippinFee: string;
  total: number;
  isPaid: boolean;
  createdAT: string;
  trackingID: string;
  status: string;
  weight: number;
  user: User;
  items: OrderItem[];
  name: string | null;
  mobile: string | null;
  billing_address: string | null;
  email: string | null;
  discount: number | null;
  IsCouponCodeApplied: boolean;
  orderType: string | null;
  paymentMethod: string | null;
  updatedAT: string | null;
  dropoffpincode: string | null;
  pickuppincode: string | null;
  id: number;
}