import express, { Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';

import routes from './routes';

dotenv.config();

const app = express();

const corsConfig = {
    origin: '*',
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
    credentials: true
};

app.use(cors(corsConfig));
app.use(express.json());
app.use('/images', express.static('public/images'));
app.options('*', cors(corsConfig));

mongoose.connect(process.env.MONGO_URL || '')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = Date.now() + ext;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("product"), (req: any, res: Response) => {
    if (!req.file) {
        res.status(400).json({
            status: 400,
            data: null,
            message: "No file uploaded"
        });
    }
    res.status(201).json({
        status: 201,
        data: {
            image_url: `http://localhost:${process.env.PORT || 8080}/images/${req.file.filename}`,
        },
        message: "Upload image successfully"
    });
});

app.use('/api', routes);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
