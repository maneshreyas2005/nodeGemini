export const saveQuizResponses = async (studentId, quizId, questions, answers, db) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        const optionLetters = ['A', 'B', 'C', 'D'];

        for (const question of questions) {
            // 1. Insert question
            const [questionResult] = await connection.execute(`
                INSERT INTO quiz_questions (quiz_id, question_text, correct_answer_index)
                VALUES (?, ?, ?)
            `, [quizId, question.question_text, question.correct_answer_index]);

            const questionId = questionResult.insertId;

            // 2. Insert options
            for (let i = 0; i < question.options.length; i++) {
                await connection.execute(`
                    INSERT INTO quiz_options (question_id, option_index, option_text)
                    VALUES (?, ?, ?)
                `, [questionId, i, question.options[i]]);
            }

            // 3. Insert response
            const selectedIndex = answers[questionId] ?? answers[question.question_text];
            const correctIndex = question.correct_answer_index;
            const selectedAnswer = selectedIndex !== undefined ? optionLetters[selectedIndex] : null;
            const isCorrect = selectedIndex === correctIndex;

            await connection.execute(`
                INSERT INTO quiz_responses (
                    student_id, quiz_id, question_text,
                    option_a, option_b, option_c, option_d,
                    correct_answer, selected_answer, is_correct
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                studentId,
                quizId,
                question.question_text,
                question.options[0],
                question.options[1],
                question.options[2],
                question.options[3],
                optionLetters[correctIndex],
                selectedAnswer,
                selectedAnswer !== null ? isCorrect : null
            ]);
        }

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};