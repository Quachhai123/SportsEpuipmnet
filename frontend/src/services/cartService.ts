import apiClient from "./axios";

export const addToCart = async (itemId: number, token: string) => {
    try {
        const response = await apiClient.post('/addCart', { productId: itemId, quantity: 1 }, {
            headers: {
                'auth-token': token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        throw error;
    }
};

export const updateCart = async (itemId: number, quantity: number, token: string) => {
    try {
        const response = await apiClient.put('/updateCart',
            { productId: itemId, quantity },
            {
                headers: {
                    'auth-token': token,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating item in cart:', error);
        throw error;
    }
};


export const removeFromCart = async (itemId: number, token: string) => {
    try {
        const response = await apiClient.delete('/deleteCart', {
            headers: {
                'auth-token': token,
            },
            data: { itemId },
        });
        return response.data;
    } catch (error) {
        console.error('Error removing item from cart:', error);
        throw error;
    }
};


export const getCartItems = async (token: string) => {
    try {
        const response = await apiClient.get('/getCartByUserId', {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};
