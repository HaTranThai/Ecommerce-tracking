import axiosClient from "../axiosClient";

export const deleteCartItem = async (itemId) => {
    try {
        const response = await axiosClient.delete(`/user/cart/items/${itemId}/`);
        return response.data;
    } catch (error) {
        console.error("Error deleting cart item:", error);
        throw error;
    }
}