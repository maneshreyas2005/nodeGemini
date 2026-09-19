import React, { useState, useEffect } from 'react';
import { 
    ChevronLeft, 
    ChevronRight, 
    BookOpen, 
    Check, 
    X, 
    RotateCcw, 
    Send, 
    Clock, 
    Shuffle, 
    Sparkles, 
    AlertCircle, 
    CheckCircle2, 
    Award,
    ArrowLeft
} from 'lucide-react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';

const AptitudeExam = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const count = location.state?.count || 10;
    const topic = location.state?.topic || "Quantitative";

    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [markedQuestions, setMarkedQuestions] = useState(new Set());
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [studentID, setStudentID] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Determine backend URL
    const getBackendUrl = () => {
        return window.location.hostname === 'localhost' 
            ? 'http://localhost:3001' 
            : 'https://nodegemini-backend.onrender.com';
    };

    // Load Student ID
    useEffect(() => {
        try {
            const rawStudent = localStorage.getItem('user');
            if (rawStudent) {
                const student = JSON.parse(rawStudent);
                if (student?.id) setStudentID(student.id);
            }
        } catch (e) {
            console.error('Error reading student from localStorage', e);
        }
    }, []);

    // Fetch Questions from Gemini
    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            setFetchError(null);
            try {
                const backendUrl = getBackendUrl();
                // Attempt local backend first if on localhost, fallback to render if needed
                let res;
                try {
                    res = await axios.post(`${backendUrl}/mcqs/generate`,
                        { topic, count },
                        {
                            headers: { 'Content-Type': 'application/json' },
                            timeout: 60000
                        }
                    );
                } catch (firstErr) {
                    if (backendUrl !== 'https://nodegemini-backend.onrender.com') {
                        console.warn('Local fetch failed, trying production backend fallback...', firstErr);
                        res = await axios.post('https://nodegemini-backend.onrender.com/mcqs/generate',
                            { topic, count },
                            { headers: { 'Content-Type': 'application/json' }, timeout: 60000 }
                        );
                    } else {
                        throw firstErr;
                    }
                }

                if (!res.data || !Array.isArray(res.data) || res.data.length === 0) {
                    throw new Error('Received invalid question format from AI engine.');
                }

                const formattedQuestions = res.data.map((mcq, index) => ({
                    id: index + 1,
                    question: mcq.question,
                    options: mcq.options,
                    correctAnswer: typeof mcq.answer === 'number' ? mcq.answer : 0,
                }));

                setQuizData(formattedQuestions);
                setTimeLeft(formattedQuestions.length * 60);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch questions:', error);
                setFetchError(error.message || 'Unable to generate questions at this time. Please check your connection.');
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [count, topic]);

    // Countdown Timer
    useEffect(() => {
        if (quizStarted && !quizSubmitted && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !quizSubmitted && quizStarted) {
            handleSubmitQuiz();
        }
    }, [timeLeft, quizStarted, quizSubmitted]);

    const formatTime = (seconds) => {
        if (seconds === null || seconds === undefined) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const currentQuestion = quizData[currentQuestionIndex];

    const handleAnswerSelect = (optionIndex) => {
        if (!currentQuestion) return;
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: optionIndex
        }));
    };

    const saveQuizResults = async () => {
        setIsSubmitting(true);
        try {
            const backendUrl = getBackendUrl();
            const newQuizId = Date.now();

            const payload = {
                studentId: studentID || 1,
                quizId: newQuizId,
                topic,
                questions: quizData.map(q => ({
                    id: q.id,
                    question_text: q.question,
                    correct_answer_index: q.correctAnswer,
                    options: q.options
                })),
                answers: Object.keys(answers).reduce((acc, questionId) => {
                    acc[questionId] = answers[questionId];
                    return acc;
                }, {}),
                markedQuestions: Array.from(markedQuestions),
                timeTaken: (quizData.length * 60) - (timeLeft || 0)
            };

            await axios.post(`${backendUrl}/mcqs/save-quiz`, payload, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 15000
            }).catch(e => {
                console.warn('Backend save response warning (proceeding locally):', e);
            });

            return true;
        } catch (error) {
            console.error('Failed to save quiz results:', error);
            // Even if backend fails to save to SQL, let student review results
            return true;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitQuiz = async () => {
        await saveQuizResults();
        setQuizSubmitted(true);
        setShowResults(true);
    };

    const handleMarkAsRead = () => {
        if (!currentQuestion) return;
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

    const calculateResults = () => {
        let correct = 0;
        let attempted = Object.keys(answers).length;

        quizData.forEach(q => {
            if (answers[q.id] !== undefined && answers[q.id] === q.correctAnswer) {
                correct++;
            }
        });

        const total = quizData.length;
        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

        return {
            total,
            attempted,
            correct,
            incorrect: attempted - correct,
            unattempted: total - attempted,
            percentage
        };
    };

    const resetQuiz = () => {
        navigate('/GetStartedPage');
    };

    const getQuestionStatus = (questionId) => {
        if (answers.hasOwnProperty(questionId)) return 'answered';
        if (markedQuestions.has(questionId)) return 'marked';
        return 'unattempted';
    };

    // 1. Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-[#fec745] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="brutal-card p-8 sm:p-12 text-center max-w-md w-full bg-[#fffef8]">
                        <div className="w-16 h-16 rounded-2xl bg-[#f397c8] border-2 border-black flex items-center justify-center mx-auto mb-6 brutal-shadow animate-bounce">
                            <Sparkles className="w-8 h-8 text-black" />
                        </div>
                        <h2 className="text-2xl font-black text-[#0a0a0a] mb-2">
                            Synthesizing Questions...
                        </h2>
                        <p className="text-sm font-semibold text-gray-700 mb-6">
                            Gemini 2.0 Flash is constructing {count} challenging {topic} questions for you.
                        </p>
                        <div className="w-full bg-gray-200 h-3 rounded-full border-2 border-black overflow-hidden">
                            <div className="bg-[#ff851b] h-full w-2/3 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 2. Fetch Error State
    if (fetchError) {
        return (
            <div className="min-h-screen bg-[#fec745] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="brutal-card p-8 text-center max-w-md w-full bg-[#fffef8]">
                        <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-black text-black mb-2">Generation Failed</h2>
                        <p className="text-sm font-medium text-gray-700 mb-6">{fetchError}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="brutal-btn-primary px-6 py-3 text-sm font-bold"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 3. Pre-Quiz Instruction Screen
    if (!quizStarted) {
        return (
            <div className="min-h-screen bg-[#fec745] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
                    <div className="brutal-card p-6 sm:p-10 max-w-lg w-full bg-[#fffef8]">
                        <div className="text-center mb-6">
                            <div className="inline-block bg-[#f397c8] text-black text-xs font-black px-3.5 py-1 rounded-full border-2 border-black mb-3 brutal-shadow-sm">
                                READY TO BEGIN
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight">
                                Placement Mock Exam
                            </h1>
                            <p className="text-sm font-semibold text-gray-600 mt-1">
                                Test your skills under real test time constraints
                            </p>
                        </div>

                        {/* Briefing Box */}
                        <div className="bg-[#fff9e6] border-2 border-black rounded-2xl p-5 mb-8 space-y-3">
                            <div className="flex items-center justify-between pb-2 border-b border-black/10">
                                <span className="text-xs font-bold uppercase text-gray-600">Domain</span>
                                <span className="text-sm font-black text-black">{topic}</span>
                            </div>
                            <div className="flex items-center justify-between pb-2 border-b border-black/10">
                                <span className="text-xs font-bold uppercase text-gray-600">Total Questions</span>
                                <span className="text-sm font-black text-black">{quizData.length} Questions</span>
                            </div>
                            <div className="flex items-center justify-between pb-2 border-b border-black/10">
                                <span className="text-xs font-bold uppercase text-gray-600">Allotted Time</span>
                                <span className="text-sm font-black text-black">{quizData.length} Minutes</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase text-gray-600">Scoring</span>
                                <span className="text-sm font-black text-black">+1 Correct / 0 Negative</span>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="text-xs font-semibold text-gray-700 mb-8 space-y-2">
                            <p>• You can mark questions for review and jump across questions at any time.</p>
                            <p>• The test auto-submits when the countdown reaches 00:00.</p>
                            <p>• Instant scorecard and answer explanations appear immediately upon submit.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => setQuizStarted(true)}
                                className="w-full brutal-btn-primary py-4 text-lg font-black"
                            >
                                Start Assessment Now 🚀
                            </button>
                            <Link
                                to="/GetStartedPage"
                                className="text-center text-xs font-black text-gray-700 hover:text-black py-2"
                            >
                                ← Change Topic or Count
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 4. Results & Scoreboard Screen
    if (showResults) {
        const results = calculateResults();
        return (
            <div className="min-h-screen bg-[#fec745] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
                <Navbar />

                <div className="max-w-5xl mx-auto w-full py-10 px-4 sm:px-8">
                    {/* Top Result Card */}
                    <div className="brutal-card p-6 sm:p-10 mb-8 bg-[#fffef8]">
                        <div className="text-center mb-8">
                            <div className="inline-block bg-[#10b981] text-black text-xs font-black px-4 py-1 rounded-full border-2 border-black mb-3 brutal-shadow-sm">
                                ASSESSMENT COMPLETE
                            </div>
                            <h1 className="text-3xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight mb-2">
                                Your Performance Scorecard
                            </h1>
                            <p className="text-sm font-bold text-gray-600">
                                Domain: {topic} • {quizData.length} Total Questions
                            </p>
                        </div>

                        {/* Score Metric Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            <div className="bg-blue-50 border-2 border-black rounded-2xl p-4 text-center brutal-shadow-sm">
                                <div className="text-3xl font-black text-blue-700">{results.attempted}</div>
                                <div className="text-xs font-bold text-gray-700 mt-1">Attempted</div>
                            </div>
                            <div className="bg-emerald-50 border-2 border-black rounded-2xl p-4 text-center brutal-shadow-sm">
                                <div className="text-3xl font-black text-emerald-700">{results.correct}</div>
                                <div className="text-xs font-bold text-gray-700 mt-1">Correct</div>
                            </div>
                            <div className="bg-red-50 border-2 border-black rounded-2xl p-4 text-center brutal-shadow-sm">
                                <div className="text-3xl font-black text-red-700">{results.incorrect}</div>
                                <div className="text-xs font-bold text-gray-700 mt-1">Incorrect</div>
                            </div>
                            <div className="bg-gray-100 border-2 border-black rounded-2xl p-4 text-center brutal-shadow-sm">
                                <div className="text-3xl font-black text-gray-800">{results.unattempted}</div>
                                <div className="text-xs font-bold text-gray-700 mt-1">Unattempted</div>
                            </div>
                        </div>

                        {/* Grand Total Percentage Dial */}
                        <div className="bg-[#f397c8] border-2 border-black rounded-2xl p-6 text-center brutal-shadow mb-8 flex flex-col items-center justify-center">
                            <div className="text-5xl sm:text-7xl font-black text-black mb-1">
                                {results.percentage}%
                            </div>
                            <div className="text-sm font-black uppercase tracking-wider text-black/80">
                                Overall Accuracy Score
                            </div>
                            <p className="text-xs font-bold text-black/70 mt-2">
                                {results.percentage >= 70 
                                    ? '🎉 Outstanding! Placement-ready for top product and service firms.'
                                    : results.percentage >= 50
                                        ? '👍 Good baseline! Practice another mock to strengthen accuracy.'
                                        : '💪 Keep practicing! Review the explanations below to master these concepts.'}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <button
                                onClick={resetQuiz}
                                className="brutal-btn-primary px-8 py-3.5 text-base font-black flex items-center gap-2"
                            >
                                <RotateCcw className="w-5 h-5" />
                                <span>Take Another Exam</span>
                            </button>
                            <Link
                                to="/"
                                className="brutal-btn-secondary px-6 py-3.5 text-base font-bold"
                            >
                                Home
                            </Link>
                        </div>
                    </div>

                    {/* Detailed Question Review */}
                    <div className="brutal-card p-6 sm:p-8 bg-[#fffef8]">
                        <h2 className="text-2xl font-black text-[#0a0a0a] mb-6 flex items-center gap-2">
                            <span>Detailed Answer Key</span>
                            <span className="text-xs font-bold bg-gray-200 px-2.5 py-1 rounded-full border border-black">
                                {quizData.length} Questions
                            </span>
                        </h2>

                        <div className="space-y-6">
                            {quizData.map((question, index) => {
                                const userAnswer = answers[question.id];
                                const isAttempted = answers.hasOwnProperty(question.id);
                                const isCorrect = isAttempted && userAnswer === question.correctAnswer;

                                return (
                                    <div
                                        key={question.id}
                                        className={`border-2 border-black rounded-2xl p-5 ${
                                            isAttempted
                                                ? isCorrect ? 'bg-emerald-50/50' : 'bg-red-50/50'
                                                : 'bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <span className="font-extrabold text-base text-gray-900 leading-snug">
                                                Q{index + 1}. {question.question}
                                            </span>
                                            <div>
                                                {isAttempted ? (
                                                    isCorrect ? (
                                                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-full border border-black">
                                                            <Check className="w-3.5 h-3.5 stroke-[3]" /> Correct
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 text-xs font-black px-2.5 py-1 rounded-full border border-black">
                                                            <X className="w-3.5 h-3.5 stroke-[3]" /> Wrong
                                                        </span>
                                                    )
                                                ) : (
                                                    <span className="bg-gray-200 text-gray-700 text-xs font-black px-2.5 py-1 rounded-full border border-black">
                                                        Unattempted
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Options Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs font-semibold">
                                            {question.options.map((option, optIdx) => {
                                                const isTargetCorrect = optIdx === question.correctAnswer;
                                                const isSelectedByCandidate = userAnswer === optIdx;

                                                let style = 'bg-white border-black/30 text-gray-800';
                                                if (isTargetCorrect) {
                                                    style = 'bg-emerald-200 border-black text-emerald-950 font-bold';
                                                } else if (isSelectedByCandidate && !isTargetCorrect) {
                                                    style = 'bg-red-200 border-black text-red-950 line-through';
                                                }

                                                return (
                                                    <div
                                                        key={optIdx}
                                                        className={`p-3 rounded-xl border-2 flex items-center justify-between ${style}`}
                                                    >
                                                        <span>
                                                            <strong className="mr-1">{String.fromCharCode(65 + optIdx)}.</strong> {option}
                                                        </span>
                                                        {isTargetCorrect && <span className="font-black text-emerald-800">✓ KEY</span>}
                                                        {isSelectedByCandidate && !isTargetCorrect && <span className="font-black text-red-700">✗ YOUR CHOICE</span>}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 5. Active Exam Cockpit
    return (
        <div className="min-h-screen bg-[#fec745] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
            {/* Top Exam Header */}
            <header className="bg-[#0a0a0a] text-white px-4 sm:px-8 py-3 border-b-2 border-black sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                            <span>super</span>
                            <span className="text-[#f397c8]">prep</span>
                        </Link>
                        <span className="hidden sm:inline-block text-xs font-bold bg-[#1f1f1f] text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                            {topic}
                        </span>
                    </div>

                    {/* Prominent Live Timer */}
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-black font-mono font-black text-sm sm:text-base ${
                        timeLeft < 60 ? 'bg-red-500 text-white animate-pulse' : 'bg-[#fec745] text-black brutal-shadow-sm'
                    }`}>
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(timeLeft)}</span>
                    </div>

                    <button
                        onClick={handleSubmitQuiz}
                        disabled={isSubmitting}
                        className="brutal-btn-primary text-xs sm:text-sm px-4 py-1.5"
                    >
                        Submit Test
                    </button>
                </div>
            </header>

            {/* Exam Content Area */}
            <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: Question Card (8 Cols) */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="brutal-card p-6 sm:p-8 bg-[#fffef8]">
                        {/* Header bar within question */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-dashed border-gray-200">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-black uppercase tracking-wider bg-black text-white px-3 py-1 rounded-full">
                                    Question {currentQuestionIndex + 1} of {quizData.length}
                                </span>
                            </div>

                            <button
                                onClick={handleMarkAsRead}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-black border-2 border-black flex items-center gap-1.5 transition-all ${
                                    markedQuestions.has(currentQuestion?.id)
                                        ? 'bg-[#fec745] text-black brutal-shadow-sm'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>{markedQuestions.has(currentQuestion?.id) ? 'Marked for Review' : 'Mark for Review'}</span>
                            </button>
                        </div>

                        {/* Question Prompt */}
                        <h2 className="text-lg sm:text-xl font-bold text-[#0a0a0a] leading-relaxed mb-6">
                            {currentQuestion?.question}
                        </h2>

                        {/* Option Choices */}
                        <div className="space-y-3 mb-8">
                            {currentQuestion?.options.map((option, idx) => {
                                const isSelected = answers[currentQuestion.id] === idx;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => handleAnswerSelect(idx)}
                                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                                            isSelected
                                                ? 'border-black bg-[#fec745] text-black brutal-shadow font-bold'
                                                : 'border-black/20 bg-white hover:border-black hover:bg-gray-50 text-gray-800'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`w-8 h-8 rounded-xl border-2 border-black flex items-center justify-center text-xs font-black ${
                                                isSelected ? 'bg-black text-white' : 'bg-gray-100 text-black'
                                            }`}>
                                                {String.fromCharCode(65 + idx)}
                                            </span>
                                            <span className="text-sm sm:text-base font-medium">{option}</span>
                                        </div>

                                        {isSelected && (
                                            <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center">
                                                <Check className="w-3 h-3 stroke-[3]" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-gray-100">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={goToPreviousQuestion}
                                    disabled={currentQuestionIndex === 0}
                                    className="brutal-btn-secondary px-4 py-2 text-xs sm:text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    <span>Previous</span>
                                </button>
                                <button
                                    onClick={goToNextQuestion}
                                    disabled={currentQuestionIndex === quizData.length - 1}
                                    className="brutal-btn-secondary px-4 py-2 text-xs sm:text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                                >
                                    <span>Next</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <button
                                onClick={goToRandomQuestion}
                                className="brutal-btn-dark px-4 py-2 text-xs sm:text-sm font-bold flex items-center gap-1.5"
                            >
                                <Shuffle className="w-3.5 h-3.5 text-[#fec745]" />
                                <span>Random Jump</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Question Matrix & Status (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="brutal-card p-6 bg-[#fffef8]">
                        <h3 className="text-base font-black text-[#0a0a0a] mb-4 flex items-center justify-between">
                            <span>Question Navigator</span>
                            <span className="text-xs font-bold text-gray-500">
                                {Object.keys(answers).length}/{quizData.length} Done
                            </span>
                        </h3>

                        {/* Matrix Grid */}
                        <div className="grid grid-cols-5 gap-2.5 mb-6 max-h-72 overflow-y-auto pr-1">
                            {quizData.map((q, idx) => {
                                const status = getQuestionStatus(q.id);
                                const isCurrent = currentQuestionIndex === idx;

                                let btnStyle = 'bg-white text-gray-800 border-black/30 hover:border-black';
                                if (status === 'answered') {
                                    btnStyle = 'bg-[#10b981] text-black border-black font-bold';
                                } else if (status === 'marked') {
                                    btnStyle = 'bg-[#fec745] text-black border-black font-bold';
                                }

                                if (isCurrent) {
                                    btnStyle += ' ring-4 ring-black/20 font-black';
                                }

                                return (
                                    <button
                                        key={q.id}
                                        onClick={() => setCurrentQuestionIndex(idx)}
                                        className={`h-10 rounded-xl border-2 text-xs transition-all flex items-center justify-center ${btnStyle}`}
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Status Legend */}
                        <div className="space-y-2 mb-6 text-xs font-bold text-gray-700 bg-gray-50 p-3.5 rounded-xl border border-black/20">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-md bg-[#10b981] border border-black"></span>
                                    <span>Answered</span>
                                </span>
                                <span>{Object.keys(answers).length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-md bg-[#fec745] border border-black"></span>
                                    <span>Marked for Review</span>
                                </span>
                                <span>{markedQuestions.size}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-md bg-white border border-black"></span>
                                    <span>Unattempted</span>
                                </span>
                                <span>{quizData.length - Object.keys(answers).length}</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmitQuiz}
                            disabled={isSubmitting}
                            className="w-full brutal-btn-primary py-3.5 text-base font-black flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4 stroke-[2.5]" />
                            <span>Submit Exam</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AptitudeExam;
