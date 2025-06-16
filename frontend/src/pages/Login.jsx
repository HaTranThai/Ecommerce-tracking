import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await authApi.login(data);
      console.log("Đăng nhập thành công:", response.data);
      navigate("/profile");
    } catch (err) {
      console.error("Đăng nhập thất bại:", err.response?.data || err.message);
    }
  };

  const handleRegister = async (data) => {
    try {
      const response = await authApi.register(data);
      console.log("Đăng ký thành công:", response.data);
      setIsRegistering(false);
    } catch (err) {
      console.error("Đăng ký thất bại:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="fade-in">
            {isRegistering ? (
              <>
                <RegisterForm onSubmit={handleRegister} />
                <p className="text-center mt-3">
                  Đã có tài khoản?{" "}
                  <button
                    className="btn btn-link p-0 text-primary"
                    style={{ transition: "color 0.3s" }}
                    onClick={() => setIsRegistering(false)}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#0056b3")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#007bff")}
                  >
                    Đăng nhập
                  </button>
                </p>
              </>
            ) : (
              <>
                <LoginForm onSubmit={handleLogin} />
                <p className="text-center mt-3">
                  Chưa có tài khoản?{" "}
                  <button
                    className="btn btn-link p-0 text-primary"
                    style={{ transition: "color 0.3s" }}
                    onClick={() => setIsRegistering(true)}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#0056b3")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#007bff")}
                  >
                    Đăng ký
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;