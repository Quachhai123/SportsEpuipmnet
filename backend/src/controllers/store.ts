import { Request } from 'express';
import { Store } from '../models/store';

const saveStore = async (req: Request, res: any) => {
    try {
        // @ts-ignore
        const userId = req.user?.id as string;
        const { name, address, phone, email, products } = req.body;

        if (!name || !address || !phone || !email || !products || !userId) {
            return res.status(400).json({
                message: 'All fields are required (name, address, phone, email, products, userId)',
            });
        }

        const newStore = new Store({
            name,
            address,
            phone,
            email,
            products,
            userId,
        });

        const savedStore = await newStore.save();

        return res.status(201).json({
            message: 'Store created successfully',
            data: savedStore,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while saving the store',
            error: error,
        });
    }
};

export default saveStore;
