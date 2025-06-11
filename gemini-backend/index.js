import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mcqRouter from './src/routes/MCQRoutes.js';
dotenv.config();

const app = express();

// ✅ 1. Set CORS middleware first
app.use(cors({
    origin: ['https://nodegemini-frontend.onrender.com/', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false // Only true if you're using cookies
}));


app.use(express.json());


app.use('/mcqs', mcqRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
