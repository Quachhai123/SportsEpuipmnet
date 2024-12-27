import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    id: string
    name: string;
    email: string;
    password: string;
    date: Date;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>('user', UserSchema);
