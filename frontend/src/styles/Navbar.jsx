import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { getUserInfor } from "../api/userApi/userInfor";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { getCartItem } from "../api/cartApi/getCart";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!Cookies.get("authToken");
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const items = await getCartItem();
        const total = items.count;
        setCartCount(total);
      } catch (error) {
        console.error("Không thể lấy số lượng giỏ hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn]);

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
      Cookies.remove("refreshToken");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{
        background: "linear-gradient(90deg, #ff6bd6 0%, #6b6bff 100%)",
        borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold anime-text"
          to="/"
          style={{
            fontSize: "1.8rem",
            color: "#fff",
            textShadow: "0 2px 4px rgba(255, 105, 180, 0.5)",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ffebfe")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
        >
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
              <Link
                className="nav-link anime-link"
                to="/"
                style={{
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  fontWeight: "500",
                  transition: "transform 0.3s ease, text-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.textShadow = "0 2px 4px rgba(255, 105, 180, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.textShadow = "none";
                }}
              >
                Trang chủ
              </Link>
            </li>
            <Link
              className="nav-link position-relative"
              to="/cart"
              style={{
                color: "#fff",
                fontSize: "1.3rem",
                padding: "0.5rem",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              
              {!loading && cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>

            {!isLoggedIn ? (
              <li className="nav-item">
                <Link
                  className="nav-link btn px-4 py-1 ms-2 anime-btn"
                  to="/login"
                  style={{
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
                    color: "#fff",
                    border: "none",
                    transition: "transform 0.3s ease, background 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.background = "linear-gradient(135deg, #1e3a8a, #1e40af)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.background = "linear-gradient(135deg, #3b82f6, #1e3a8a)";
                  }}
                >
                  Đăng nhập
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle d-flex align-items-center anime-dropdown"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    cursor: "pointer",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    transition: "transform 0.3s ease, text-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.textShadow = "0 2px 4px rgba(255, 105, 180, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.textShadow = "none";
                  }}
                >
                  <img
                    src={user?.avatar ? `http://localhost:8000${user.avatar}` : "/default-avatar.png"}
                    alt="avatar"
                    className="rounded-circle me-2 shadow-sm"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      border: "2px solid #ff69b4",
                      transition: "border-color 0.3s ease",
                    }}
                  />
                  <span
                    className="fw-medium"
                    style={{
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {user?.full_name || "Tài khoản"}
                  </span>
                </div>

                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                  style={{
                    borderRadius: "12px",
                    border: "none",
                    background: "linear-gradient(145deg, #ffebfe 0%, #d1e9ff 100%)",
                    boxShadow: "0 6px 15px rgba(255, 105, 180, 0.4)",
                    minWidth: "220px",
                  }}
                >
                  <li>
                    <Link
                      className="dropdown-item anime-dropdown-item"
                      to="/profile"
                      style={{ color: "#2e1065", transition: "background 0.3s ease" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#ff69b4";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#2e1065";
                      }}
                    >
                      Tài Khoản Của Tôi
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item anime-dropdown-item"
                      to="/my-products"
                      style={{ color: "#2e1065", transition: "background 0.3s ease" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#ff69b4";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#2e1065";
                      }}
                    >
                      Sản Phẩm Đã Đăng
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item anime-dropdown-item"
                      to="/orders"
                      style={{ color: "#2e1065", transition: "background 0.3s ease" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#ff69b4";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#2e1065";
                      }}
                    >
                      Đơn Mua
                    </Link>
                  </li>
                  <li>
                    <span
                      className="dropdown-item anime-dropdown-item text-danger"
                      onClick={handleLogout}
                      style={{ cursor: "pointer", transition: "background 0.3s ease" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#ef4444";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#ef4444";
                      }}
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

      <style jsx>{`
        .anime-text:hover {
          color: #ffebfe !important;
        }
        .anime-link:hover {
          transform: scale(1.1);
          text-shadow: 0 2px 4px rgba(255, 105, 180, 0.5);
        }
        .anime-btn:hover {
          transform: scale(1.1);
          background: linear-gradient(135deg, #1e3a8a, #1e40af) !important;
        }
        .anime-dropdown:hover {
          transform: scale(1.05);
          text-shadow: 0 2px 4px rgba(255, 105, 180, 0.5);
        }
        .anime-dropdown-item {
          transition: background 0.3s ease, color 0.3s ease;
        }
        .anime-dropdown-item:hover {
          background:rgb(211, 4, 4) !important;
          color: #fff !important;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;