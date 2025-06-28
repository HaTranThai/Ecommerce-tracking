import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductForm = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (products) {
      const uniqueCategories = Array.from(
        new Set(products.map((p) => p.category).filter(Boolean))
      );
      setCategories(["Tất cả", ...uniqueCategories]);
      setFilteredProducts(products);
    }
  }, [products]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === "Tất cả") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="container my-5 text-center">
        <p className="fs-5 text-muted fw-bold">Không có sản phẩm nào.</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2
          className="fw-bold"
          style={{
            color: "#2e1065",
            textShadow: "0 3px 6px rgba(255, 105, 180, 0.4)",
            fontSize: "2.5rem",
          }}
        >
          Danh sách sản phẩm
        </h2>

        <select
          className="form-select w-auto"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="row row-cols-1 row-cols-md-5 g-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col">
            <Link
              to={`/products/${product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="card h-100 border-0 anime-card"
                style={{
                  background: "linear-gradient(145deg, #ffebfe 0%, #d1e9ff 100%)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(255, 105, 180, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 15px rgba(0, 0, 0, 0.2)";
                }}
              >
                {/* Hiệu ứng viền glow */}
                <div
                  className="glow-border"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "20px",
                    background: "linear-gradient(45deg, #ff69b4, #00b7eb, #ff69b4)",
                    filter: "blur(8px)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                ></div>

                {/* Vùng ảnh hoặc fallback */}
                <div style={{ position: "relative" }}>
                  {/* Discount badge */}
                  {product.discount > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "#ef4444",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        zIndex: 2,
                      }}
                    >
                      -{product.discount}%
                    </div>
                  )}

                  {product.image ? (
                    <img
                      src={
                        product.image.startsWith("http")
                          ? product.image
                          : `http://localhost:8000${product.image}`
                      }
                      alt={product.name}
                      className="card-img-top"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                        borderRadius: "20px 20px 0 0",
                        transition: "transform 0.4s ease",
                      }}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center text-white"
                      style={{
                        height: "220px",
                        borderRadius: "20px 20px 0 0",
                        background: "linear-gradient(135deg, #a0c4ff, #c4b7ff)",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      Không có hình ảnh
                    </div>
                  )}
                </div>

                {/* Nội dung thẻ */}
                <div className="card-body p-4" style={{ position: "relative", zIndex: 1 }}>
                  <h3 className="card-title fs-6 fw-bold mb-3 anime-text two-line-ellipsis">
                    {product.name}
                  </h3>
                  <p className="mb-2">
                    <strong className="text-muted">Giá:</strong>{" "}
                    <span
                      className="text-primary"
                      style={{ color: "#db2777", fontWeight: "bold" }}
                    >
                      {product.price.toLocaleString()}₫
                    </span>
                  </p>
                  <p className="mb-2">
                    <strong className="text-muted">Loại:</strong>{" "}
                    <span style={{ color: "#6b7280", fontWeight: "bold" }}>
                      {product.category}
                    </span>
                  </p>
                  <p className="mb-2">
                    <strong className="text-muted">Trạng thái:</strong>{" "}
                    <span
                      className={
                        product.status === "available" ? "text-success" : "text-danger"
                      }
                      style={{
                        fontWeight: "bold",
                        color: product.status === "available" ? "#22c55e" : "#ef4444",
                      }}
                    >
                      {product.status === "available" ? "Còn hàng" : "Hết hàng"}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        .anime-card {
          animation: popIn 0.6s ease-out;
        }
        .glow-border:hover {
          opacity: 0.6;
        }
        .anime-text {
          transition: color 0.3s ease;
        }
        .anime-text:hover {
          color: #db2777;
        }
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .two-line-ellipsis {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.4em;
          height: 2.8em;
        }
      `}</style>
    </div>
  );
};

export default ProductForm;
