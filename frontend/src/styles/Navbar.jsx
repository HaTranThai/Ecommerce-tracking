import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { getUserInfor } from "../api/userApi/userInfor";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!Cookies.get("authToken");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserInfor();
        setUser(data.user);
      } catch (error) {
        console.error("Không thể lấy thông tin người dùng:", error);
      }
    };

    if (isLoggedIn) fetchUser();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      Cookies.remove("authToken");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ background: "linear-gradient(90deg, #343a40, #495057)" }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/" style={{ fontSize: "1.5rem", color: "#f8f9fa" }}>
          Tracking Ecommerce Shop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: "#f8f9fa", padding: "0.5rem 1rem" }}>
                Trang chủ
              </Link>
            </li>

            {!isLoggedIn ? (
              <li className="nav-item">
                <Link
                  className="nav-link btn btn-outline-light px-3 py-1 ms-2"
                  to="/login"
                  style={{ borderRadius: "10px", transition: "transform 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Đăng nhập
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div
                  className="nav-link d-flex align-items-center"
                  style={{ cursor: "pointer", color: "#f8f9fa", padding: "0.5rem 1rem" }}
                >
                  <img
                    src={user?.avatar ? `http://localhost:8000${user.avatar}` : "/default-avatar.png"}
                    alt="avatar"
                    className="rounded-circle me-2 shadow-sm"
                    style={{ width: "35px", height: "35px", objectFit: "cover", transition: "transform 0.3s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <span className="fw-medium">{user?.full_name || "Tài khoản"}</span>
                </div>

                <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`} style={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                  <li>
                    <Link className="dropdown-item" to="/profile" style={{ padding: "0.5rem 1.5rem", color: "#343a40" }}>
                      Tài Khoản Của Tôi
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/orders" style={{ padding: "0.5rem 1.5rem", color: "#343a40" }}>
                      Đơn Mua
                    </Link>
                  </li>
                  <li>
                    <span
                      className="dropdown-item"
                      onClick={handleLogout}
                      style={{ padding: "0.5rem 1.5rem", color: "#dc3545", cursor: "pointer" }}
                    >
                      Đăng Xuất
                    </span>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;