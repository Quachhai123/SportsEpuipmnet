import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

export const getCartByUserId = async (req: Request, res: any) => {
    try {
        // @ts-ignore
        const userId = req.user?.id as string;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: 'Invalid user ID format',
            });
        }

        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart) {
            return res.status(200).json({
                status: 200,
                data: [],
                message: 'Cart not found',
            });
        }

        res.status(200).json({
            status: 200,
            data: cart,
            message: 'Cart fetched successfully',
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            data: null,
            message: error.message,
        });
    }
};

export const addToCart = async (req: Request, res: any) => {
    try {
        // @ts-ignore
        const userId = req.user?.id as string;

        const { productId, quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: 'Invalid user or product ID format',
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Product not found',
            });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                products: [{ product: productId, quantity }],
                total_price: product.new_price * quantity,
            });
        } else {
            const existingProduct = cart.products.find((p) => p.product.toString() === productId);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }

            cart.total_price = cart.products.reduce((total, item) => {
                const productTotal = item.quantity * product.new_price;
                return total + productTotal;
            }, 0);
        }

        await cart.save();

        res.status(200).json({
            status: 200,
            data: cart,
            message: 'Product added to cart successfully',
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            data: null,
            message: error.message,
        });
    }
};

export const updateCart = async (req: Request, res: any) => {
    try {
        // @ts-ignore
        const userId = req.user?.id as string;

        const { productId, quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: 'Invalid user or product ID format',
            });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Cart not found',
            });
        }

        const productInCart = cart.products.find((p) => p.product.toString() === productId);

        if (!productInCart) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Product not found in cart',
            });
        }

        if (quantity <= 0) {
            cart.products = cart.products.filter((p) => p.product.toString() !== productId);
        } else {
            productInCart.quantity = quantity;
        }

        cart.total_price = 0;

        for (const item of cart.products) {
            const product = await Product.findById(item.product);
            if (!product) {
                throw new Error(`Product not found: ${item.product}`);
            }
            cart.total_price += item.quantity * product.new_price;
        }


        await cart.save();

        res.status(200).json({
            status: 200,
            data: cart,
            message: 'Cart updated successfully',
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            data: null,
            message: error.message,
        });
    }
};

export const deleteCart = async (req: Request, res: any) => {
    try {
        // @ts-ignore
        const userId = req.user?.id as string;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: 'Invalid user ID format',
            });
        }

        const deletedCart = await Cart.findOneAndDelete({ user: userId });

        if (!deletedCart) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Cart not found',
            });
        }

        res.status(200).json({
            status: 200,
            data: null,
            message: 'Cart deleted successfully',
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            data: null,
            message: error.message,
        });
    }
};
