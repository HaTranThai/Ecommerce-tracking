import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import MyProducts from "./pages/MyProducts";
import ProductDetail from "./pages/ProductDetail";
import UpdateProduct from "./pages/UpdateProduct";
import Navbar from "./styles/Navbar";

function AppRoutes() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
            </Routes>
            <Routes>
                <Route
                    path="/products/:id"
                    element={<ProductDetail />}
                />
            </Routes>
            <Routes>
                <Route
                    path="/products/:id/update"
                    element={<UpdateProduct  />}
                />
            </Routes>
            <Routes>
                <Route
                    path="/my-products"
                    element={<MyProducts />}
                />
            </Routes>     
            <Routes>
                <Route
                    path="/login"
                    element={<Login />}
                />
            </Routes>
            <Routes>
                <Route
                    path="/profile"
                    element={<Profile />}
                />
            </Routes>
        </Router>
    );
}

export default AppRoutes;