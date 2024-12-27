import mongoose, { Schema, Document } from 'mongoose';

export interface IStore extends Document {
    name: string;
    address: string;
    phone: string;
    email: string;
    products: mongoose.Schema.Types.ObjectId[];
    userId: mongoose.Schema.Types.ObjectId;
}

const StoreSchema = new Schema<IStore>({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Store = mongoose.model<IStore>('store', StoreSchema);
