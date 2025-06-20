import axiosClient from "../axiosClient";

export const deleteProduct = async (productId) => {
  const url = `/product/products/${productId}/`;

  try {
    const response = await axiosClient.delete(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}