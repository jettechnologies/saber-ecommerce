import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./config/router/paths";
import { Home, AboutUs, Store, Signin, Signup, OTP, Detail, Success, Layout } from "./pages/shop";
import UserLayout from "@/pages/shop/users/UserLayout";
import UserProfile from "@/pages/shop/users/UserProfile";
import Orders from "@/pages/shop/users/Orders";
import Wishlist from "@/pages/shop/users/Wishlist";
import EditAccount from "./pages/shop/users/EditAccount";
import ResetPassword from "./pages/shop/users/ResetPassword";
import Checkout from "./pages/shop/Checkout";
import Cart from "./pages/shop/Cart";
import Terms from "./pages/shop/Terms";
import ReturnPolicy from "./pages/shop/ReturnPolicy";
import PrivacyPolicy from "./pages/shop/PrivacyPolicy";
import ProtectedRoutes from "./components/ProtectedRoutes";


function App() {

  return (
    <>
    <Routes>
      <Route element = {<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path={routes.ABOUT} element={<AboutUs />} />
        <Route path="/store/:category?" element={<Store />} />
        <Route path="/auth/login" element = {<Signin />}></Route>
        <Route path="/auth/signup" element = {<Signup />}></Route>
        <Route path="/auth/otp" element = {<OTP />}></Route>
        <Route path="/product/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        {/* Protected users routes */}
        <Route element = {<ProtectedRoutes />}>
          <Route path="/user"  element = {<UserLayout />}>
            <Route index element={<Navigate to="profile" />} />
            <Route path="profile" element = {<UserProfile />} />
            <Route path="orders" element = {<Orders />} />
            <Route path = "wishlist" element = {<Wishlist />} />
          </Route>
          <Route path="/user/edit-account" element = {<EditAccount />} />
          <Route path="/user/reset-password" element = {<ResetPassword />} />
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
