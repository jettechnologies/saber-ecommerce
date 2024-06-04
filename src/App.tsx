import { Routes, Route } from "react-router-dom";
import { routes } from "./config/router/paths";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import OTP from "./pages/auth/OTP";

//max-w-sm mx-auto md:max-w-screen-lg

function App() {
  return (
    <>
      <div className="max-container min-h-screen font-roboto">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={routes.ABOUT} element={<About />} />
          <Route path="/store/:category?/:search?" element={<Store />} />
          <Route path="/auth/login" element = {<Signin />}></Route>
          <Route path="/auth/signup" element = {<Signup />}></Route>
          <Route path="/auth/otp" element = {<OTP />}></Route>
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
