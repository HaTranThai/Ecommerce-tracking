import axiosClient from "../axiosClient";

export const getMyProducts = async () => {
  const url = `/product/my-products/`;
  try {
    const response = await axiosClient.get(url);
    return response.data.products;
  } catch (error) {
    throw error;
  }
}