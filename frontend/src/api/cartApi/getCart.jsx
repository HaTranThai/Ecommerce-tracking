import axiosClient from "../axiosClient";

export const getCart = async () => {
    try {
        const response = await axiosClient.get(`/user/cart/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw error;
    }
}

export const getCartItem = async () => {
    try {
        const response = await axiosClient.get(`/user/cart/items/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cart item:", error);
        throw error;
    }
}