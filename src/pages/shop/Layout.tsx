import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { isNativePlatform } from "@/utils/platform";
import Header from "@/components/ionic/Header";
import { useUserProfile } from "@/context/userProfileContext";
import CustomTabs from "@/components/ionic/CustomTabs";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const isNative = isNativePlatform();
  const { user } = useUserProfile();
  const location = useLocation();
  const paths: string[] = location.pathname.split("/").filter(Boolean);
  const currentPath = paths.at(-1);

  const userInfo = user ? { name: user.fullname, profile_pic: user.profile_picture } : null;

  return (
    <>
      {isNative ? <Header user={userInfo} /> : <Navbar />}
      <main className={`max-container min-h-screen font-roboto ${isNative && !(currentPath?.includes("cart") || currentPath?.includes("checkout")) ? "pb-28" : ""}`}>
        <Outlet />
      </main>
      {isNative && !(currentPath?.includes("cart") || currentPath?.includes("checkout")) ? <CustomTabs /> : !isNative && <Footer />}
      {/* {isNative ? <CustomTabs /> : <Footer />} */}
    </>
  );
};

export default Layout;
