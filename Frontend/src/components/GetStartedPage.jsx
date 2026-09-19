import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from './Navbar';
import { 
    Calculator, 
    Brain, 
    BookOpen, 
    Code2, 
    Terminal, 
    Layers, 
    Clock, 
    Check, 
    Sparkles, 
    ArrowRight 
} from 'lucide-react';

const TOPICS = [
    {
        id: "Quantitative",
        title: "Quantitative Aptitude",
        desc: "Arithmetic, Speed & Distance, Time & Work, Probability, Percentages",
        icon: Calculator,
        badge: "TCS / Infosys",
        color: "bg-orange-100"
    },
    {
        id: "Logical Reasoning",
        title: "Logical Reasoning",
        desc: "Syllogisms, Blood Relations, Puzzles, Coding-Decoding, Arrangements",
        icon: Brain,
        badge: "Capgemini / Wipro",
        color: "bg-indigo-100"
    },
    {
        id: "Verbal Ability",
        title: "Verbal Ability",
        desc: "Reading Comprehension, Error Spotting, Para Jumbles, Grammar",
        icon: BookOpen,
        badge: "Cognizant / Accenture",
        color: "bg-emerald-100"
    },
    {
        id: "Programming",
        title: "Programming Aptitude",
        desc: "Data Structures, Algorithms, Time Complexity, Recursion, Output Prediction",
        icon: Code2,
        badge: "Technical Round",
        color: "bg-blue-100"
    },
    {
        id: "Technical",
        title: "Technical CS Round",
        desc: "Operating Systems, Computer Networks, DBMS & SQL, Object-Oriented Principles",
        icon: Terminal,
        badge: "Core CS",
        color: "bg-purple-100"
    },
    {
        id: "Mixed",
        title: "Full Mixed Mock",
        desc: "Randomized blend of Quant, Logic, Verbal, and Tech for real test pressure",
        icon: Layers,
        badge: "Comprehensive",
        color: "bg-pink-100"
    }
];

const QUESTION_COUNTS = [10, 20, 30, 40];

const GetStartedPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Support preselected topic passed from landing page
    const initialTopic = location.state?.preselectedTopic || "Quantitative";
    const [selectedTopic, setSelectedTopic] = useState(initialTopic);
    const [questionCount, setQuestionCount] = useState(10);

    const handleStart = () => {
        navigate('/AptitudeExam', {
            state: {
                count: questionCount,
                topic: selectedTopic
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#fec745] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
            <Navbar />

            <main className="flex-1 py-10 sm:py-16 px-4 sm:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header Banner */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 bg-black text-white text-xs font-bold px-4 py-1.5 rounded-full border-2 border-black mb-3 brutal-shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-[#fec745]" />
                            <span>EXAM CONFIGURATION</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight mb-3">
                            Customize Your Assessment
                        </h1>
                        <p className="text-base font-medium text-black/80 max-w-xl mx-auto">
                            Choose your target aptitude domain and preferred test duration. 
                            Gemini AI will synthesize fresh, placement-grade questions on the fly.
                        </p>
                    </div>

                    {/* Main Configuration Card */}
                    <div className="brutal-card p-6 sm:p-10 mb-8">
                        {/* Step 1: Topic Selection */}
                        <div className="mb-10">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-black text-[#0a0a0a] flex items-center gap-2">
                                    <span className="w-7 h-7 rounded-full bg-black text-white text-xs flex items-center justify-center font-black">1</span>
                                    <span>Select Exam Domain</span>
                                </h2>
                                <span className="text-xs font-bold text-gray-500">Pick one to focus your mock</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {TOPICS.map((topic) => {
                                    const Icon = topic.icon;
                                    const isSelected = selectedTopic === topic.id;
                                    return (
                                        <div
                                            key={topic.id}
                                            onClick={() => setSelectedTopic(topic.id)}
                                            className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                                                isSelected 
                                                    ? 'border-black bg-[#fff5ea] brutal-shadow transform -translate-y-1' 
                                                    : 'border-black/20 bg-white hover:border-black hover:bg-gray-50'
                                            }`}
                                        >
                                            {/* Checkmark Indicator */}
                                            {isSelected && (
                                                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                                                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                                                </div>
                                            )}

                                            <div className={`w-10 h-10 rounded-xl ${topic.color} border-2 border-black flex items-center justify-center mb-3`}>
                                                <Icon className="w-5 h-5 text-black" />
                                            </div>

                                            <h3 className="font-extrabold text-base text-[#0a0a0a] mb-1">
                                                {topic.title}
                                            </h3>

                                            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                                                {topic.desc}
                                            </p>

                                            <span className="inline-block text-[10px] font-black uppercase tracking-wider bg-[#f397c8] text-black px-2 py-0.5 rounded-full border border-black">
                                                {topic.badge}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 2: Question Count & Duration */}
                        <div className="mb-10 pt-8 border-t-2 border-dashed border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-black text-[#0a0a0a] flex items-center gap-2">
                                    <span className="w-7 h-7 rounded-full bg-black text-white text-xs flex items-center justify-center font-black">2</span>
                                    <span>Select Number of Questions</span>
                                </h2>
                                <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    1 minute allocated per question
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {QUESTION_COUNTS.map((count) => {
                                    const isSelected = questionCount === count;
                                    return (
                                        <button
                                            key={count}
                                            type="button"
                                            onClick={() => setQuestionCount(count)}
                                            className={`p-4 rounded-2xl border-2 font-bold text-center transition-all ${
                                                isSelected
                                                    ? 'border-black bg-[#fec745] text-black brutal-shadow transform -translate-y-1'
                                                    : 'border-black/20 bg-white text-gray-800 hover:border-black'
                                            }`}
                                        >
                                            <div className="text-3xl font-black">{count}</div>
                                            <div className="text-xs font-semibold text-gray-700 mt-1">
                                                {count} Minutes
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Summary Pill & Launch Button */}
                        <div className="bg-[#fff9e6] rounded-2xl border-2 border-black p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <div className="text-xs font-bold uppercase tracking-wider text-gray-600">Selected Setup:</div>
                                <div className="text-lg font-black text-black">
                                    {selectedTopic} • {questionCount} Questions ({questionCount} mins)
                                </div>
                            </div>

                            <button
                                onClick={handleStart}
                                className="w-full sm:w-auto brutal-btn-primary px-8 py-4 text-base font-black flex items-center justify-center gap-2"
                            >
                                <span>Launch Assessment</span>
                                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GetStartedPage;
