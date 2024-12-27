import mongoose, { Schema, Document } from 'mongoose';

export interface IBrand extends Document {
    name: string;
    description: string;
    image: string;
}

const BrandSchema = new Schema<IBrand>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
});

export const Brand = mongoose.model<IBrand>('brand', BrandSchema);
