// src/context/ShopContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { fetchAllProducts } from "../services/productService";
import { getCartItems, addToCart, removeFromCart, updateCart } from "../services/cartService";

type Product = {
    _id: number;
    name: string;
    old_price: number;
    new_price: number;
    image: string;
};

type Cart = {
    [key: number]: number;
};

interface ShopContextValue {
    all_products: Product[];
    cartItems: Cart;
    addToCart: (itemId: number) => void;
    removeFromCart: (itemId: number) => void;
    updateCart: (itemId: number, quantity: number) => void;
    getTotalCartAmount: () => number;
    getTotalCartItems: () => number;
}

interface ShopContextProviderProps {
    children: ReactNode;
}

export const ShopContext = createContext<ShopContextValue | undefined>(undefined);

const getDefaultCart = (): Cart => {
    let cart: Cart = {};
    for (let index = 0; index <= 300; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider: React.FC<ShopContextProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<Cart>(getDefaultCart());
    const [all_products, setAllProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await fetchAllProducts();
                setAllProducts(products);

                if (localStorage.getItem("auth-token")) {
                    const token = localStorage.getItem("auth-token")!;
                    const cart = await getCartItems(token);
                    setCartItems(cart);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const addItemToCart = async (itemId: number) => {
        try {
            const token = localStorage.getItem("auth-token");
            if (!token) {
                console.error("No auth token found. User must be logged in.");
                return;
            }

            const productItem = await addToCart(itemId, token);

            setCartItems((prev) => {
                const updatedCart = { ...prev };

                const existingProductIndex = updatedCart.products.findIndex(
                    (product) => product.product._id === itemId
                );

                if (existingProductIndex !== -1) {
                    const updatedProducts = updatedCart.products.map((product, index) =>
                        index === existingProductIndex
                            ? { ...product, quantity: product.quantity + 1 }
                            : product
                    );
                    return { ...updatedCart, products: updatedProducts };
                } else {
                    return {
                        ...updatedCart,
                        products: [...updatedCart.products, ...productItem.products]
                    };
                }
            });
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };


    const removeItemFromCart = async (itemId: number) => {
        try {
            const token = localStorage.getItem("auth-token");
            if (!token) {
                console.error("No auth token found. User must be logged in.");
                return;
            }

            await removeFromCart(itemId, token);

            setCartItems((prev) => {
                const updatedCart = { ...prev };

                const productIndex = updatedCart.products.findIndex(
                    (product) => product.product._id === itemId
                );

                if (productIndex !== -1) {
                    updatedCart.products.splice(productIndex, 1);
                }

                return updatedCart;
            });
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };



    const updateCartItem = async (itemId: number, quantity: number) => {
        try {
            const token = localStorage.getItem("auth-token");
            if (!token) {
                console.error("No auth token found. User must be logged in.");
                return;
            }

            await updateCart(itemId, quantity, token);

            setCartItems((prev) => {
                const updatedCart = { ...prev };

                const productIndex = updatedCart.products.findIndex(
                    (product) => String(product.product._id) === String(itemId)
                );

                if (productIndex !== -1) {
                    updatedCart.products[productIndex].quantity = quantity;
                }

                return updatedCart;
            });
        } catch (error) {
            console.error("Error updating item in cart:", error);
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = all_products.find(
                    (product) => product._id === Number(item)
                );
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue: ShopContextValue = {
        all_products,
        cartItems,
        addToCart: addItemToCart,
        removeFromCart: removeItemFromCart,
        updateCart: updateCartItem,
        getTotalCartAmount,
        getTotalCartItems,
    };

    return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
