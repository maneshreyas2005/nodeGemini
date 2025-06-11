// src/controllers/mcqController.js
import { generateMCQs } from '../services/gemini.js';

export const handleGenerateMCQs = async (req, res) => {
    const { topic } = req.body;
    console.log("API Called !!");
    console.log("Topic: ", topic);

    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }

    try {
        console.log("Generating MCQs for:", topic);
        const mcqs = await generateMCQs(topic);
        res.json(mcqs); // Or: res.json({ mcqs }) if you want to wrap it
    } catch (err) {
        console.error('🔴 MCQ generation failed:', err.message || err);
        res.status(500).json({ error: 'MCQ generation failed' });
    }
};
