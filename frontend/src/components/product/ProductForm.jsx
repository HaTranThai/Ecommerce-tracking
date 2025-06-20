import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductForm = ({ products }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="container my-5 text-center">
        <p
          className="fs-5"
          style={{
            color: "#6b7280",
            textShadow: "0 2px 4px rgba(255, 105, 180, 0.3)",
            fontWeight: "bold",
          }}
        >
          Không có sản phẩm nào.
        </p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2
        className="text-center mb-5 fw-bold"
        style={{
          color: "#2e1065",
          textShadow: "0 3px 6px rgba(255, 105, 180, 0.4)",
          fontSize: "2.5rem",
        }}
      >
        Danh sách sản phẩm
      </h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
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
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(255, 105, 180, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.2)";
                }}
              >
                {/* Glowing Border Effect */}
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
                    className="bg-gradient d-flex align-items-center justify-content-center text-white"
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

                <div className="card-body p-4" style={{ position: "relative", zIndex: 1 }}>
                  <h3
                    className="card-title fs-5 fw-bold mb-3 anime-text"
                    style={{
                      color: "#2e1065",
                      textShadow: "0 2px 4px rgba(255, 105, 180, 0.4)",
                    }}
                  >
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
                  {product.discount > 0 && (
                    <p className="mb-2">
                      <strong className="text-muted">Giảm giá:</strong>{" "}
                      <span
                        className="text-danger"
                        style={{ color: "#ef4444", fontWeight: "bold" }}
                      >
                        {product.discount}%
                      </span>
                    </p>
                  )}
                  <p className="mb-2">
                    <strong className="text-muted">Loại:</strong>{" "}
                    <span style={{ color: "#6b7280", fontWeight: "bold" }}>
                      {product.category}
                    </span>
                  </p>
                  <p className="mb-2">
                    <strong className="text-muted">Trạng thái:</strong>{" "}
                    <span
                      className={product.status === "available" ? "text-success" : "text-danger"}
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
      `}</style>
    </div>
  );
};

export default ProductForm;