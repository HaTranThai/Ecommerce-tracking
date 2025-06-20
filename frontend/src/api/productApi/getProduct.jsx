import axiosClient from "../axiosClient";

export const getProducts = async () => {
  const url = `/product/products/`;
  try {
    const response = await axiosClient.get(url);
    return response.data.products;
  } catch (error) {
    throw error;
  }
}

export const getProduct = async (id) => {
  const url = `/product/products/${id}/`;
  try {
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}