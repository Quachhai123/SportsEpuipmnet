import apiClient from "./axios";

export const login = async (formData: { email: string; password: string }) => {
    try {
        const response = await apiClient.post('login', formData);
        return response;
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error("An error occurred during login. Please try again.");
    }
};

export const signup = async (formData: { username: string; email: string; password: string }) => {
    try {
        const response = await apiClient.post('signup', formData);
        return response;
    } catch (error) {
        console.error("Error during signup:", error);
        throw new Error("An error occurred during signup. Please try again.");
    }
};

export const fetchTotalUsers = async () => {
    try {
        const response = await apiClient.get('totalUsers');
        return response.data;
    } catch (error) {
        console.error("Error fetching total users:", error);
        return 0;
    }
};

export const fetchAllUsers = async () => {
    try {
        const response = await apiClient.get('allUsers');
        return response.data;
    } catch (error) {
        console.error("Error fetching total users:", error);
        return 0;
    }
};

export const deleteUser = async (username: string) => {
    try {
        const response = await apiClient.delete("deleteUser", {
            data: { name: username },
        });
        if (response.status !== 200) {
            throw new Error("Không thể xóa người dùng");
        }
    } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
        throw error;
    }
};
