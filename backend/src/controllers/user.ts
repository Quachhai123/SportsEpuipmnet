import { Request, RequestHandler } from 'express';
import { User } from '../models/user';

const jwt = require("jsonwebtoken");

export const registerUser: RequestHandler = async (req, res) => {
    const newUser = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
};

export const loginUser: RequestHandler = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && user.password === req.body.password) {
        const data = {
            user: {
                id: user.id,
            },
        };
        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ token, message: 'User logged in successfully' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

export const totalUsers: RequestHandler = async (req, res) => {
    try {
        let totalUsers = await User.countDocuments();

        res.status(200).json({
            status: 200,
            data: totalUsers,
            message: "Total users fetched successfully."
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            data: [],
            message: "An error occurred while fetching total users."
        });
    }
};

export const allUsers: RequestHandler = async (req, res) => {
    try {
        let users = await User.find({});

        res.status(200).json({
            status: 200,
            data: users,
            message: "Users fetched successfully."
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            data: [],
            message: "An error occurred while fetching users."
        });
    }
};

export const deleteUser = async (req: Request, res: any) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, message: 'Name is required' });
    }

    try {
        const user = await User.findOneAndDelete({ name });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }


        res.status(201).json({
            status: 200,
            data: null,
            message: "User delete successfully."
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: [],
            message: "An error occurred while deleting user."
        });
    }
}
