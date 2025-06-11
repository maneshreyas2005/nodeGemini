export const generateMcq = async (topic) => {
    const generateChunk = async () => {
//         const prompt = `Generate exactly 10 challenging multiple choice questions (MCQs) on the aptitude topic ${topic}, suitable for high-difficulty IT company placement preparation (difficulty level: super duper hard).

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
// `;
        const prompt = `Generate exactly 10 extremely challenging and multi-layered Multiple Choice Questions (MCQs) for Quantitative Aptitude, specifically designed to mimic the highest difficulty questions found in IT company placement aptitude tests (e.g., TCS Advanced, Infosys, Wipro, Capgemini, Cognizant).

Each question must:
- Focus on Quantitative Aptitude, potentially integrating concepts from Number Systems, Percentages, Profit & Loss, Time & Work, Speed-Distance-Time, Averages, Ratio & Proportion, Mixtures & Allegations, Permutations & Combinations, Probability, or Data Interpretation.
- Be tricky, requiring careful reading, multi-step reasoning, and potentially identifying the most efficient solution path.
- Avoid straightforward single-step calculations or repetitive patterns.
- Have 4 distinct options (A, B, C, D).
- Have only one correct answer, which must be clearly discernible through rigorous logic.

Important constraints:
- The number of questions must be exactly 10.
- Do NOT include any explanations, notes, or introductory/concluding text outside the JSON array.

Output format:
Return ONLY a JSON array of exactly 10 objects. Each object must follow this format:
{
  "question": "Your complex quantitative aptitude question text here, possibly involving a scenario or multiple conditions.",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "Correct answer here (must match exactly one of the options)"
}
`;

        const response = await axios.post(GEMINI_URL, {
            contents: [{ parts: [{ text: prompt }] }],
        });

        const text = response.data.candidates[0].content.parts[0].text;

        try {
            return JSON.parse(text);
        } catch (err) {
            console.error("Failed to parse Gemini response:", text);
            throw new Error("Invalid response from Gemini");
        }
    };

    const chunk1 = await generateChunk();

    return [...chunk1]; // Final list of 10
};
