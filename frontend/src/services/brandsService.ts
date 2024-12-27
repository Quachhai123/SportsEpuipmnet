import apiClient from "./axios";

export const getAllBrands = async () => {
    try {
        const response = await apiClient.get('brands');
        return response.data;
    } catch (error) {
        console.error('Error fetching all brands:', error);
        throw error;
    }
};

export const getBrandById = async (brandId: number) => {
    try {
        const response = await apiClient.get(`brands/${brandId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching brand details for ID ${brandId}:`, error);
        throw error;
    }
};

export const createBrand = async (brandDetails: any) => {
    try {
        const response = await apiClient.post('brands', brandDetails);
        return response.data;
    } catch (error) {
        console.error('Error adding brand:', error);
        throw error;
    }
};

export const updateBrand = async (brandId: number, updatedBrand: any) => {
    try {
        const response = await apiClient.put(`brands/${brandId}`, updatedBrand);
        return response.data;
    } catch (error) {
        console.error(`Error updating brand with ID ${brandId}:`, error);
        throw error;
    }
};

export const deleteBrand = async (brandId: number) => {
    try {
        const response = await apiClient.delete("brands", {
            data: { id: brandId },
        });
        if (response.status !== 200) {
            throw new Error("Không thể xóa thương hiệu");
        }
    } catch (error) {
        console.error("Lỗi khi xóa thương hiệu:", error);
        throw error;
    }
};
