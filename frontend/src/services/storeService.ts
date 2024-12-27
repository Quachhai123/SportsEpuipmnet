import apiClient from "./axios";

export const storeCart = async (
    token: string,
    name: string,
    address: string,
    phone: string,
    email: string,
    products: any
) => {
    try {
        const response = await apiClient.post(
            '/storeCart',
            {
                name: name,
                address: address,
                phone: phone,
                email: email,
                products: products
            },
            {
                headers: {
                    'auth-token': token,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error submitting review or storing cart data:', error);
        throw error
    }
};
