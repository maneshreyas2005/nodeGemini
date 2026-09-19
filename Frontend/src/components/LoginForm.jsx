import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Lock, Mail, ArrowRight, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        setIsLoading(true);

        try {
            // Check both local or deployed backend if needed
            const backendUrl = window.location.hostname === 'localhost' 
                ? 'http://localhost:3001' 
                : 'https://nodegemini-backend.onrender.com';

            const res = await axios.post(`${backendUrl}/login`, formData);

            if (res.data.token) {
                setIsError(false);
                setMessage(res.data.message || 'Login successful!');

                // Store token & user data
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));

                // Quick redirect
                setTimeout(() => {
                    navigate('/GetStartedPage');
                }, 800);
            } else {
                setIsError(true);
                setMessage(res.data.message || 'Invalid credentials');
            }
        } catch (error) {
            const errMsg = error.response?.data?.message || 'Login failed. Please verify credentials.';
            setIsError(true);
            setMessage(errMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fec745] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
            <Navbar />

            <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
                <div className="max-w-md w-full">
                    {/* Top Pill */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-black px-3.5 py-1.5 rounded-full border-2 border-black mb-2 brutal-shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-[#fec745]" />
                            <span>WELCOME BACK</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight">
                            Log in to SuperPrep
                        </h1>
                        <p className="text-sm font-semibold text-black/70 mt-1">
                            Access your placement simulations and history
                        </p>
                    </div>

                    {/* Neo-brutalist Card */}
                    <div className="brutal-card p-6 sm:p-8 bg-[#fffef8]">
                        {message && (
                            <div className={`p-4 rounded-xl border-2 border-black mb-6 flex items-center gap-3 text-sm font-bold ${
                                isError ? 'bg-red-100 text-red-900' : 'bg-green-100 text-green-900'
                            }`}>
                                {isError ? <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" /> : <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-green-600" />}
                                <span>{message}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-gray-800 mb-2">
                                    College / Personal Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="student@college.edu"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white font-medium text-black focus:bg-amber-50/40 focus:outline-none brutal-shadow-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-gray-800 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white font-medium text-black focus:bg-amber-50/40 focus:outline-none brutal-shadow-sm"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full brutal-btn-primary py-3.5 text-base font-black flex items-center justify-center gap-2 mt-4"
                            >
                                {isLoading ? (
                                    <span>Verifying...</span>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-200 text-center">
                            <p className="text-xs font-bold text-gray-600">
                                Don't have an account yet?{' '}
                                <Link to="/signup" className="text-black font-black underline hover:text-[#ff851b]">
                                    Sign up for free
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
