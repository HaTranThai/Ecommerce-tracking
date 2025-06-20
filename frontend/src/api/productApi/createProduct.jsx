import axiosClient from "../axiosClient";

export const createProduct = async (productData) => {
  const url = `/product/products/`;

  // Tạo FormData để gửi ảnh và dữ liệu dạng multipart/form-data
  const formData = new FormData();
  Object.entries(productData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  try {
    const response = await axiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
