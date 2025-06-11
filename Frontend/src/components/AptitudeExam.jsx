import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Check, X, RotateCcw, Send, Clock } from 'lucide-react';
import axios from 'axios';

const QuizApp = () => {
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [markedQuestions, setMarkedQuestions] = useState(new Set());
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null); // 10 minutes timer
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.post('https://nodegemini-backend.onrender.com/mcqs/generate',
                    { topic: 'Quantitative Aptitude' },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: false
                    }
                );

                const formattedQuestions = res.data.map((mcq, index) => ({
                    id: index + 1,
                    question: mcq.question,
                    options: mcq.options,
                    correctAnswer: mcq.answer
                }));

                setQuizData(formattedQuestions);
                setTimeLeft(formattedQuestions.length * 60);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch questions', error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        if (quizStarted && !quizSubmitted && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !quizSubmitted) {
            handleSubmitQuiz();
        }
    }, [timeLeft, quizStarted, quizSubmitted]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const currentQuestion = quizData[currentQuestionIndex];

    const handleAnswerSelect = (optionIndex) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: optionIndex
        }));
    };

    const handleMarkAsRead = () => {
        setMarkedQuestions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(currentQuestion.id)) {
                newSet.delete(currentQuestion.id);
            } else {
                newSet.add(currentQuestion.id);
            }
            return newSet;
        });
    };

    const goToRandomQuestion = () => {
        const randomIndex = Math.floor(Math.random() * quizData.length);
        setCurrentQuestionIndex(randomIndex);
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const goToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const handleSubmitQuiz = () => {
        setQuizSubmitted(true);
        setShowResults(true);
    };

    const calculateResults = () => {
        let correct = 0;
        let attempted = Object.keys(answers).length;

        Object.entries(answers).forEach(([questionId, selectedAnswer]) => {
            const question = quizData.find(q => q.id === parseInt(questionId));
            if (question && question.correctAnswer === selectedAnswer) {
                correct++;
            }
        });

        return {
            attempted,
            correct,
            incorrect: attempted - correct,
            unattempted: quizData.length - attempted,
            percentage: attempted > 0 ? Math.round((correct / attempted) * 100) : 0
        };
    };

    const resetQuiz = () => {
        setAnswers({});
        setMarkedQuestions(new Set());
        setQuizSubmitted(false);
        setShowResults(false);
        setCurrentQuestionIndex(0);
        setTimeLeft(600);
        setQuizStarted(false);
    };

    const getQuestionStatus = (questionId) => {
        if (answers.hasOwnProperty(questionId)) return 'answered';
        if (markedQuestions.has(questionId)) return 'marked';
        return 'unattempted';
    };

    const startQuiz = () => {
        setQuizStarted(true);
    };

    if (loading) {
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
                                <p>Duration: 60 minutes</p>
                                <p>Questions: {quizData.length}</p>
                                <p>Type: Multiple Choice</p>
                            </div>
                        </div>

                        <button
                            onClick={startQuiz}
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                        >
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (showResults) {
        const results = calculateResults();
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Results</h1>
                    <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="text-2xl font-bold text-blue-600">{results.attempted}</div>
                            <div className="text-sm text-gray-600">Attempted</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="text-2xl font-bold text-green-600">{results.correct}</div>
                            <div className="text-sm text-gray-600">Correct</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="text-2xl font-bold text-red-600">{results.incorrect}</div>
                            <div className="text-sm text-gray-600">Incorrect</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="text-2xl font-bold text-gray-600">{results.unattempted}</div>
                            <div className="text-sm text-gray-600">Unattempted</div>
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <div className="text-4xl font-bold text-indigo-600">{results.percentage}%</div>
                        <div className="text-lg text-gray-700">Overall Score</div>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800">Question Review</h2>
                    {quizData.map((question, index) => {
                        const userAnswer = answers[question.id];
                        const isCorrect = userAnswer === question.correctAnswer;
                        const isAttempted = answers.hasOwnProperty(question.id);

                        return (
                            <div key={question.id} className="border rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <span className="font-medium text-gray-800">Q{index + 1}. {question.question}</span>
                                    <div className="flex items-center space-x-2">
                                        {isAttempted ? (
                                            isCorrect ? (
                                                <Check className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <X className="w-5 h-5 text-red-500" />
                                            )
                                        ) : (
                                            <div className="w-5 h-5 rounded-full bg-gray-300"></div>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                    {question.options.map((option, optIndex) => (
                                        <div key={optIndex} className={`p-2 rounded ${optIndex === question.correctAnswer ? 'bg-green-100 text-green-800' :
                                            userAnswer === optIndex && !isCorrect ? 'bg-red-100 text-red-800' :
                                                'bg-gray-50'
                                            }`}>
                                            {String.fromCharCode(65 + optIndex)}. {option}
                                            {optIndex === question.correctAnswer && <span className="ml-2 text-green-600">✓</span>}
                                            {userAnswer === optIndex && userAnswer !== question.correctAnswer && <span className="ml-2 text-red-600">✗</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center">
                    <button
                        onClick={resetQuiz}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2"
                    >
                        <RotateCcw className="w-5 h-5" />
                        <span>Take Another Quiz</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Quiz Assessment</h1>
                <div className="flex justify-center items-center gap-4">
                    <div className="w-24 h-1 bg-blue-500"></div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-600" />
                        <span className={`font-mono text-lg ${timeLeft < 60 ? 'text-red-600' : 'text-gray-800'}`}>
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                    <div className="w-24 h-1 bg-blue-500"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Question Panel */}
                <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Question {currentQuestionIndex + 1} of {quizData.length}
                        </h2>
                        <button
                            onClick={handleMarkAsRead}
                            className={`px-3 py-2 rounded-lg text-sm font-medium inline-flex items-center space-x-1 ${markedQuestions.has(currentQuestion.id)
                                ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <BookOpen className="w-4 h-4" />
                            <span>{markedQuestions.has(currentQuestion.id) ? 'Marked' : 'Mark'}</span>
                        </button>
                    </div>

                    <div className="mb-6">
                        <p className="text-lg text-gray-800 mb-4">{currentQuestion.question}</p>
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => (
                                <label
                                    key={index}
                                    className={`block p-4 border rounded-lg cursor-pointer transition-colors ${answers[currentQuestion.id] === index
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestion.id}`}
                                        value={index}
                                        checked={answers[currentQuestion.id] === index}
                                        onChange={() => handleAnswerSelect(index)}
                                        className="sr-only"
                                    />
                                    <div className="flex items-center">
                                        <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${answers[currentQuestion.id] === index
                                            ? 'border-blue-500 bg-blue-500'
                                            : 'border-gray-300'
                                            }`}>
                                            {answers[currentQuestion.id] === index && (
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            )}
                                        </div>
                                        <span className="text-gray-800">
                                            <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                            <button
                                onClick={goToPreviousQuestion}
                                disabled={currentQuestionIndex === 0}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center space-x-1"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                <span>Previous</span>
                            </button>
                            <button
                                onClick={goToNextQuestion}
                                disabled={currentQuestionIndex === quizData.length - 1}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center space-x-1"
                            >
                                <span>Next</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <button
                            onClick={goToRandomQuestion}
                            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium"
                        >
                            Random Question
                        </button>
                    </div>
                </div>

                {/* Navigation Panel */}
                {/* <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Navigator</h3>

                    <div className="grid grid-cols-5 gap-2 mb-6">
                        {quizData.map((question, index) => {
                            const status = getQuestionStatus(question.id);
                            return (
                                <button
                                    key={question.id}
                                    onClick={() => goToQuestion(index)}
                                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${currentQuestionIndex === index
                                        ? 'bg-blue-500 text-white'
                                        : status === 'answered'
                                            ? 'bg-green-100 text-green-800 border border-green-300'
                                            : status === 'marked'
                                                ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            );
                        })}
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-2 text-sm">
                            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                            <span>Answered ({Object.keys(answers).length})</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                            <span>Marked ({markedQuestions.size})</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <div className="w-4 h-4 bg-gray-100 rounded"></div>
                            <span>Unattempted ({quizData.length - Object.keys(answers).length})</span>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmitQuiz}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium inline-flex items-center justify-center space-x-2"
                    >
                        <Send className="w-5 h-5" />
                        <span>Submit Quiz</span>
                    </button>
                </div> */}
                {/* Navigation Panel */}
                {/* Navigation Panel */}
                <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Navigator</h3>

                    {/* SCROLLABLE grid of buttons */}
                    <div className="QuestionsNumber grid grid-cols-5 gap-2 mb-6 overflow-y-auto" style={{ maxHeight: '300px' }}>
                        {quizData.map((question, index) => {
                            const status = getQuestionStatus(question.id);
                            return (
                                <button
                                    key={question.id}
                                    onClick={() => goToQuestion(index)}
                                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${currentQuestionIndex === index
                                        ? 'bg-blue-500 text-white'
                                        : status === 'answered'
                                            ? 'bg-green-100 text-green-800 border border-green-300'
                                            : status === 'marked'
                                                ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            );
                        })}
                    </div>

                    {/* Legend stays fixed */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-2 text-sm">
                            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                            <span>Answered ({Object.keys(answers).length})</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                            <span>Marked ({markedQuestions.size})</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <div className="w-4 h-4 bg-gray-100 rounded"></div>
                            <span>Unattempted ({quizData.length - Object.keys(answers).length})</span>
                        </div>
                    </div>

                    {/* Submit button stays fixed */}
                    <button
                        onClick={handleSubmitQuiz}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium inline-flex items-center justify-center space-x-2 mt-auto"
                    >
                        <Send className="w-5 h-5" />
                        <span>Submit Quiz</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default QuizApp;
