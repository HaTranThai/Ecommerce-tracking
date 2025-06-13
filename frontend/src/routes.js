import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Login from "./pages/Login";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={<Login />}
                />
                {/* Bạn có thể thêm các route khác sau này tại đây */}
            </Routes>
        </Router>
    );
}

export default AppRoutes;