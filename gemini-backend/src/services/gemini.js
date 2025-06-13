// src/services/gemini.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();                           // pulls GEMINI_API_KEY from .env

const GEMINI_URL =
  // `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`;
  `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent`;

export async function generateMCQs(topic, n) {
  let prompt = '';

  if (topic === "Quantitative") {
    prompt = `Generate exactly ${n} extremely challenging and multi-layered Multiple Choice Questions (MCQs) for **Quantitative Aptitude**, specifically designed to mimic the highest difficulty questions found in IT company placement aptitude tests (e.g., TCS Advanced, Infosys, Wipro, Capgemini, Cognizant).

Each question must:
- Focus solely on Quantitative Aptitude, potentially integrating concepts from Number Systems, Percentages, Profit & Loss, Time & Work, Speed-Distance-Time, Averages, Ratio & Proportion, Mixtures & Allegations, Permutations & Combinations, Probability, Clocks & Calendars, or Data Interpretation.
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
  "answer": "Correct answer here (must match exactly one of the options)"
}
    `.trim();

  } else if (topic === "Logical Reasoning") {
    prompt = `Generate exactly ${n} extremely challenging and multi-layered Multiple Choice Questions (MCQs) for **Logical Reasoning Aptitude**, specifically designed to mimic the highest difficulty questions found in IT company placement aptitude tests (e.g., TCS Advanced, Infosys, Wipro, Capgemini, Cognizant).

Each question must:
- Focus solely on Logical Reasoning, including topics like Syllogisms, Blood Relations, Coding-Decoding, Seating Arrangements (Linear/Circular), Direction Sense, Series Completion (Number/Alphabet/Mixed), Analogies, Statement & Conclusion/Assumption/Argument, Puzzles, Data Arrangement, or Cubes & Dice.
- Be tricky, requiring careful deductive reasoning, pattern identification, and the ability to handle multiple conditions or constraints.
- Avoid simple or obvious logical steps.
- Have 4 distinct options (A, B, C, D).
- Have only one correct answer, which must be clearly discernible through rigorous logic.

Important constraints:
- The number of questions must be exactly ${n}.
- Do NOT include any explanations, notes, or introductory/concluding text outside the JSON array.

Output format:
Return ONLY a JSON array of exactly ${n} objects. Each object must follow this format:
{
  "question": "Your complex logical reasoning question text here, possibly involving a scenario, a set of rules, or a puzzle.",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "Correct answer here (must match exactly one of the options)"
}
    `.trim();

  } else if (topic === "Verbal Ability") {
    prompt = `Generate exactly ${n} extremely challenging and multi-layered Multiple Choice Questions (MCQs) for **Verbal Ability Aptitude**, specifically designed to mimic the highest difficulty questions found in IT company placement aptitude tests (e.g., TCS Advanced, Infosys, Wipro, Capgemini, Cognizant).

Each question must:
- Focus solely on Verbal Ability, including topics like Reading Comprehension (complex passages), Sentence Correction/Error Identification, Fill in the Blanks (advanced vocabulary/grammar), Para Jumbles/Sentence Rearrangement, Synonyms & Antonyms (uncommon words), Analogy (word relationships), or Critical Reasoning.
- Be tricky, testing nuanced understanding of English grammar, vocabulary, context, and inferential comprehension.
- Avoid simple vocabulary recall or basic grammatical rules.
- Have 4 distinct options (A, B, C, D).
- Have only one correct answer, which must be clearly discernible.

Important constraints:
- The number of questions must be exactly ${n}.
- Do NOT include any explanations, notes, or introductory/concluding text outside the JSON array.

Output format:
Return ONLY a JSON array of exactly ${n} objects. Each object must follow this format:
{
  "question": "Your complex verbal ability question text here, possibly a passage, a challenging sentence, or a vocabulary query.",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "Correct answer here (must match exactly one of the options)"
}
    `.trim();

  } else if (topic === "Programming") {
    prompt = `Generate exactly ${n} extremely challenging and multi-layered Multiple Choice Questions (MCQs) for **Programming Aptitude**, specifically designed to mimic the highest difficulty questions found in IT company placement aptitude tests (e.g., TCS Advanced, Infosys, Wipro, Capgemini, Cognizant).

Each question must:
- Focus solely on core Programming concepts, including topics like Data Structures (Arrays, Linked Lists, Trees, Graphs, Stacks, Queues), Algorithms (Sorting, Searching, Recursion, Time/Space Complexity Analysis), Object-Oriented Programming (Polymorphism, Inheritance, Encapsulation, Abstraction), Basic Programming Logic (Loops, Conditionals, Functions), or Debugging/Output Prediction for pseudo-code or common language snippets (C, C++, Java, Python, though questions should be language-agnostic where possible or state the language clearly).
- Be tricky, requiring deep understanding of execution flow, edge cases, complexity analysis, or subtle logical errors.
- Avoid simple syntax checks or basic variable assignments.
- Have 4 distinct options (A, B, C, D).
- Have only one correct answer, which must be clearly discernible.

Important constraints:
- The number of questions must be exactly ${n}.
- Do NOT include any explanations, notes, or introductory/concluding text outside the JSON array.

Output format:
Return ONLY a JSON array of exactly ${n} objects. Each object must follow this format:
{
  "question": "Your complex programming aptitude question text here, possibly a code snippet, a problem statement, or a conceptual query.",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "Correct answer here (must match exactly one of the options)"
}
    `.trim();

  } else if (topic === "Mixed") {
    prompt = `Generate exactly ${n} extremely challenging and multi-layered Multiple Choice Questions (MCQs) for **Mixed Aptitude**, specifically designed to mimic the highest difficulty questions found in IT company placement aptitude tests (e.g., TCS Advanced, Infosys, Wipro, Capgemini, Cognizant).

Each question must:
- Randomly select its primary focus from **any** of the core aptitude domains: Quantitative Aptitude, Logical Reasoning Aptitude, Verbal Ability Aptitude, or Programming Aptitude. The mix should be varied.
- Be tricky and complex within its chosen domain, requiring careful analysis, multi-step problem-solving, or subtle comprehension.
- Avoid simple or straightforward questions.
- Have 4 distinct options (A, B, C, D).
- Have only one correct answer, which must be clearly discernible.

Important constraints:
- The number of questions must be exactly ${n}.
- The questions should cover a **mix of domains**, not concentrating too heavily on just one.
- Do NOT include any explanations, notes, or introductory/concluding text outside the JSON array.

Output format:
Return ONLY a JSON array of exactly ${n} objects. Each object must follow this format:
{
  "question": "Your complex mixed aptitude question text here. It could be quantitative, logical, verbal, or programming-related.",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "Correct answer here (must match exactly one of the options)"
}
    `.trim();

  } else {
    // fallback to Quantitative Aptitude if topic is unrecognized
    prompt = ` Generate exactly ${n} extremely challenging and multi-layered Multiple Choice Questions (MCQs) for ${topic}, specifically designed to mimic the highest difficulty questions found in IT company placement aptitude tests (e.g., TCS Advanced, Infosys, Wipro, Capgemini, Cognizant).

Each question must:
- Focus on ${topic}, potentially integrating concepts from Number Systems, Percentages, Profit & Loss, Time & Work, Speed-Distance-Time, Averages, Ratio & Proportion, Mixtures & Allegations, Permutations & Combinations, Probability, or Data Interpretation.
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
   "question": "Your complex ${topic} question text here, possibly involving a scenario or multiple conditions.",
   "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": number  // 0-based index of correct option
 }  
    `.trim();
  }

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
