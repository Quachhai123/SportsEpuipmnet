import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    image: string;
    category: string;
    new_price: number;
    old_price: number;
    date: Date;
    available: boolean;
    brand: mongoose.Schema.Types.ObjectId;
    review: mongoose.Schema.Types.ObjectId;
    description: string;
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: false },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'brand', required: true },
    review: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
    description: { type: String, required: false },
});

export const Product = mongoose.model<IProduct>('product', ProductSchema);
