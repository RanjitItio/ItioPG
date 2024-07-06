import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authProvider";



const ProtectedRoute = () => {
    const { token } = useAuth();
  
    if (!token) {
      return <Navigate to="/signin/" />;
    }

    return <Outlet />;

  };


export default ProtectedRoute;



  