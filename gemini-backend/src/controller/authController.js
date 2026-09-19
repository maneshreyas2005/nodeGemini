import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../../src/config/DBConfig/dbconfig.js';
import asyncHandler from 'express-async-handler';
import { saveQuizResponses } from './quizController.js';


// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
export const handleSignup = asyncHandler(async (req, res) => {
    const { fullName, email, collegeId, password } = req.body;

    console.log("Sign Up Data: ", req.body);

    const result1 = await db.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    const existingUsers = result1[0];
    if (existingUsers.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'User already exists with this email'
        });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result2 = await db.execute(
        'INSERT INTO users (fullName, email, collegeId, password) VALUES (?, ?, ?, ?)',
        [fullName, email, collegeId, hashedPassword]
    );
    

    const insertResult = result2[0];
    const userId = insertResult.insertId;

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '96h',
    });

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        token,
        user: {
            id: userId,
            fullName,
            email,
            collegeId,
        },
    });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const handleLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await db.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    const users = result[0];

    if (users.length === 0) {
        return res.json({
            success: false,
            message: 'Invalid credentials'
        });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.json({
            success: false,
            message: 'Invalid credentials'
        });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });

    res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            collegeId: user.collegeId,
        },
    });
});
export const submitQuiz = asyncHandler(async (req, res) => {
    const { studentId, topic, questions, answers } = req.body;

    // 1. Insert quiz summary in `quizzes` table
    const attempted = Object.keys(answers).length;
    let correct = 0, incorrect = 0, unattempted = 0;

    for (const q of questions) {
        const selected = answers[q.id];
        if (selected === undefined) {
            unattempted++;
        } else if (selected === q.correctAnswer) {
            correct++;
        } else {
            incorrect++;
        }
    }

    const percentage = (correct / questions.length) * 100;

    const result = await db.execute(
        `INSERT INTO quizzes (student_id, topic, attempted, correct, incorrect, unattempted, percentage)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [studentId, topic, attempted, correct, incorrect, unattempted, percentage]
    );

    const quizId = result[0].insertId;

    // 2. Save detailed responses
    await saveQuizResponses(studentId, quizId, questions, answers);

    res.status(200).json({
        success: true,
        message: 'Quiz submitted successfully',
        quizId,
        result: { attempted, correct, incorrect, unattempted, percentage }
    });
});