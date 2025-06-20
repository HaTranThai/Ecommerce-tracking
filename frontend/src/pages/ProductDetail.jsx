import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getProduct } from "../api/productApi/getProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data.product || data);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-3 text-muted">Đang tải sản phẩm...</p>
      </div>
    );

  const discountPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0" style={{ background: "linear-gradient(135deg, #f8f9fa, #e9ecef)", borderRadius: "15px" }}>
        <div className="card-body p-5">
          <div className="row g-4">
            {product.image && (
              <div className="col-md-5 text-center">
                <img
                  src={
                    product.image.startsWith("http")
                      ? product.image
                      : `http://localhost:8000${product.image}`
                  }
                  alt={product.name}
                  className="img-fluid rounded shadow-sm"
                  style={{
                    maxHeight: "400px",
                    objectFit: "cover",
                    transition: "transform 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
            )}
            <div className="col-md-7">
              <h2 className="fw-bold mb-3" style={{ color: "#343a40" }}>
                {product.name}
              </h2>
              <p className="mb-2">
                <span className="text-muted">Giá gốc:</span>{" "}
                <span className="text-decoration-line-through text-secondary">
                  {product.price.toLocaleString()}₫
                </span>
              </p>
              <p className="mb-2">
                <span className="text-muted">Giảm giá:</span> {product.discount}% ➜{" "}
                <strong className="text-primary fs-5">{discountPrice.toLocaleString()}₫</strong>
              </p>
              <p className="mb-2">
                <span className="text-muted">Tồn kho:</span> {product.inventory}
              </p>
              <p className="mb-2">
                <span className="text-muted">Trạng thái:</span>{" "}
                <span className={product.status === "available" ? "text-success" : "text-danger"}>
                  {product.status === "available" ? "Còn hàng" : "Hết hàng"}
                </span>
              </p>
              <p className="mb-0">
                <span className="text-muted">Mô tả:</span> {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;