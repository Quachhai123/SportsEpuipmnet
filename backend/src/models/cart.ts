import mongoose, { Schema, Document } from 'mongoose';

export interface ICart extends Document {
    user: mongoose.Schema.Types.ObjectId;
    products: {
        product: mongoose.Schema.Types.ObjectId;
        quantity: number;
    }[];
    total_price: number;
    date: Date;
    status: string;
}

const CartSchema = new Schema<ICart>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
            quantity: { type: Number, required: true, min: 1 },
        },
    ],
    total_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' },
});

export const Cart = mongoose.model<ICart>('cart', CartSchema);
