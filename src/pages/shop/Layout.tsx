import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = () => {

  return (
    <>
      <Navbar />
      <main className="max-container min-h-screen font-roboto">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout