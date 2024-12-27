import { Request } from 'express';
import { Review } from '../models/review';
import { Product } from '../models/product';

export const createReview = async (req: Request, res: any) => {
    try {
        // @ts-ignore
        const userId = req.user?.id as string;
        const { productId, rating, comment } = req.body;

        if (!productId || !userId || !rating || !comment) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: 'All fields (productId, userId, rating, comment) are required.',
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Product not found.',
            });
        }

        // Tạo và lưu Review
        const review = new Review({
            product: productId,
            user: userId,
            rating,
            comment,
        });
        await review.save();

        await Product.findByIdAndUpdate(productId, {
            $push: { review: review._id },
        });

        res.status(201).json({
            status: 201,
            data: review,
            message: 'Review created successfully and Product updated.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            data: null,
            message: 'Internal server error.',
        });
    }
};

export const updateReview = async (req: Request, res: any) => {
    const reviewId = req.params.id;
    try {
        const { rating, comment } = req.body;

        if (!rating || !comment) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: 'Fields (rating, comment) are required.',
            });
        }

        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { rating, comment },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Review not found.',
            });
        }

        res.status(200).json({
            status: 200,
            data: updatedReview,
            message: 'Review updated successfully.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            data: null,
            message: 'Internal server error.',
        });
    }
};

export const deleteReview = async (req: Request, res: any) => {
    const reviewId = req.params.id;
    try {
        const review = await Review.findByIdAndDelete(reviewId);

        if (!review) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Review not found.',
            });
        }

        // Xóa Review khỏi Product
        await Product.findByIdAndUpdate(review.product, {
            $pull: { review: review._id },
        });

        res.status(200).json({
            status: 200,
            data: null,
            message: 'Review deleted successfully and Product updated.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            data: null,
            message: 'Internal server error.',
        });
    }
};
