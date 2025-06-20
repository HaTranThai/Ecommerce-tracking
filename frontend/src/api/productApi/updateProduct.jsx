import axiosClient from "../axiosClient";

export const updateProduct = async (id, formData) => {
    try {
        const response = await axiosClient.put(`/product/products/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
}