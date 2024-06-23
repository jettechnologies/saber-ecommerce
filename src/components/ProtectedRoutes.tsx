import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "@/context/authContext"

const ProtectedRoutes = () => {

    const { token, isLogin } = useAuth();

  return (
    (token && isLogin) ? <Outlet/> : <Navigate to = "/auth/login"/>
  )
}

export default ProtectedRoutes