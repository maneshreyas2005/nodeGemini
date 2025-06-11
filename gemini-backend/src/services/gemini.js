// src/services/gemini.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();                           // pulls GEMINI_API_KEY from .env

const GEMINI_URL =
    // `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`;
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent`;

export async function generateMCQs(topic, n = 50) {
    // Ask Gemini to give *machine-parsable JSON*
    const prompt = `
   Generate exactly ${n} extremely challenging and multi-layered Multiple Choice Questions (MCQs) for Quantitative Aptitude, specifically designed to mimic the highest difficulty questions found in IT company placement aptitude tests (e.g., TCS Advanced, Infosys, Wipro, Capgemini, Cognizant).

Each question must:
- Focus on Quantitative Aptitude, potentially integrating concepts from Number Systems, Percentages, Profit & Loss, Time & Work, Speed-Distance-Time, Averages, Ratio & Proportion, Mixtures & Allegations, Permutations & Combinations, Probability, or Data Interpretation.
- Be tricky, requiring careful reading, multi-step reasoning, and potentially identifying the most efficient solution path.
- Avoid straightforward single-step calculations or repetitive patterns.
- Have 4 distinct options (A, B, C, D).
- Have only one correct answer, which must be clearly discernible through rigorous logic.

Important constraints:
- The number of questions must be exactly ${n}.
- Do NOT include any explanations, notes, or introductory/concluding text outside the JSON array.

Output format:
Return ONLY a JSON array of exactly ${n} objects. Each object must follow this format:
{
  "question": "Your complex quantitative aptitude question text here, possibly involving a scenario or multiple conditions.",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": number  // 0-based index of correct option
}
  `.trim();

    try {
        const { data } = await axios.post(
            `${GEMINI_URL}?key=${process.env.API_KEY}`,
            { contents: [{ parts: [{ text: prompt }] }] },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!raw) throw new Error('Empty response from Gemini');
        const cleanText = raw.trim().replace(/^```json|^```|```$/g, '').trim();
        console.log("data fetched raw", cleanText);
        return JSON.parse(cleanText);

        // return JSON.parse(raw);               // -> array of MCQ objects

    } catch (err) {
        console.error('🔴 Gemini API error:', err.response?.data || err.message);
        throw err;                            // bubble up to the router
    }
}
