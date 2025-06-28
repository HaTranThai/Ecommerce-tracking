import axiosClient from "../axiosClient";

export const updateAddress = async (addressID ,addressData) => {
  try {
    const response = await axiosClient.put(`/user/addresses/${addressID}/`, addressData);
    return response.data;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
}