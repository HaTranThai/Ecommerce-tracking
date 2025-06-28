import React from "react";
import "../../styles/modal.css"; // tạo file css riêng nếu muốn

const AddressFormModal = ({ show, handleClose, address, onSubmit }) => {
  const isEdit = Boolean(address);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...(address || {}),
      full_name: e.target.full_name.value,
      phone: e.target.phone.value,
      address_line: e.target.address_line.value,
      city: e.target.city.value,
      district: e.target.district.value,
      ward: e.target.ward.value,
    };
    onSubmit(updated);
    handleClose();
  };

  if (!show) return null;

  // fallback nếu address null
  const safeAddress = address || {
    full_name: "",
    phone: "",
    address_line: "",
    city: "",
    district: "",
    ward: "",
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h4>{isEdit ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}</h4>
        <form onSubmit={handleSubmit}>
          <input name="full_name" defaultValue={safeAddress.full_name} placeholder="Họ tên" required />
          <input name="phone" defaultValue={safeAddress.phone} placeholder="Số điện thoại" />
          <input name="address_line" defaultValue={safeAddress.address_line} placeholder="Địa chỉ" />
          <input name="city" defaultValue={safeAddress.city} placeholder="Thành phố" />
          <input name="district" defaultValue={safeAddress.district} placeholder="Quận/Huyện" />
          <input name="ward" defaultValue={safeAddress.ward} placeholder="Phường/Xã" />
          <div className="modal-buttons">
            <button type="submit">{isEdit ? "Cập nhật" : "Thêm mới"}</button>
            <button type="button" onClick={handleClose}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressFormModal;
