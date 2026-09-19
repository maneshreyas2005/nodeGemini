import express from 'express';
import { handleSignup, handleLogin , submitQuiz } from '../controller/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', handleSignup);
authRouter.post('/login', handleLogin);
authRouter.post('/submit', submitQuiz);

export default authRouter; 