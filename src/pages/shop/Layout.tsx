import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <main className="max-container min-h-screen font-roboto">
        <Navbar />
        <Outlet />
        <Footer />
    </main>
  )
}

export default Layout