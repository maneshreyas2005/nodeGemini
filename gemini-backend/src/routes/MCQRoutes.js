// src/routes/mcq.js
import express from 'express';
import { handleGenerateMCQs } from '../controller/generateMcqController.js';
import { saveQuizResponses } from '../controller/quizController.js';
import db from '../config/DBConfig/dbconfig.js';

const mcqRouter = express.Router();

mcqRouter.post('/generate', handleGenerateMCQs);

mcqRouter.post('/save-quiz', async (req, res) => {
    try {
        console.log('Received payload:', req.body);

        const {
            studentId,
            quizId,
            topic,
            questions,
            answers,
            markedQuestions,
            timeTaken
        } = req.body;

        if (!studentId || !quizId || !questions || !answers) {
            return res.status(400).json({
                error: 'Missing required fields',
                received: {
                    studentId,
                    quizId,
                    questions: questions ? questions.length : null,
                    answers: answers ? Object.keys(answers).length : null
                }
            });
        }

        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // ✅ Insert into quizzes table first (to satisfy foreign key)
            await connection.execute(
                `INSERT INTO quizzes 
                (id, student_id, topic, attempted, correct, incorrect, unattempted, percentage) 
                VALUES (?, ?, ?, 0, 0, 0, 0, 0.0)`,
                [quizId, studentId, topic]
            );

            // ✅ Save quiz_summary (optional, metadata)
            await connection.execute(
                `INSERT INTO quiz_summary (student_id, quiz_id, topic, time_taken)
                VALUES (?, ?, ?, ?)`,
                [studentId, quizId, topic, timeTaken]
            );

            // ✅ Loop over each question
            for (const question of questions) {
                const [questionResult] = await connection.execute(
                    `INSERT INTO quiz_questions (quiz_id, question_text, correct_answer_index) 
                    VALUES (?, ?, ?)`,
                    [quizId, question.question_text, question.correct_answer_index]
                );

                const questionId = questionResult.insertId;

                // ✅ Insert options
                for (let i = 0; i < question.options.length; i++) {
                    await connection.execute(
                        `INSERT INTO quiz_options (question_id, option_index, option_text)
                        VALUES (?, ?, ?)`,
                        [questionId, i, question.options[i]]
                    );
                }

                // ✅ Save response
                const selectedIndex = answers[question.id];
                const correctAnswer = String.fromCharCode(65 + question.correct_answer_index);
                const selectedAnswer = selectedIndex !== undefined
                    ? String.fromCharCode(65 + selectedIndex)
                    : null;

                await connection.execute(
                    `INSERT INTO quiz_responses
                    (student_id, quiz_id, question_text, option_a, option_b, option_c, option_d,
                    correct_answer, selected_answer, is_correct)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        studentId,
                        quizId,
                        question.question_text,
                        question.options[0],
                        question.options[1],
                        question.options[2],
                        question.options[3],
                        correctAnswer,
                        selectedAnswer,
                        selectedAnswer ? selectedIndex === question.correct_answer_index : null
                    ]
                );
            }

            await connection.commit();
            res.status(200).json({ success: true, quizId });

        } catch (error) {
            await connection.rollback();
            console.error('Transaction error:', error);
            res.status(500).json({ error: 'Transaction failed', details: error.message });
        } finally {
            connection.release();
        }

    } catch (error) {
        console.error('Error saving quiz:', error);
        res.status(500).json({ error: 'Failed to save quiz', details: error.message });
    }
});


export default mcqRouter;

// src/routes/MCQRoutes.js
// import express from 'express';
// import { generateMcq } from '../utils/generateMcq.js';

// const router = express.Router();

// router.post('/generate', async (req, res) => {
//     const { topic } = req.body;
//     try {
//         const mcqs = await generateMcq(topic);
//         res.json(mcqs);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: 'Failed to generate MCQs' });
//     }
// });

// export default router;
