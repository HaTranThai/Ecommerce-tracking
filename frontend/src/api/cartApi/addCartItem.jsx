import axiosClient from "../axiosClient";

export const addCart = async (productId, quantity) => {
  try {
    const response = await axiosClient.post('/user/cart/items/', {
      product_id: productId,
      quantity: quantity
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    console.error("Error response:", error.response?.data); // 👈 dòng quan trọng
    throw error;
  }
};