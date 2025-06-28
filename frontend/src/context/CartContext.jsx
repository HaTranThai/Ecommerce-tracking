import { createContext, useContext, useState, useEffect } from "react";
import { getCartItem } from "../api/cartApi/getCart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = async () => {
    try {
      const res = await getCartItem(); // giả sử trả về { count: X }
      setCartCount(res.count);
    } catch (error) {
      console.error("Lỗi khi cập nhật cart count:", error);
    }
  };

  useEffect(() => {
    refreshCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
