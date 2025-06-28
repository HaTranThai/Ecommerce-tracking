import React, { useState, useEffect } from "react";
import { getHistory } from "../api/orderApi/getHistory";

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getHistory();
        setOrders(data.results);
      } catch (error) {
        console.error("❌ Lỗi khi tải lịch sử đơn hàng:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">🧾 Lịch Sử Đơn Hàng</h2>

      {orders.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {orders.map((order) => (
            <div key={order.id} className="col">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title">Đơn hàng #{order.id}</h5>
                  <p className="card-text mb-1">
                    <strong>Ngày mua:</strong>{" "}
                    {new Date(order.created_at).toLocaleString("vi-VN")}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Tổng tiền:</strong>{" "}
                    <span className="text-success">
                      ${order.total_price.toLocaleString()}
                    </span>
                  </p>
                  <p className="card-text text-muted">
                    Số sản phẩm: {order.items.length}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted text-center">Không có đơn hàng nào được tìm thấy.</p>
      )}
    </div>
  );
}

export default Order;
