import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GetProfileForm = ({ user }) => {
  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0" style={{ background: "linear-gradient(135deg, #f8f9fa, #e9ecef)", borderRadius: "15px" }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-4 fw-bold" style={{ color: "#343a40" }}>Thông tin cá nhân</h2>
          <div className="text-center mb-4">
            {user?.avatar ? (
              <img
                src={`http://localhost:8000${user.avatar}`}
                alt="Avatar"
                className="rounded-circle img-fluid shadow-sm"
                style={{ width: "180px", height: "180px", objectFit: "cover", transition: "transform 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            ) : (
              <div
                className="bg-gradient bg-primary rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm"
                style={{ width: "180px", height: "180px", fontSize: "1.2rem", transition: "transform 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Chưa có ảnh
              </div>
            )}
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <p className="mb-2"><strong className="text-muted">Họ tên:</strong> <span className="text-dark">{user.full_name || "..."}</span></p>
            </div>
            <div className="col-md-6">
              <p className="mb-2"><strong className="text-muted">Số điện thoại:</strong> <span className="text-dark">{user.phone || "..."}</span></p>
            </div>
            <div className="col-md-6">
              <p className="mb-2"><strong className="text-muted">Giới tính:</strong> <span className="text-dark">{user.gender || "..."}</span></p>
            </div>
            <div className="col-md-6">
              <p className="mb-2"><strong className="text-muted">Ngày sinh:</strong> <span className="text-dark">{user.birth_date || "..."}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetProfileForm;