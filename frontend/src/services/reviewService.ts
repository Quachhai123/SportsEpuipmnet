import apiClient from "./axios";

export const reviewToProduct = async (itemId: number, token: string, rating: number, comment: string) => {
    try {
        const response = await apiClient.post('/reviewToProduct', {
            productId: itemId,
            rating: rating,
            comment: comment
        }, {
            headers: {
                'auth-token': token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error submitting review:', error);
        throw error;
    }
};
