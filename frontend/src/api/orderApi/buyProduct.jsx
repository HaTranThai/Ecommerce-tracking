import axiosClient from "../axiosClient";

export const buyProduct = async (productId, quantity) => {
    try {
        const response = await axiosClient.post('/order/purchase/single/', {
            product_id: productId,
            quantity: quantity
        });
        return response.data;
    } catch (error) {
        console.error("Error buying product:", error);
        throw error;
    }
}