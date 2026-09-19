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


