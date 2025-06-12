// // src/controllers/mcqController.js
// import { generateMCQs } from '../services/gemini.js';

// export const handleGenerateMCQs = async (req, res) => {
//     const { topic } = req.body;
//     console.log("API Called !!");
//     console.log("Topic: ", topic);

//     if (!topic) {
//         return res.status(400).json({ error: 'Topic is required' });
//     }

//     try {
//         console.log("Generating MCQs for:", topic);
//         const mcqs = await generateMCQs(topic);
//         res.json(mcqs); // Or: res.json({ mcqs }) if you want to wrap it
//     } catch (err) {
//         console.error('🔴 MCQ generation failed:', err.message || err);
//         res.status(500).json({ error: 'MCQ generation failed' });
//     }
// };

import { generateMCQs } from '../services/gemini.js';

export const handleGenerateMCQs = async (req, res) => {
    try {
        console.log("Incoming request body:", req.body);

        let { count, topic } = req.body;
        count = parseInt(count, 10);
        const numQuestions = Number.isInteger(count) && count > 0 ? count : 10;

        topic = typeof topic === 'string' && topic.trim() ? topic.trim() : "Quantitative Aptitude";

        console.log(`⚙️ Generating ${numQuestions} MCQs for topic: ${topic}`);

        const questions = await generateMCQs(topic, numQuestions);
        res.json(questions);
    } catch (error) {
        console.error("❌ Error generating MCQs:", error);
        res.status(500).json({ error: 'Failed to generate MCQs' });
    }
};


