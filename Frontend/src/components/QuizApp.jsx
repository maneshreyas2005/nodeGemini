import { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock, RotateCcw, CheckCircle, XCircle, ArrowRight, AlertCircle } from 'lucide-react';

const QuizApp = () => {
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const [res1, res2] = await Promise.all([
                    axios.post('http://localhost:3001/mcqs/generate', { topic: 'Quantitative Aptitude' }, {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: false
                    }) //,
                    // axios.post('http://localhost:3001/mcqs/generate', { topic: 'Quantitative Aptitude' }, {
                    //     headers: { 'Content-Type': 'application/json' },
                    //     withCredentials: false
                    // })
                ]);

                const combinedQuestions = [...res1.data];

                console.log(res1)

                if (combinedQuestions.length !== 10) {
                    console.warn(`⚠️ Expected 10 questions but got ${combinedQuestions.length}.`);
                }

                setQuizData({ mcqs: combinedQuestions });
                setLoading(false);
            } catch (error) {
                console.error('❌ Failed to fetch questions', error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);


    useEffect(() => {
        if (quizStarted && !quizCompleted && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !quizCompleted) {
            handleQuizComplete();
        }
    }, [timeLeft, quizStarted, quizCompleted]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStart = () => setQuizStarted(true);

    const handleAnswerSelect = (answerIndex) => setSelectedAnswer(answerIndex);

    const handleNextQuestion = () => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestion] = selectedAnswer;
        setUserAnswers(updatedAnswers);

        if (currentQuestion < quizData.mcqs.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            handleQuizComplete();
        }
    };

    const handleQuizComplete = () => {
        const finalAnswers = [...userAnswers];
        if (selectedAnswer !== null) finalAnswers[currentQuestion] = selectedAnswer;
        setUserAnswers(finalAnswers);
        setQuizCompleted(true);
    };

    const calculateScore = () => {
        return userAnswers.reduce((score, answer, index) => {
            return answer === quizData.mcqs[index].answer ? score + 1 : score;
        }, 0);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setUserAnswers([]);
        setQuizCompleted(false);
        setTimeLeft(300);
        setQuizStarted(false);
    };

    if (loading || !quizData || !quizData.mcqs || quizData.mcqs.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-lg font-semibold text-gray-600">Loading quiz...</p>
            </div>
        );
    }

    if (!quizStarted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Quiz Assessment</h1>
                        <p className="text-gray-600 mb-6">Test your knowledge with our comprehensive quiz</p>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Clock className="w-5 h-5 text-blue-600" />
                                <span className="font-semibold text-blue-800">Quiz Information</span>
                            </div>
                            <div className="text-sm text-blue-700 space-y-1">
                                <p>Duration: {quizData.mcqs.length} minutes</p>
                                <p>Questions: {quizData.mcqs.length}</p>
                                <p>Type: Multiple Choice</p>
                            </div>
                        </div>

                        <button
                            onClick={handleStart}
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                        >
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (quizCompleted) {
        const score = calculateScore();
        const percentage = Math.round((score / quizData.mcqs.length) * 100);

        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Results</h2>
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 mb-4">
                            <span className="text-3xl font-bold text-blue-600">{percentage}%</span>
                        </div>
                        <p className="text-xl text-gray-600">
                            You scored {score} out of {quizData.mcqs.length} questions correctly
                        </p>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Results</h3>
                        <div className="space-y-4">
                            {quizData.mcqs.map((mcq, index) => {
                                const userAnswer = userAnswers[index];
                                const isCorrect = userAnswer === mcq.answer;

                                return (
                                    <div key={index} className="border rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">
                                                {isCorrect ? (
                                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                                ) : (
                                                    <XCircle className="w-5 h-5 text-red-600" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800 mb-2">
                                                    Q{index + 1}: {mcq.question}
                                                </p>
                                                <div className="text-sm">
                                                    <p className="text-green-700 mb-1">
                                                        <strong>Correct Answer:</strong> {mcq.options[mcq.answer]}
                                                    </p>
                                                    {!isCorrect && userAnswer !== undefined && (
                                                        <p className="text-red-700">
                                                            <strong>Your Answer:</strong> {mcq.options[userAnswer]}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={resetQuiz}
                            className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-flex items-center gap-2"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Retake Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentMCQ = quizData.mcqs[currentQuestion];
    const progress = quizData?.mcqs?.length
        ? ((currentQuestion + 1) / quizData.mcqs.length) * 100
        : 0;


    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Quiz Assessment</h1>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-gray-600" />
                                <span className={`font-mono text-lg ${timeLeft < 60 ? 'text-red-600' : 'text-gray-800'}`}>{formatTime(timeLeft)}</span>
                            </div>
                            <div className="text-gray-600">
                                Question {currentQuestion + 1} of {quizData.mcqs.length}
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex items-center justify-center">
                                {currentQuestion + 1}
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">{currentMCQ.question}</h2>
                        </div>
                    </div>

                    <div className="space-y-3 mb-8">
                        {currentMCQ.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${selectedAnswer === index
                                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${selectedAnswer === index
                                        ? 'border-blue-500 bg-blue-500 text-white'
                                        : 'border-gray-400 text-gray-600'
                                        }`}>
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <span className="text-gray-800">{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleNextQuestion}
                            disabled={selectedAnswer === null}
                            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            {currentQuestion === quizData.mcqs.length - 1 ? 'Finish Quiz' : 'Next Question'}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizApp;
