import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getProduct } from "../api/productApi/getProduct";
import { updateProduct } from "../api/productApi/updateProduct";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct(id);
        const p = data.product || data;
        setProduct(p);
        setFormData({
          name: p.name || "",
          price: p.price || "",
          description: p.description || "",
          image: null,
        });
      } catch (error) {
        console.error("Không thể lấy sản phẩm:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("price", formData.price);
    payload.append("description", formData.description);
    if (formData.image) {
      payload.append("image", formData.image);
    }

    try {
      await updateProduct(id, payload);
      alert("Cập nhật thành công!");
      navigate("/my-products");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      alert("Cập nhật thất bại.");
    }
  };

  if (!product)
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-3 text-muted">Đang tải sản phẩm...</p>
      </div>
    );

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0" style={{ background: "linear-gradient(135deg, #f8f9fa, #e9ecef)", borderRadius: "15px" }}>
        <div className="card-body p-5">
          <h2 className="text-center fw-bold mb-4" style={{ color: "#343a40" }}>
            Cập nhật sản phẩm
          </h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label text-muted">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control shadow-sm"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="price" className="form-label text-muted">
                  Giá
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="form-control shadow-sm"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="description" className="form-label text-muted">
                  Mô tả
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control shadow-sm"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>
              <div className="col-12">
                <label htmlFor="image" className="form-label text-muted">
                  Hình ảnh (tùy chọn)
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="form-control shadow-sm"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {product.image && (
                  <img
                    src={
                      product.image.startsWith("http")
                        ? product.image
                        : `http://localhost:8000${product.image}`
                    }
                    alt={product.name}
                    className="mt-3 rounded shadow-sm"
                    style={{ maxWidth: "250px", height: "auto", objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="col-12 text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-5 py-2 fw-bold shadow-sm"
                  style={{ transition: "transform 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;