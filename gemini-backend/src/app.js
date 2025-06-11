import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import generateMcqRouter from './routes/MCQRoutes.js';

dotenv.config();
const app = express();

// ✅ FIXED CORS
app.use(cors({
    origin: ['http://localhost:5173','http://localhost:5174'],
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
