import React, { useEffect, useState } from "react";
import { getMyProducts } from "../api/productApi/myProducts";
import { createProduct } from "../api/productApi/createProduct";
import ProductCard from "../components/product/MyProductCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    inventory: "",
    status: "available",
    image: null,
  });
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const data = await getMyProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const newProduct = await createProduct(form);
      setProducts((prev) => [newProduct.product, ...prev]);
      setForm({
        name: "",
        description: "",
        price: "",
        discount: "",
        category: "",
        inventory: "",
        status: "available",
        image: null,
      });
      setError(null);
      setShowForm(false); // Hide form after successful submission
    } catch (err) {
      console.error("Error creating product:", err);
      setError(err);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-5 text-dark">
        Quản lý sản phẩm của bạn
      </h2>

      {/* Toggle Button */}
      <div className="text-left mb-4">
        <button
          className="btn btn-primary px-4 fw-medium rounded-3"
          onClick={() => setShowForm(!showForm)}
        >
          <i className="bi bi-plus-circle me-2"></i>
          {showForm ? "Ẩn biểu mẫu" : "Thêm sản phẩm mới"}
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="card shadow-sm mb-5">
          <div className="card-body p-4">
            <h4 className="text-center fw-semibold mb-4 text-primary">
              Thêm sản phẩm mới
            </h4>
            <form onSubmit={handleCreate} encType="multipart/form-data">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-medium text-muted">
                    Tên sản phẩm <span className="text-danger">*</span>
                  </label>
                  <input
                    name="name"
                    className="form-control rounded-3"
                    placeholder="Nhập tên sản phẩm"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium text-muted">
                    Danh mục <span className="text-danger">*</span>
                  </label>
                  <input
                    name="category"
                    className="form-control rounded-3"
                    placeholder="Ví dụ: Áo, Quần, ..."
                    value={form.category}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-medium text-muted">
                    Giá bán (₫) <span className="text-danger">*</span>
                  </label>
                  <input
                    name="price"
                    type="number"
                    className="form-control rounded-3"
                    placeholder="VD: 100000"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-medium text-muted">
                    Giảm giá (%)
                  </label>
                  <input
                    name="discount"
                    type="number"
                    className="form-control rounded-3"
                    placeholder="VD: 10"
                    value={form.discount}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-medium text-muted">
                    Tồn kho <span className="text-danger">*</span>
                  </label>
                  <input
                    name="inventory"
                    type="number"
                    className="form-control rounded-3"
                    placeholder="VD: 100"
                    value={form.inventory}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium text-muted">
                    Trạng thái <span className="text-danger">*</span>
                  </label>
                  <select
                    name="status"
                    className="form-select rounded-3"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="available">Còn hàng</option>
                    <option value="out_of_stock">Hết hàng</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium text-muted">
                    Ảnh sản phẩm
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="form-control rounded-3"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-medium text-muted">
                    Mô tả sản phẩm
                  </label>
                  <textarea
                    name="description"
                    className="form-control rounded-3"
                    placeholder="Mô tả chi tiết về sản phẩm..."
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                  />
                </div>
                <div className="col-12 text-end">
                  <button
                    type="submit"
                    className="btn btn-primary px-4 fw-medium rounded-3"
                  >
                    <i className="bi bi-plus-circle me-2"></i>Thêm sản phẩm
                  </button>
                </div>
              </div>
              {error && (
                <div className="mt-4 alert alert-danger rounded-3">
                  <strong>Lỗi:</strong> {error.message || "Đã xảy ra lỗi."}
                  {error.errors?.image && (
                    <div>Ảnh: {error.errors.image.join(", ")}</div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-muted">
          <p>Chưa có sản phẩm nào. Hãy thêm sản phẩm mới!</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <ProductCard product={product} setProducts={setProducts} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;