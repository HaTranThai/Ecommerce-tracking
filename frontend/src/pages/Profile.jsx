import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUserInfor, updateUserInfor } from "../api/userApi/userInfor";
import { getAddress } from "../api/addressApi/getAddress";
import { updateAddress } from "../api/addressApi/updateAddress";
import { addAddress } from "../api/addressApi/addAddress";
import { deleteAddress } from "../api/addressApi/deleteAddress";
import GetProfileForm from "../components/profile/GetProfileForm";
import UpdateProfileForm from "../components/profile/UpdateProfileForm";
import AddressList from "../components/address/AddressList";

const Profile = () => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("profileMode");
    return saved ? parseInt(saved) : 1;
  });

  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    localStorage.setItem("profileMode", mode);
  }, [mode]);

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

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddress();
        setAddresses(data);
      } catch (error) {
        console.error("Không thể lấy địa chỉ:", error);
      }
    };
    fetchAddresses();
  }, []);

  const handleUpdateUser = async (updatedData) => {
    try {
      const updatedUser = await updateUserInfor(updatedData);
      setUser(updatedUser.user);
      setMode(1); 
    } catch (error) {
      console.error("Cập nhật thất bại:", error);
    }
  };

  const handleUpdateAddress = async (updatedAddress) => {
    try {
      const data = await updateAddress(updatedAddress.id, updatedAddress);
      setAddresses((prevAddresses) =>
        prevAddresses.map((addr) => (addr.id === data.id ? data : addr))
      );
    } catch (err) {
      console.error("Lỗi cập nhật địa chỉ", err);
    }
  };

  const handleAddAddress = async (newAddress) => {
    try {
      const data = await addAddress(newAddress);
      setAddresses((prevAddresses) => [...prevAddresses, data]);
    } catch (err) { 
      console.error("Lỗi thêm địa chỉ", err);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteAddress(addressId);
      setAddresses((prevAddresses) =>
        prevAddresses.filter((addr) => addr.id !== addressId)
      );
    } catch (err) {
      console.error("Lỗi xóa địa chỉ", err);
    }
  };

  if (!user) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-3 text-muted">Đang tải thông tin người dùng...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="list-group">
            <button className={`list-group-item list-group-item-action ${mode === 1 ? "active" : ""}`} onClick={() => setMode(1)}>
              Thông tin cá nhân
            </button>
            <button className={`list-group-item list-group-item-action ${mode === 2 ? "active" : ""}`} onClick={() => setMode(2)}>
              Cập nhật thông tin
            </button>
            <button className={`list-group-item list-group-item-action ${mode === 3 ? "active" : ""}`} onClick={() => setMode(3)}>
              Địa chỉ giao hàng
            </button>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="col-md-9">
          {mode === 1 && <GetProfileForm user={user} />}
          {mode === 2 && <UpdateProfileForm user={user} onSubmit={handleUpdateUser} />}
          {mode === 3 && (
            <AddressList
              addresses={addresses}
              onUpdate={handleUpdateAddress}
              onAdd={handleAddAddress}
              onDelete={handleDeleteAddress}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
