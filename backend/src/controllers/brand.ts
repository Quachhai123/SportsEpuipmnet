import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Brand } from '../models/brand';

export const createBrand = async (req: Request, res: any) => {
    try {
        const { name, description, image } = req.body;

        if (!name || !description || !image) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: 'Name, description, and image are required'
            });
        }

        const newBrand = new Brand({
            name,
            description,
            image
        });

        await newBrand.save();

        res.status(201).json({
            status: 201,
            data: newBrand,
            message: 'Brand created successfully.'
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            data: null,
            message: error.message
        });
    }
};

export const getAllBrands = async (req: Request, res: Response) => {
    try {
        const brands = await Brand.find();

        res.status(200).json({
            status: 200,
            data: brands,
            message: 'All brands fetched successfully.'
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            data: null,
            message: error.message
        });
    }
};

export const getBrandById = async (req: Request, res: any) => {
    try {
        const idRequest = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(idRequest)) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: 'Invalid brand ID format'
            });
        }

        const brandId = new mongoose.Types.ObjectId(idRequest);

        const brand = await Brand.findOne({ _id: brandId });

        if (!brand) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Brand not found'
            });
        }

        res.status(200).json({
            status: 200,
            data: brand,
            message: 'Brand fetched successfully.'
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            data: null,
            message: error.message
        });
    }
};

export const updateBrand = async (req: Request, res: any) => {
    try {
        const { id } = req.params;
        const { name, description, image } = req.body;

        if (!name || !description || !image) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: 'Name, description, and image are required'
            });
        }

        const updatedBrand = await Brand.findByIdAndUpdate(
            id,
            { name, description, image },
            { new: true }
        );

        if (!updatedBrand) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Brand not found'
            });
        }

        res.status(200).json({
            status: 200,
            data: updatedBrand,
            message: 'Brand updated successfully.'
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            data: null,
            message: error.message
        });
    }
};

export const deleteBrand = async (req: Request, res: any) => {
    try {
        const { id } = req.params;

        const deletedBrand = await Brand.findByIdAndDelete(id);

        if (!deletedBrand) {
            return res.status(404).json({
                status: 404,
                data: null,
                message: 'Brand not found'
            });
        }

        res.status(200).json({
            status: 200,
            data: null,
            message: 'Brand deleted successfully.'
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            data: null,
            message: error.message
        });
    }
};
