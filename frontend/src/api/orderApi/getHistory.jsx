import axiosClient from "../axiosClient";

export const getHistory = async () => {
    try {
        const response = await axiosClient.get("/order/history/");
        return response.data;
    } catch (error) {
        console.error("Error fetching order history:", error);
        throw error;
    }
}