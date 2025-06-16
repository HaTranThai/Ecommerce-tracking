import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateProfileForm = ({ user, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      full_name: e.target.full_name.value,
      phone: e.target.phone.value,
      gender: e.target.gender.value,
      birth_date: e.target.birth_date.value,
      address: e.target.address.value,
    };
    onSubmit(updatedData);
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0" style={{ background: "linear-gradient(135deg, #f8f9fa, #e9ecef)", borderRadius: "15px" }}>
        <div className="card-body p-5">
          <h3 className="text-center mb-4 fw-bold" style={{ color: "#343a40" }}>Cập nhật thông tin cá nhân</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="full_name" className="form-label text-muted">Họ tên:</label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  className="form-control shadow-sm"
                  defaultValue={user.full_name}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label text-muted">Số điện thoại:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control shadow-sm"
                  defaultValue={user.phone}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="gender" className="form-label text-muted">Giới tính:</label>
                <select
                  id="gender"
                  name="gender"
                  className="form-select shadow-sm"
                  defaultValue={user.gender || ""}
                >
                  <option value="">-- Chọn --</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="birth_date" className="form-label text-muted">Ngày sinh:</label>
                <input
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  className="form-control shadow-sm"
                  defaultValue={user.birth_date}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="address" className="form-label text-muted">Địa chỉ:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control shadow-sm"
                  defaultValue={user.address}
                />
              </div>
              <div className="col-md-12 text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-5 py-2 fw-bold shadow-sm"
                  style={{ transition: "transform 0.3s, background 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;