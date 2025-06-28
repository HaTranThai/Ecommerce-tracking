import axiosClient from "../axiosClient";   

export const getAddress = async () => {
  try {
    const response = await axiosClient.get(`/user/addresses/`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error; 
  }
}