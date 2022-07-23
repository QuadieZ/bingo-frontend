import { useLocation, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const ProtectedRoutes = ({ children }) => {
    const cookies = new Cookies();
    const location = useLocation();

    const token = cookies.get("TOKEN");
    
    if (!token) {
        return <Navigate to="/" state={{ from: location }} replace />;
    } else {
        return children
    }
}