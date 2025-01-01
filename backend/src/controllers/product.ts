import { Request, Response } from 'express';
import { Product } from '../models/product';
import { Brand } from '../models/brand';

export const addProduct = async (req: Request, res: any) => {
    try {
        const { name, image, category, new_price, old_price, brandId, description } = req.body;

        if (!name || !image || !category || !new_price || !old_price || !brandId || !description) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: 'All fields (name, image, category, new_price, old_price, brandId, description) are required.'
            });
        }

        const brand = await Brand.findById(brandId);
        if (!brand) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Brand not found'
            });
        }

        const product = new Product({
            name,
            image,
            category,
            new_price,
            old_price,
            brand: brandId,
            description
        });

        await product.save();

        res.status(201).json({
            status: 201,
            data: product,
            message: 'Product added successfully.'
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            data: null,
            message: 'Internal server error'
        });
    }
};

export const editProduct = async (req: Request, res: any) => {
    try {
        const { id } = req.params;
        const { name, image, category, new_price, old_price, brandId, description } = req.body;

        if (!name || !image || !category || !new_price || !old_price || !brandId || !description) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: 'All fields (name, image, category, new_price, old_price, brandId, description) are required.'
            });
        }

        const brand = await Brand.findById(brandId);
        if (!brand) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Brand not found'
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name,
                image,
                category,
                new_price,
                old_price,
                brand: brandId,
                description
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            status: 200,
            data: updatedProduct,
            message: 'Product updated successfully.'
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            data: null,
            message: 'Internal server error'
        });
    }
};

export const getProductDetail = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;

        const product = await Product.findOne({ _id: productId })
            .populate('brand', 'name description image')
            .exec();

        if (!product) {
            res.status(404).json({
                status: 404,
                data: product,
                message: "Product not found"
            });
        }

        res.status(200).json({
            status: 200,
            data: product,
            message: "Product fetched successfully."
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: [],
            message: "An error occurred while fetching product."
        });
    }
};

export const popularProduct = async (req: Request, res: Response) => {
    try {
        // Truy vấn tất cả sản phẩm, không giới hạn category
        const popularProducts = await Product.find({})
            .populate("brand", "name description image") // Lấy thêm thông tin thương hiệu
            .limit(6); // Giới hạn 4 sản phẩm

        res.status(200).json({
            status: 200,
            data: popularProducts,
            message: "Popular products fetched successfully."
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: [],
            message: "An error occurred while fetching popular products."
        });
    }
};

export const allProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({})
            .populate({
                path: 'review',
                populate: { path: 'user', select: 'name email' },
            })
            .populate("brand", "name description image");

        res.status(200).json({
            status: 200,
            data: products,
            message: "products fetched successfully."
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: [],
            message: "An error occurred while fetching products."
        });
    }
};

export const newCollection = async (req: Request, res: Response) => {
    try {
        let products = await Product.find({});
        let newCollection = products.slice(1).slice(-8);

        res.status(200).json({
            status: 200,
            data: newCollection,
            message: "newCollection fetched successfully."
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: [],
            message: "An error occurred while fetching newCollection."
        });
    }
};

export const totalProducts = async (req: Request, res: Response) => {
    try {
        let totalProducts = await Product.countDocuments();
        res.status(200).json({
            status: 200,
            data: totalProducts,
            message: "Popular products fetched successfully."
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: [],
            message: "An error occurred while fetching total products."
        });
    }
};

export const searchProduct = async (req: Request, res: any) => {
    try {
        const { name, category, brandName, description } = req.query;

        const searchConditions: any = {};

        if (name) {
            searchConditions.name = { $regex: name, $options: 'i' };
        }
        if (category) {
            searchConditions.category = { $regex: `^${category}$`, $options: 'i' };
        }        
        if (brandName) {
            const brands = await Brand.find({ name: { $regex: brandName, $options: 'i' } });
            if (brands.length > 0) {
                // Lấy danh sách ID của tất cả thương hiệu khớp
                const brandIds = brands.map((brand) => brand._id);
                searchConditions.brand = { $in: brandIds }; // Tìm các sản phẩm thuộc nhiều thương hiệu
            } else {
                return res.status(404).json({
                    status: 404,
                    data: [],
                    message: 'Brand not found'
                });
            }
        }

        const products = await Product.find(searchConditions).populate('brand', 'name description');

        res.status(200).json({
            status: 200,
            data: products,
            message: 'Products fetched successfully.'
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: [],
            message: 'An error occurred while searching products.'
        });
    }
};
