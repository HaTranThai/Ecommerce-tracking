import axiosClient from "../axiosClient";

export const getUserInfor = async () => {
  const url = `/user/profile/`;
  try {
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const updateUserInfor = async (data) => {
  const url = `/user/profile/`;
  try {
    const response = await axiosClient.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


