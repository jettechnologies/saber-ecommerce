
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
export interface User {
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

export interface Order {
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

export interface CourierInfo {
  air_max_weight: string;
  assured_amount: number;
  base_courier_id: number | null;
  base_weight: string;
  blocked: number;
  call_before_delivery: string;
  charge_weight: number;
  city: string;
  cod: number;
  cod_charges: number;
  cod_multiplier: number;
  cost: string;
  courier_company_id: number;
  courier_name: string;
  courier_type: string;
  coverage_charges: number;
  cutoff_time: string;
  delivery_boy_contact: string;
  delivery_performance: number;
  description: string;
  edd: string;
  entry_tax: number;
  estimated_delivery_days: string;
  etd: string;
  etd_hours: number;
  freight_charge: number;
  id: number;
  is_custom_rate: number;
  is_hyperlocal: boolean;
  is_international: number;
  is_rto_address_available: boolean;
  is_surface: boolean;
  local_region: number;
  metro: number;
  min_weight: number;
  mode: number;
  new_edd: number;
  odablock: boolean;
  other_charges: number;
  others: string;
  pickup_availability: string;
  pickup_performance: number;
  pickup_priority: string;
  pickup_supress_hours: number;
  pod_available: string;
  postcode: string;
  qc_courier: number;
  rank: string;
  rate: number;
  rating: number;
  realtime_tracking: string;
  region: number;
  rto_charges: number;
  rto_performance: number;
  seconds_left_for_pickup: number;
  secure_shipment_disabled: boolean;
  ship_type: number;
  state: string;
  suppress_date: string;
  suppress_text: string;
  suppression_dates: string | null;
  surface_max_weight: string;
  tracking_performance: number;
  volumetric_max_weight: string | null;
  weight_cases: number;
  zone: string;
}

export interface CourierResponse {
  id: number;
  orderID: string;
  name: string;
  mobile: string;
  billing_address: string;
  billing_address_2: string | null;
  billing_city: string;
  billing_state: string;
  billing_pincode: string;
  email: string;
  availableCourierIds: string | null;
  subTotal: string;
  discount: string | null;
  IsCouponCodeApplied: boolean;
  shippinFee: number;
  total: string;
  isPaid: boolean;
  orderType: string | null;
  paymentMethod: string | null;
  createdAT: string;
  trackingID: string;
  status: string;
  updatedAT: string | null;
  shipmentID: string | null;
  awbCode: string | null;
  shiprocketPickupStatus: string | null;
  shiprocketPickupToken: string | null;
  pickuppincode: string | null;
  weight: string;
  courierInfo: {
    id: string;
    name: string;
  };
}

type ShoppingExperience =
  | 'Excellent'
  | 'Good'
  | 'Average'
  | 'Poor'
  | '';

type ProductBrowsingExperience =
  | 'Very Easy'
  | 'Easy'
  | 'Neutral'
  | 'Difficult'
  | '';

type ProductAndImageDescription =
  | 'Yes'
  | 'No'
  | '';

type CategoryProductAvailabilitySatisfaction =
  | 'Satisfactory'
  | 'Neutral'
  | 'Dissatisfactory'
  | '';

type LikelihoodOfWebsiteRecommendation =
  | 'Very Likely'
  | 'Neutral'
  | 'Not Likely'
  | '';

export interface FeedbackDto {
  email: string;
  shoppingExperience: ShoppingExperience;
  productBrowsingExperience: ProductBrowsingExperience;
  productImageDescription: ProductAndImageDescription;
  categoryProductAvailability: CategoryProductAvailabilitySatisfaction;
  likelihoodOfWebsiteRecommendation: LikelihoodOfWebsiteRecommendation;
  additionalSatisfactionOrFeedback?: string;
}

// enum values
// types.ts
export enum ShoppingExperienceEnum {
  Excellent = "Excellent",
  Good = "Good",
  Average = "Average",
  Poor = "Poor",
}

export enum ProductBrowsingExperienceEnum {
  VeryEasy = "Very Easy",
  Easy = "Easy",
  Average = "Average",
  Difficult = "Difficult",
}

export enum ProductAndImageDescriptionEnum {
  Yes = "Yes",
  No = "No",
}

export enum CategoryProductAvailabilitySatisfactionEnum {
  Satisfactory = "Satisfactory",
  Unsatisfactory = "Unsatisfactory",
}

export enum LikelihoodOfWebsiteRecommendationEnum {
  VeryLikely = "Very Likely",
  Likely = "Likely",
  Neutral = "Neutral",
  Unlikely = "Unlikely",
  VeryUnlikely = "Very Unlikely",
}
