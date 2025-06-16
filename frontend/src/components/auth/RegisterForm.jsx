import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterForm = ({ onSubmit }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ full_name: fullName, email, password });
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 mx-auto" style={{ background: "linear-gradient(135deg, #f8f9fa, #e9ecef)", borderRadius: "15px", maxWidth: "500px" }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-4 fw-bold" style={{ color: "#343a40" }}>Đăng ký</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label text-muted">Họ tên:</label>
              <input
                type="text"
                id="fullName"
                className="form-control shadow-sm"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-muted">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control shadow-sm"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label text-muted">Mật khẩu:</label>
              <input
                type="password"
                id="password"
                className="form-control shadow-sm"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary px-5 py-2 fw-bold shadow-sm"
                style={{ transition: "transform 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;