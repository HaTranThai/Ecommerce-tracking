import axiosClient from "../axiosClient";

export const addAddress = async (addressData) => {
  try {
    const response = await axiosClient.post(`/user/addresses/`, addressData);
    return response.data;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error; 
  }
}