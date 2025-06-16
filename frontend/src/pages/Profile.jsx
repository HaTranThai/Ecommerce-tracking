import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUserInfor, updateUserInfor } from "../api/userApi/userInfor";
import GetProfileForm from "../components/profile/GetProfileForm";
import UpdateProfileForm from "../components/profile/UpdateProfileForm";

const Profile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserInfor();
        setUser(data.user);
      } catch (error) {
        console.error("Không thể lấy thông tin người dùng:", error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdateUser = async (updatedData) => {
    try {
      const updatedUser = await updateUserInfor(updatedData);
      setUser(updatedUser.user);
      console.log("Cập nhật thành công:", updatedUser.user);
      setIsUpdating(false);
    } catch (error) {
      console.error("Cập nhật thất bại:", error);
    }
  };

  if (!user)
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-3 text-muted">Đang tải...</p>
      </div>
    );

  return (
    <div className="container my-5">
      {isUpdating ? (
        <div className="fade-in">
          <UpdateProfileForm user={user} onSubmit={handleUpdateUser} />
          <div className="text-center mt-4">
            <button
              className="btn btn-secondary px-5 py-2 fw-bold shadow-sm"
              onClick={() => setIsUpdating(false)}
              style={{ transition: "transform 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Quay lại
            </button>
          </div>
        </div>
      ) : (
        <div className="fade-in">
          <GetProfileForm user={user} />
          <div className="text-center mt-4">
            <button
              className="btn btn-primary px-5 py-2 fw-bold shadow-sm"
              onClick={() => setIsUpdating(true)}
              style={{ transition: "transform 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Cập nhật thông tin
            </button>
          </div>
        </div>
      )}
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

export default Profile;