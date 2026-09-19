import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, User, LogOut, BookOpen, Brain, Zap } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (e) {
            console.error('Failed to parse user from localStorage', e);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <header className="w-full bg-[#0a0a0a] text-white px-4 sm:px-8 py-3.5 border-b-2 border-black sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Brand Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="flex items-baseline font-black tracking-tight text-2xl sm:text-3xl text-white">
                        <span>super</span>
                        <span className="text-[#f397c8] ml-1">prep</span>
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#fec745] ml-1.5 animate-pulse"></span>
                    </div>
                </Link>

                {/* Center Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 font-semibold text-sm text-gray-300">
                    <a href="#how-it-works" className="hover:text-[#fec745] transition-colors">
                        How it works
                    </a>
                    <a href="#domains" className="hover:text-[#fec745] transition-colors">
                        Aptitude Topics
                    </a>
                    <a href="#features" className="hover:text-[#fec745] transition-colors">
                        AI Engine
                    </a>
                    <Link to="/GetStartedPage" className="hover:text-[#f397c8] transition-colors flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-[#fec745]" />
                        <span>Quick Exam</span>
                    </Link>
                </nav>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2 bg-[#1c1c1c] px-3.5 py-1.5 rounded-full border border-gray-700 text-xs font-semibold">
                                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                                <span className="text-gray-200">{user.fullName || 'Student'}</span>
                            </div>
                            <button
                                onClick={() => navigate('/GetStartedPage')}
                                className="brutal-btn-primary text-xs sm:text-sm px-4 py-1.5"
                            >
                                Take Exam
                            </button>
                            <button
                                onClick={handleLogout}
                                title="Sign out"
                                className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/LoginForm"
                                className="text-xs sm:text-sm font-bold text-gray-200 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/GetStartedPage"
                                className="brutal-btn-primary text-xs sm:text-sm px-4 sm:px-5 py-2"
                            >
                                Start Free Test
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
