import axiosClient from "../axiosClient";   

export const patchCartItem = async (itemId, quantity) => {
    try {
        const response = await axiosClient.patch(`/user/cart/items/${itemId}/`, {
            quantity: quantity
        });
        return response.data;
    } catch (error) {
        console.error("Error updating cart item:", error);
        throw error;
    }
}