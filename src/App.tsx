import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./config/router/paths";
import { Home, AboutUs, Store, Signin, Signup, OTP, Detail, Success, Layout } from "./pages/shop";
import UserLayout from "@/pages/shop/users/UserLayout";
import UserProfile from "@/pages/shop/users/UserProfile";
import Orders from "@/pages/shop/users/Orders";
import Wishlist from "@/pages/shop/users/Wishlist";
import EditAccount from "./pages/shop/users/EditAccount";
import ResetUserPassword from "./pages/shop/users/ResetUserPassword";
import Checkout from "./pages/shop/Checkout";
import Cart from "./pages/shop/Cart";
import Terms from "./pages/shop/Terms";
import ReturnPolicy from "./pages/shop/ReturnPolicy";
import PrivacyPolicy from "./pages/shop/PrivacyPolicy";
import ProtectedRoutes from "./components/ProtectedRoutes";
import VerifyEmail from "./pages/shop/auth/VerifyEmail";
import ResetOTP from "./pages/shop/auth/ResetOTP";
import ResetPassword from "./pages/shop/auth/ResetPassword";
import PaymentGateway from "./pages/shop/PaymentGateway";
import TrackOrder from "./pages/shop/TrackOrder";
import ContactUs from "./pages/shop/Contact";
import '@ionic/react/css/core.css';
import "@/theme/variable.css";
import { setupIonicReact } from '@ionic/react';
import Categories from "./pages/ion_pages/Categories";
import Settings from "./pages/ion_pages/Settings";
import Accounts from "./pages/ion_pages/Accounts";
import CourierService from "./pages/shop/CourierService";
import PaymentSuccess from "./pages/shop/PaymentSuccess";
import PaymentFailure from "./pages/shop/PaymentFailure";
import ProductFeedback from "./pages/shop/ProductFeedback";

setupIonicReact();


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element = {<Layout />}>
        <Route index element={<Home />} />
        {/* <Route element={<Home />} /> */}
        <Route path={routes.ABOUT} element={<AboutUs />} />
        <Route path="/store/:category?" element={<Store />} />
        <Route path="/categories" element={<Categories />} />
        <Route path = "/account" element = {<Accounts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path = "/contact-us" element = {<ContactUs />} />
        <Route path="/auth/login" element = {<Signin />}/>
        <Route path="/auth/signup" element = {<Signup />} />
        <Route path="/auth/otp" element = {<OTP />} />
        <Route path="/reset-password">
          <Route index element = {<ResetPassword />} />
          <Route path="otp" element = {<ResetOTP />} />
          <Route path="verify-email" element = {<VerifyEmail />} />
        </Route>
        <Route path="/product/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path = "/order/track" element = {<TrackOrder />} />
        {/* Protected users routes */}
        <Route element = {<ProtectedRoutes />}>
          <Route path="/user"  element = {<UserLayout />}>
            <Route index element={<Navigate to="profile" />} />
            <Route path="profile" element = {<UserProfile />} />
            <Route path="orders" element = {<Orders />} />
            <Route path = "wishlist" element = {<Wishlist />} />
          </Route>
          <Route path="/user/edit-account" element = {<EditAccount />} />
          <Route path="/user/reset-password" element = {<ResetUserPassword />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path = "/courier-service" element = {<CourierService />}/>
          <Route path = "/payment-gateway" element = {<PaymentGateway />} />
          <Route path = "/payment-success" element = {<PaymentSuccess />} />
          <Route path = "/payment-failure" element = {<PaymentFailure />} />
          <Route path = "/product-feedback" element = {<ProductFeedback />} />
          <Route path="/success" element={<Success />} />
        </Route>
        <Route path = "/terms-and-condition" element = {<Terms />} />
        <Route path = "/refund-policy" element = {<ReturnPolicy />} />
        <Route path = "/privacy-policy" element = {<PrivacyPolicy />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
