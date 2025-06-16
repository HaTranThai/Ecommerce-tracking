import axiosClient from "../axiosClient";

const userInforApi = {
  getUserInfor: async () => {
    const url = `/user/profile/`;
    try {
        const response = await axiosClient.get(url);
        return response.data;
    } 
    catch (error) {
        throw error;
    }

  },
}

export default userInforApi;