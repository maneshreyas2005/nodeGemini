import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { 
    Zap, 
    Send, 
    Eye, 
    Calculator, 
    Brain, 
    BookOpen, 
    Code2, 
    Layers, 
    Terminal, 
    ArrowRight, 
    CheckCircle2, 
    Star,
    Sparkles,
    Clock,
    Target
} from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleSelectTopic = (topicName) => {
        navigate('/GetStartedPage', { state: { preselectedTopic: topicName } });
    };

    return (
        <div className="min-h-screen bg-[#fec745] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#f397c8] selection:text-black">
            <Navbar />

            {/* ================= HERO SECTION (Lilac / Pink) ================= */}
            <section className="bg-[#f397c8] relative overflow-hidden pt-8 pb-16 px-4 sm:px-8 border-b-2 border-black">
                {/* Decorative background micro-elements */}
                <div className="absolute top-8 right-1/2 opacity-30 pointer-events-none hidden lg:block">
                    <Star className="w-10 h-10 text-black fill-white" />
                </div>
                <div className="absolute bottom-12 left-10 opacity-40 pointer-events-none hidden md:block">
                    <div className="w-8 h-8 rounded-full border-2 border-black bg-[#fec745]"></div>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    {/* Left Column: Typography & CTAs */}
                    <div className="lg:col-span-7 flex flex-col items-start z-10">
                        {/* Pill Badge */}
                        <div className="inline-flex items-center gap-2 bg-black text-white text-xs font-bold px-4 py-1.5 rounded-full border-2 border-black mb-6 brutal-shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-[#fec745]" />
                            <span>POWERED BY GOOGLE GEMINI 2.0 FLASH</span>
                        </div>

                        {/* Stacked Branding Headline */}
                        <div className="leading-none mb-4">
                            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white drop-shadow-[0_4px_0_rgba(0,0,0,1)] select-none">
                                super<br />
                                <span className="text-[#0a0a0a] drop-shadow-none">prep</span>
                            </h1>
                        </div>

                        {/* Sub-headline */}
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0a0a0a] tracking-tight mb-3">
                            A placement test engine....kinda genius
                        </h2>

                        <p className="text-base sm:text-lg font-medium text-black/85 max-w-xl mb-8 leading-relaxed">
                            Unlimited placement-grade aptitude tests and instant AI answer keys. 
                            Mimicking the toughest rounds of TCS, Infosys, Capgemini, and Cognizant.
                        </p>

                        {/* Primary Buttons */}
                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                onClick={() => navigate('/GetStartedPage')}
                                className="brutal-btn-primary px-8 py-3.5 text-base sm:text-lg font-bold"
                            >
                                Start Free Test
                            </button>

                            <a
                                href="#how-it-works"
                                className="brutal-btn-secondary px-6 py-3.5 text-base font-bold"
                            >
                                How it works
                            </a>
                        </div>

                        {/* Social proof chips */}
                        <div className="mt-10 flex flex-wrap items-center gap-4 text-xs font-bold text-black/80">
                            <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full border border-black/40">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                Zero repeated questions
                            </span>
                            <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full border border-black/40">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                Real test difficulty
                            </span>
                            <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full border border-black/40">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                100% Free mock exams
                            </span>
                        </div>
                    </div>

                    {/* Right Column: 3D Mascot Character */}
                    <div className="lg:col-span-5 flex justify-center z-10">
                        <div className="relative group">
                            {/* Card frame for the mascot */}
                            <div className="bg-[#fffef8] p-3 sm:p-4 rounded-3xl brutal-border-3 brutal-shadow-xl transform transition-transform duration-300 group-hover:scale-[1.02] max-w-sm sm:max-w-md">
                                <div className="rounded-2xl overflow-hidden border-2 border-black bg-pink-100">
                                    <img
                                        src="/hero_robot.jpg"
                                        alt="SuperPrep AI Robot Mascot"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                                <div className="mt-3 flex items-center justify-between px-2">
                                    <span className="text-xs font-black uppercase tracking-wider text-black">
                                        Robo-Tutor v2.0
                                    </span>
                                    <span className="bg-[#10b981] text-black text-[10px] font-black px-2 py-0.5 rounded-full border border-black">
                                        ONLINE & READY
                                    </span>
                                </div>
                            </div>

                            {/* Floating decorative pill */}
                            <div className="absolute -bottom-4 -left-4 bg-[#fec745] text-black text-xs font-black px-4 py-2 rounded-full border-2 border-black brutal-shadow hidden sm:flex items-center gap-1.5">
                                <Zap className="w-4 h-4 text-orange-600 fill-orange-500" />
                                <span>1-Click Custom Tests</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= ORGANIC WAVY DIVIDER ================= */}
            <div className="wavy-top -mt-[1px]">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="w-full h-12 sm:h-16 text-[#f397c8] fill-current"
                >
                    <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,0 L0,0 Z"></path>
                </svg>
            </div>

            {/* ================= FEATURE SECTION (Warm Yellow) ================= */}
            <section id="features" className="py-12 sm:py-20 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left: AI Machine Illustration */}
                    <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
                        <div className="bg-[#fffef8] p-3 sm:p-4 rounded-3xl brutal-border-3 brutal-shadow-xl max-w-md w-full">
                            <div className="rounded-2xl overflow-hidden border-2 border-black bg-amber-50">
                                <img
                                    src="/feature_machine.jpg"
                                    alt="SuperPrep Assessment Machine"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="mt-3 flex items-center justify-between px-2">
                                <span className="text-xs font-black uppercase text-black">
                                    Adaptive Placement Engine
                                </span>
                                <span className="text-xs font-bold text-gray-600">
                                    Real-Time Feedback
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Feature Narrative */}
                    <div className="lg:col-span-6 flex flex-col items-start order-1 lg:order-2">
                        <div className="inline-block bg-white text-black text-xs font-black px-3.5 py-1.5 rounded-full border-2 border-black mb-4 brutal-shadow-sm">
                            PRECISION PREPARATION
                        </div>

                        <h2 className="text-3xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight mb-6 leading-tight">
                            The future of<br />placement tests
                        </h2>

                        <p className="text-base sm:text-lg font-medium text-black/85 mb-6 leading-relaxed">
                            Need tricky Quantitative word problems, multi-step Logical puzzles, advanced Verbal reasoning, 
                            or core Computer Science scenarios? Welcome home. We’re <span className="font-bold">SuperPrep</span>, 
                            your AI test partner tailored for IT placement drives. 
                            We’re all about delivering true exam rigour with zero fluff.
                        </p>

                        <div className="grid grid-cols-2 gap-4 w-full mb-8">
                            <div className="bg-[#fffef8] p-4 rounded-xl brutal-border brutal-shadow-sm">
                                <div className="text-2xl font-black text-[#0a0a0a] mb-1">6+ Domains</div>
                                <div className="text-xs font-bold text-gray-700">Quant, Logic, Verbal, Coding & CS</div>
                            </div>
                            <div className="bg-[#fffef8] p-4 rounded-xl brutal-border brutal-shadow-sm">
                                <div className="text-2xl font-black text-[#0a0a0a] mb-1">Instant</div>
                                <div className="text-xs font-bold text-gray-700">Detailed answers & scoring breakdown</div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/GetStartedPage')}
                            className="brutal-btn-dark px-7 py-3 text-base font-bold"
                        >
                            Explore Topics & Questions →
                        </button>
                    </div>
                </div>
            </section>

            {/* ================= HOW IT WORKS (3-Card Brutalist Grid) ================= */}
            <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-8 border-t-2 border-b-2 border-black bg-[#febd2f]">
                <div className="max-w-7xl mx-auto">
                    {/* Centered Heading */}
                    <div className="text-center mb-16">
                        <div className="inline-block bg-[#f397c8] text-black text-xs font-black px-4 py-1.5 rounded-full border-2 border-black mb-3 brutal-shadow-sm">
                            SIMPLE 3-STEP WORKFLOW
                        </div>
                        <h2 className="text-4xl sm:text-6xl font-black text-[#0a0a0a] tracking-tight">
                            How it works
                        </h2>
                    </div>

                    {/* 3 Neo-Brutalist Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1: Subscribe / Choose */}
                        <div className="brutal-card p-6 sm:p-8 flex flex-col justify-between">
                            <div>
                                {/* Icon Header Plate (Square pastel frame with dividing line) */}
                                <div className="w-full bg-[#f397c8] rounded-xl border-2 border-black p-6 mb-6 flex flex-col items-center justify-center relative overflow-hidden">
                                    <div className="w-14 h-14 bg-white rounded-lg border-2 border-black flex items-center justify-center brutal-shadow-sm z-10">
                                        <Zap className="w-8 h-8 text-amber-500 fill-amber-400" />
                                    </div>
                                    <div className="w-full border-b border-black/40 absolute top-1/2 left-0"></div>
                                </div>

                                <h3 className="text-2xl font-black text-[#0a0a0a] mb-3">
                                    Choose Topic
                                </h3>

                                <p className="text-sm sm:text-base font-medium text-gray-800 leading-relaxed">
                                    Kickstart your prep adventure by selecting Quantitative, Logical, Verbal, 
                                    Programming, or Core CS rounds. Customize question counts to match your study schedule.
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-200 flex items-center text-xs font-bold text-gray-600">
                                <span>Step 01 • Instant Setup</span>
                            </div>
                        </div>

                        {/* Card 2: Generate */}
                        <div className="brutal-card p-6 sm:p-8 flex flex-col justify-between">
                            <div>
                                {/* Icon Header Plate */}
                                <div className="w-full bg-[#f397c8] rounded-xl border-2 border-black p-6 mb-6 flex flex-col items-center justify-center relative overflow-hidden">
                                    <div className="w-14 h-14 bg-white rounded-lg border-2 border-black flex items-center justify-center brutal-shadow-sm z-10">
                                        <Send className="w-7 h-7 text-indigo-600 fill-indigo-100" />
                                    </div>
                                    <div className="w-full border-b border-black/40 absolute top-1/2 left-0"></div>
                                </div>

                                <h3 className="text-2xl font-black text-[#0a0a0a] mb-3">
                                    AI Generates
                                </h3>

                                <p className="text-sm sm:text-base font-medium text-gray-800 leading-relaxed">
                                    Alright, you’re in! In seconds, Gemini 2.0 constructs fresh, non-leaked questions 
                                    specifically designed to mimic the exact high-difficulty questions from top placement tests.
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-200 flex items-center text-xs font-bold text-gray-600">
                                <span>Step 02 • Real-Time AI Generation</span>
                            </div>
                        </div>

                        {/* Card 3: Review */}
                        <div className="brutal-card p-6 sm:p-8 flex flex-col justify-between">
                            <div>
                                {/* Icon Header Plate */}
                                <div className="w-full bg-[#f397c8] rounded-xl border-2 border-black p-6 mb-6 flex flex-col items-center justify-center relative overflow-hidden">
                                    <div className="w-14 h-14 bg-white rounded-lg border-2 border-black flex items-center justify-center brutal-shadow-sm z-10">
                                        <Eye className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <div className="w-full border-b border-black/40 absolute top-1/2 left-0"></div>
                                </div>

                                <h3 className="text-2xl font-black text-[#0a0a0a] mb-3">
                                    Review & Ace
                                </h3>

                                <p className="text-sm sm:text-base font-medium text-gray-800 leading-relaxed">
                                    Hold tight! The moment you submit, get your full performance breakdown: 
                                    correct vs. incorrect options, overall percentage score, and thorough answer keys.
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-200 flex items-center text-xs font-bold text-gray-600">
                                <span>Step 03 • Actionable Feedback</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= DOMAINS & TOPICS SHOWCASE ================= */}
            <section id="domains" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#fec745]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <div className="inline-block bg-white text-black text-xs font-black px-4 py-1.5 rounded-full border-2 border-black mb-3 brutal-shadow-sm">
                            EXAM DOMAINS
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight mb-4">
                            We've got you covered...
                        </h2>
                        <p className="text-base font-medium text-black/80">
                            Practice with curated domain models modeled directly after IT corporate patterns.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Domain 1 */}
                        <div 
                            onClick={() => handleSelectTopic("Quantitative Aptitude")}
                            className="brutal-card-interactive p-6 flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-orange-100 border-2 border-black flex items-center justify-center mb-4 brutal-shadow-sm">
                                    <Calculator className="w-6 h-6 text-orange-600" />
                                </div>
                                <h4 className="text-xl font-black text-[#0a0a0a] mb-2">Quantitative Aptitude</h4>
                                <p className="text-sm text-gray-700 mb-4">
                                    Percentages, Time & Work, Speed & Distance, Probability, Allegations, and Data Interpretation.
                                </p>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                <span className="text-xs font-bold bg-[#f397c8] px-2.5 py-1 rounded-full border border-black">TCS / Infosys</span>
                                <span className="text-sm font-black text-black flex items-center gap-1">Take Mock →</span>
                            </div>
                        </div>

                        {/* Domain 2 */}
                        <div 
                            onClick={() => handleSelectTopic("Logical Reasoning")}
                            className="brutal-card-interactive p-6 flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-indigo-100 border-2 border-black flex items-center justify-center mb-4 brutal-shadow-sm">
                                    <Brain className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h4 className="text-xl font-black text-[#0a0a0a] mb-2">Logical Reasoning</h4>
                                <p className="text-sm text-gray-700 mb-4">
                                    Syllogisms, Blood Relations, Seating Arrangements, Coding-Decoding, and Direction Sense.
                                </p>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                <span className="text-xs font-bold bg-[#f397c8] px-2.5 py-1 rounded-full border border-black">Capgemini</span>
                                <span className="text-sm font-black text-black flex items-center gap-1">Take Mock →</span>
                            </div>
                        </div>

                        {/* Domain 3 */}
                        <div 
                            onClick={() => handleSelectTopic("Verbal Ability")}
                            className="brutal-card-interactive p-6 flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 border-2 border-black flex items-center justify-center mb-4 brutal-shadow-sm">
                                    <BookOpen className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h4 className="text-xl font-black text-[#0a0a0a] mb-2">Verbal Ability</h4>
                                <p className="text-sm text-gray-700 mb-4">
                                    Reading Comprehension, Sentence Correction, Para Jumbles, Synonyms, and Grammar.
                                </p>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                <span className="text-xs font-bold bg-[#f397c8] px-2.5 py-1 rounded-full border border-black">Cognizant</span>
                                <span className="text-sm font-black text-black flex items-center gap-1">Take Mock →</span>
                            </div>
                        </div>

                        {/* Domain 4 */}
                        <div 
                            onClick={() => handleSelectTopic("Programming")}
                            className="brutal-card-interactive p-6 flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-blue-100 border-2 border-black flex items-center justify-center mb-4 brutal-shadow-sm">
                                    <Code2 className="w-6 h-6 text-blue-600" />
                                </div>
                                <h4 className="text-xl font-black text-[#0a0a0a] mb-2">Programming Aptitude</h4>
                                <p className="text-sm text-gray-700 mb-4">
                                    Data Structures, Recursion, Time & Space Complexity, OOP concepts, and Code Output prediction.
                                </p>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                <span className="text-xs font-bold bg-[#f397c8] px-2.5 py-1 rounded-full border border-black">Wipro / Accenture</span>
                                <span className="text-sm font-black text-black flex items-center gap-1">Take Mock →</span>
                            </div>
                        </div>

                        {/* Domain 5 */}
                        <div 
                            onClick={() => handleSelectTopic("Technical")}
                            className="brutal-card-interactive p-6 flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-purple-100 border-2 border-black flex items-center justify-center mb-4 brutal-shadow-sm">
                                    <Terminal className="w-6 h-6 text-purple-600" />
                                </div>
                                <h4 className="text-xl font-black text-[#0a0a0a] mb-2">Technical CS Round</h4>
                                <p className="text-sm text-gray-700 mb-4">
                                    Core Operating Systems, Computer Networks, DBMS & SQL queries, and OOPs fundamentals.
                                </p>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                <span className="text-xs font-bold bg-[#f397c8] px-2.5 py-1 rounded-full border border-black">Core CS Round</span>
                                <span className="text-sm font-black text-black flex items-center gap-1">Take Mock →</span>
                            </div>
                        </div>

                        {/* Domain 6 */}
                        <div 
                            onClick={() => handleSelectTopic("Mixed")}
                            className="brutal-card-interactive p-6 flex flex-col justify-between border-4 border-black"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-pink-100 border-2 border-black flex items-center justify-center mb-4 brutal-shadow-sm">
                                    <Layers className="w-6 h-6 text-pink-600" />
                                </div>
                                <h4 className="text-xl font-black text-[#0a0a0a] mb-2">Full Mixed Simulation</h4>
                                <p className="text-sm text-gray-700 mb-4">
                                    Randomized multi-domain mock test combining Quant, Logic, Verbal, and Tech for real test readiness.
                                </p>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                <span className="text-xs font-bold bg-[#ff851b] text-white px-2.5 py-1 rounded-full border border-black">Grand Mock</span>
                                <span className="text-sm font-black text-black flex items-center gap-1">Launch Now 🚀</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= BOTTOM CALL TO ACTION ================= */}
            <section className="bg-[#0a0a0a] text-white py-16 px-4 sm:px-8 border-t-2 border-black">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-5xl font-black mb-6 tracking-tight">
                        Ready to clear your dream placement?
                    </h2>
                    <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                        No credit card required. Instant AI-generated mock tests right in your browser.
                    </p>
                    <button
                        onClick={() => navigate('/GetStartedPage')}
                        className="brutal-btn-primary px-8 py-4 text-lg font-black"
                    >
                        Launch Your First Mock Exam →
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-gray-400 py-6 px-4 text-center text-xs border-t border-gray-800">
                <p>© {new Date().getFullYear()} SuperPrep / nodeGemini. Built with Google Gemini 2.0 Flash.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
