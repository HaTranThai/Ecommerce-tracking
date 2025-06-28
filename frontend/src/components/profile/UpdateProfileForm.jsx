import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateProfileForm = ({ user, onSubmit }) => {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(user.avatar || "/default-avatar.png");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("full_name", e.target.full_name.value);
    formData.append("phone", e.target.phone.value);
    formData.append("gender", e.target.gender.value);
    formData.append("birth_date", e.target.birth_date.value);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    onSubmit(formData); // gửi dữ liệu lên cha
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file)); // xem trước ảnh
    }
  };

  return (
    <div className="container my-5">
      <div
        className="card shadow-lg border-0"
        style={{
          background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
          borderRadius: "15px",
        }}
      >
        <div className="card-body p-5">
          <h3 className="text-center mb-4 fw-bold" style={{ color: "#343a40" }}>
            Cập nhật thông tin cá nhân
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="full_name" className="form-label text-muted">
                  Họ tên:
                </label>
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
                <label htmlFor="phone" className="form-label text-muted">
                  Số điện thoại:
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control shadow-sm"
                  defaultValue={user.phone}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="gender" className="form-label text-muted">
                  Giới tính:
                </label>
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
                <label htmlFor="birth_date" className="form-label text-muted">
                  Ngày sinh:
                </label>
                <input
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  className="form-control shadow-sm"
                  defaultValue={user.birth_date}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="avatar" className="form-label text-muted">
                  Ảnh đại diện:
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  className="form-control shadow-sm"
                  onChange={handleAvatarChange}
                />
              </div>

              <div className="col-md-6 d-flex align-items-center">
                <img
                  src={preview}
                  alt="Avatar Preview"
                  className="rounded-circle"
                  width={100}
                  height={100}
                />
              </div>

              <div className="col-md-12 text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-5 py-2 fw-bold shadow-sm"
                  style={{ transition: "transform 0.3s, background 0.3s" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
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
