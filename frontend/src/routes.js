import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Navbar from "./styles/Navbar";

function AppRoutes() {
    return (
        <Router>
            <Navbar />
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