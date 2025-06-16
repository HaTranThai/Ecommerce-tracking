import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const RedirectRoute = ({ children }) => {
    const token = Cookies.get("authToken");
    return token ? <Navigate to="/" /> : children;
};

export default RedirectRoute;
