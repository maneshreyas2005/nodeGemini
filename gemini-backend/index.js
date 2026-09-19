import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mcqRouter from './src/routes/MCQRoutes.js';
import authRouter from './src/routes/authRoutes.js';
dotenv.config();

const app = express();

// ✅ 1. Set CORS middleware first
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://nodegemini-frontend.onrender.com' 
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
}));

app.use(express.json());


app.use('/mcqs', mcqRouter);

app.use('/', authRouter);




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});