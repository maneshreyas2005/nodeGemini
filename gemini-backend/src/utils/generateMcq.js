// // src/utils/generateMcq.js
// import axios from 'axios';

// export const generateMcq = async (topic) => {
//     const generateChunk = async () => {
//         const prompt = `
// Generate exactly 10 challenging multiple choice questions (MCQs) on the aptitude topic "${topic}", suitable for high-difficulty IT company placement preparation (difficulty level: super duper hard).

// Important constraints:
// - The number of questions must be exactly 10.
// - Each question should focus on logical reasoning, quantitative aptitude, data interpretation, or verbal ability within the topic.
// - Each question must be tricky, require multi-step reasoning, and avoid simple or repetitive patterns.
// - Each question must have 4 distinct options: A, B, C, and D.
// - There must be only one correct answer per question.
// - Do NOT include explanations or notes.

// Output format:
// Return ONLY a JSON array of exactly 10 objects. Each object must follow this format:
// {
//   "question": "Your question text here?",
//   "options": ["Option A", "Option B", "Option C", "Option D"],
//   "answer": "Correct answer here (must match exactly one of the options)"
// }
//         `;

//         const response = await axios.post('http://localhost:11434/api/generate', {
//             model: 'mistral', // or 'llama3'
//             prompt,
//             stream: false
//         });

//         const text = response.data.response.trim();

//         try {
//             return JSON.parse(text);
//         } catch (err) {
//             console.error("❌ Failed to parse Ollama response:", text);
//             throw new Error("Invalid response from Ollama");
//         }
//     };

//     return await generateChunk(); // Generates 10 in one go
// };
