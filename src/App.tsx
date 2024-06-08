import { Routes, Route } from "react-router-dom";
import { routes } from "./config/router/paths";
// import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";
import { Home, AboutUs, Store, Signin, Signup, OTP, Detail, Cart, Success, Layout } from "./pages/shop";

//max-w-sm mx-auto md:max-w-screen-lg

function App() {
  return (
    <>
    <Routes>
      <Route element = {<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path={routes.ABOUT} element={<AboutUs />} />
        <Route path="/store/:category?/:search?" element={<Store />} />
        <Route path="/auth/login" element = {<Signin />}></Route>
        <Route path="/auth/signup" element = {<Signup />}></Route>
        <Route path="/auth/otp" element = {<OTP />}></Route>
        <Route path="/product/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
