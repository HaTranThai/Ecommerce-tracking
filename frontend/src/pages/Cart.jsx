import React, { useState, useEffect } from "react";
import { getCart, getCartItem } from "../api/cartApi/getCart";
import { deleteCartItem } from "../api/cartApi/deleteCartItem";
import { patchCartItem } from "../api/cartApi/patchCartItem";
import { buyProductInCart } from "../api/orderApi/buyProductInCart";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartData = await getCart();
        setCart(cartData);
        const itemsData = await getCartItem();
        setCartItems(itemsData.results);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartData();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteCartItem(itemId);
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const handleUpdateItem = async (itemId, quantity) => {
    const parsedQuantity = parseInt(quantity);

    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
      console.warn("❗ Số lượng không hợp lệ:", quantity);
      return;
    }

    try {
      await patchCartItem(itemId, parsedQuantity);
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity: parsedQuantity } : item
        )
      );
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật số lượng:", error.response?.data || error.message);
      alert("Không thể cập nhật giỏ hàng. Vui lòng thử lại.");
    }
  };

  const handleToggleSelect = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
      return;
    }

    try {
      await buyProductInCart(selectedItems);
      alert("🛍️ Thanh toán thành công!");

      // Xoá các item đã mua khỏi danh sách hiển thị
      const updatedItems = cartItems.filter((item) => !selectedItems.includes(item.id));
      setCartItems(updatedItems);
      setSelectedItems([]);
    } catch (error) {
      console.error("❌ Lỗi khi thanh toán:", error);
      alert("Có lỗi xảy ra khi thanh toán.");
    }
  };

  const totalSelectedPrice = cartItems
  .filter((item) => selectedItems.includes(item.id))
  .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!cart) return <div className="text-danger">Failed to load cart.</div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">🛒 Giỏ hàng của bạn</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <ul className="list-group">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="form-check me-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleToggleSelect(item.id)}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h5>{item.product?.name || "Unknown Product"}</h5>
                <p>Price: ${item.product?.price?.toLocaleString() || 0}</p>
                <p>
                  Quantity:{" "}
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d+$/.test(value)) {
                        handleUpdateItem(item.id, value);
                      }
                    }}
                    style={{ width: "70px", display: "inline-block" }}
                  />
                </p>
              </div>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDeleteItem(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 text-end">
        <h4>
          Tổng giá trị sản phẩm đã chọn:{" "}
          <span className="text-primary">${totalSelectedPrice.toLocaleString()}</span>
        </h4>
        <button className="btn btn-success mt-2" onClick={handleCheckout}>
          Thanh toán các sản phẩm đã chọn
        </button>
      </div>
    </div>
  );
};

export default Cart;
