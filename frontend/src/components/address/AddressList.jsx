import React, { useState } from "react";
import AddressFormModal from "./AddressFormModal";

const AddressList = ({ addresses, onUpdate, onAdd, onDelete }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // phân biệt giữa sửa và thêm

  const handleOpenModalToEdit = (address) => {
    setSelectedAddress(address);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleOpenModalToAdd = () => {
    setSelectedAddress(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAddress(null);
    setShowModal(false);
  };

  const handleSubmit = (formData) => {
    if (isEditing) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
    handleCloseModal();
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">Danh sách địa chỉ</h3>
        <button className="btn btn-success" onClick={handleOpenModalToAdd}>
          + Thêm địa chỉ
        </button>
      </div>

      {addresses.length === 0 && (
        <div className="alert alert-info">Bạn chưa có địa chỉ nào.</div>
      )}

      {addresses.map((addr, index) => (
        <div key={index} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{addr.full_name}</h5>
            <p>SĐT: {addr.phone}</p>
            <p>{addr.address_line}, {addr.ward}, {addr.district}, {addr.city}</p>

            <div className="mt-3">
              <button
                className="btn btn-outline-primary btn-sm me-2"
                onClick={() => handleOpenModalToEdit(addr)}
              >
                Cập nhật
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  if (window.confirm("Bạn có chắc muốn xóa địa chỉ này?")) {
                    onDelete(addr.id);
                  }
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {showModal && (
        <AddressFormModal
          show={showModal}
          handleClose={handleCloseModal}
          address={selectedAddress}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default AddressList;
