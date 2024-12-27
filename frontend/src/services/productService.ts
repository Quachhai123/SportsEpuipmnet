import apiClient from "./axios";

export const getPopularProducts = async () => {
    try {
        const response = await apiClient.get(`popularProducts`);
        return response
    } catch (error) {
        console.error('Error fetching popular products:', error);
        throw error;
    }
};

export const fetchNewCollection = async () => {
    try {
        const response = await apiClient.get('newCollection');
        return response.data;
    } catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Unknown error occurred');
    }
};

export const fetchTotalProducts = async () => {
    try {
        const response = await apiClient.get('totalProducts');
        return response.data.totalProducts;
    } catch (error) {
        console.error("Error fetching total products:", error);
        return 0;
    }
};

export const fetchAllProducts = async () => {
    try {
        const response = await apiClient.get('allProducts');
        return response.data;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
};

export const getProductDetails = async (productId: number) => {
    try {
        const response = await apiClient.get(`getProductDetail/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product details for ID ${productId}:`, error);
        throw error;
    }
};

export const updateProduct = async (productId: number, updatedProduct: any) => {
    try {
        const response = await apiClient.put(`editProduct/${productId}`, updatedProduct);
        return response.data;
    } catch (error) {
        console.error(`Error updating product with ID ${productId}:`, error);
        throw error;
    }
};
export const deleteProduct = async (productId: number) => {
    try {
        const response = await apiClient.delete("deleteProduct", {
            data: { id: productId },
        });
        if (response.status !== 200) {
            throw new Error("Không thể xóa sản phẩm");
        }
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        throw error;
    }
};

export const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('product', image);

    try {
        const response = await apiClient.post('upload', formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error: any) {
        console.error('Error uploading image:', error.response || error.message);

        throw new Error(error.response?.data?.message || 'Error uploading image. Please try again.');
    }
};

export const addProduct = async (productDetails: any) => {
    try {
        const response = await apiClient.post('addProduct', productDetails);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};
