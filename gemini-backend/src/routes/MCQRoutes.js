// src/routes/mcq.js
import express from 'express';
import { handleGenerateMCQs } from '../controller/generateMcqController.js';

const mcqRouter = express.Router();

mcqRouter.post('/generate', handleGenerateMCQs);

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
