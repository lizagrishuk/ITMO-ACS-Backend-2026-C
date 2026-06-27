import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import reviewRouter from './review.router';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', reviewRouter);

const PORT = process.env.PORT || 3004;

AppDataSource.initialize()
    .then(() => {
        console.log('review-service: Database connected');
        app.listen(PORT, () => {
            console.log(`review-service running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection error:', err);
        process.exit(1);
    });