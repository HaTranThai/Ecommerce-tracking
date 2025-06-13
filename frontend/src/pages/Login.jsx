import React, { useState } from "react";
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
      // Lưu token, redirect...
      navigate("/home");
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
    <div style={{ maxWidth: 500, margin: "auto", padding: "2rem" }}>
      {isRegistering ? (
        <>
          <RegisterForm onSubmit={handleRegister} />
          <p>
            Đã có tài khoản?{" "}
            <button onClick={() => setIsRegistering(false)}>Đăng nhập</button>
          </p>
        </>
      ) : (
        <>
          <LoginForm onSubmit={handleLogin} />
          <p>
            Chưa có tài khoản?{" "}
            <button onClick={() => setIsRegistering(true)}>Đăng ký</button>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
