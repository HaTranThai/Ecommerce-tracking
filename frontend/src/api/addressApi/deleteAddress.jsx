import axiosClient from "../axiosClient";

export const deleteAddress = async (addressId) => {
  try {
    const response = await axiosClient.delete(`/user/addresses/${addressId}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}