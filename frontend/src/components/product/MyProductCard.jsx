import React, { useState } from "react";
import { deleteProduct } from "../../api/productApi/deleteProduct";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductCard = ({ product, setProducts }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      setShowConfirm(false);
    } catch (error) {
      alert("Lỗi khi xóa sản phẩm: " + (error.message || "Không rõ"));
    }
  };

  return (
    <>
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
        {/* Glow border */}
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
            src={product.image.startsWith("http") ? product.image : `http://localhost:8000${product.image}`}
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
          <h5 className="card-title fw-bold mb-3 anime-text" style={{ color: "#2e1065", textShadow: "0 2px 4px rgba(255, 105, 180, 0.4)", fontSize: "1.5rem" }}>
            {product.name}
          </h5>
          <p className="card-text mb-2">
            <strong className="text-muted">Giá:</strong>{" "}
            <span style={{ color: "#db2777", fontWeight: "bold" }}>{product.price.toLocaleString()}₫</span>
          </p>
          <p className="card-text mb-4">
            <strong className="text-muted">Tồn kho:</strong>{" "}
            <span style={{ fontWeight: "bold", color: product.inventory > 0 ? "#22c55e" : "#ef4444" }}>
              {product.inventory}
            </span>
          </p>
          <div className="d-flex gap-2">
            <Link to={`/products/${product.id}`} className="btn anime-btn anime-btn-view fw-medium flex-grow-1">
              Xem chi tiết
            </Link>
            <Link to={`/products/${product.id}/update`} className="btn anime-btn anime-btn-edit fw-medium flex-grow-1">
              Chỉnh sửa
            </Link>
            <button onClick={() => setShowConfirm(true)} className="btn btn-danger btn-sm anime-btn-delete">
              Xóa
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {showConfirm && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Xác nhận xóa</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
              </div>
              <div className="modal-body">
                <p>Bạn có chắc chắn muốn xóa sản phẩm <strong>{product.name}</strong> không?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                  Hủy
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Xác nhận xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
        .anime-btn:hover {
          transform: scale(1.1);
        }
        .anime-btn-view {
          background: linear-gradient(135deg, #3b82f6, #1e3a8a);
          color: #fff;
        }
        .anime-btn-view:hover {
          background: linear-gradient(135deg, #1e3a8a, #1e40af);
        }
        .anime-btn-edit {
          background: linear-gradient(135deg, #f59e0b, #b45309);
          color: #fff;
        }
        .anime-btn-edit:hover {
          background: linear-gradient(135deg, #b45309, #92400e);
        }
        .anime-btn-delete {
          background: linear-gradient(135deg, #dc2626, #991b1b);
          color: #fff;
        }
        .anime-btn-delete:hover {
          background: linear-gradient(135deg, #991b1b, #7f1d1d);
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
    </>
  );
};

export default ProductCard;
