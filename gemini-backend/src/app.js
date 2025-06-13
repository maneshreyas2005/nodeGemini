import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import generateMcqRouter from './routes/MCQRoutes.js';

dotenv.config();
const app = express();

// ✅ FIXED CORS
app.use(cors({
    origin: ['https://nodegemini-frontend.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false, // Optional: only needed if using cookies or auth headers
}));

app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('pong');
});

app.use('/mcqs', generateMcqRouter); // 🔁 Be sure your route path matches the frontend request

export default app;
