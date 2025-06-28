import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getProduct } from "../api/productApi/getProduct";
import { buyProduct } from "../api/orderApi/buyProduct";
import { addCart } from "../api/cartApi/addCartItem";
import "../styles/CartFly.css"; // 🔔 THÊM dòng này để import CSS animation

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showFlyIcon, setShowFlyIcon] = useState(false);

  const handleAddToCart = async () => {
    try {
      await addCart(id, 1);
      // Hiện hiệu ứng icon bay
      setShowFlyIcon(true);
      setTimeout(() => setShowFlyIcon(false), 1000); // ẩn sau 1 giây
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      alert("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.");
    }
  };

  const handleBuyNow = async () => {
    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
      alert("Số lượng không hợp lệ");
      return;
    }

    try {
      const response = await buyProduct(id, parsedQuantity);
      console.log("Mua sản phẩm thành công:", response);
    } catch (error) {
      console.error("Lỗi khi mua sản phẩm:", error);
      alert("Đã xảy ra lỗi khi mua sản phẩm.");
    }
  };

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

  if (!product) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  const discountPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="container my-5 position-relative">
      {/* Hiệu ứng icon bay lên */}
      {showFlyIcon && <div className="cart-fly-icon">🛒</div>}

      <div className="card shadow-lg border-0" style={{ borderRadius: "15px" }}>
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
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
              </div>
            )}
            <div className="col-md-7">
              <h2 className="fw-bold mb-3">{product.name}</h2>
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
              <div className="mt-4">
                {product.status === "available" ? (
                  <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                    🛒 Thêm vào giỏ hàng
                  </button>
                ) : (
                  <button className="btn btn-secondary btn-lg" disabled>
                    Hết hàng
                  </button>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Số lượng:</label>
                <input
                  type="number"
                  id="quantity"
                  className="form-control"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <button className="btn btn-success" onClick={handleBuyNow}>
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
