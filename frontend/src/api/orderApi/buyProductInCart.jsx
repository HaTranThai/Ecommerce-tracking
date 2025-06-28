import axiosClient from "../axiosClient";

export const buyProductInCart = async (cart_item_ids) => {
    try {
        const response = await axiosClient.post('/order/purchase/cart/', {
            cart_item_ids: cart_item_ids
        });
        return response.data;
    } catch (error) {
        console.error("Error buying products in cart:", error);
        throw error;
    }
}