import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

const SignupForm = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const validateForm = (formData) => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.get('fullName')?.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.get('email')?.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.get('email'))) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.get('collegeId')?.trim()) {
            newErrors.collegeId = 'College ID or Student ID is required';
        }

        const password = formData.get('password');
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = 'Must contain at least one uppercase letter';
        } else if (!/[0-9]/.test(password)) {
            newErrors.password = 'Must contain at least one number';
        }

        if (password !== formData.get('confirmPassword')) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.get('terms')) {
            newErrors.terms = 'Please accept the terms to proceed';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        try {
            const backendUrl = window.location.hostname === 'localhost' 
                ? 'http://localhost:3001' 
                : 'https://nodegemini-backend.onrender.com';

            const response = await fetch(`${backendUrl}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: formData.get('fullName'),
                    email: formData.get('email'),
                    collegeId: formData.get('collegeId'),
                    password: formData.get('password'),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || 'Signup failed');
            }

            // Store the token in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setSuccess(true);
            form.reset();

            // Redirect to get started after successful signup
            setTimeout(() => {
                navigate('/GetStartedPage');
            }, 1200);
        } catch (error) {
            setErrors({ form: error.message || 'An error occurred during signup. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fec745] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
            <Navbar />

            <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
                <div className="max-w-lg w-full">
                    {/* Header Pill */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-black px-3.5 py-1.5 rounded-full border-2 border-black mb-2 brutal-shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-[#fec745]" />
                            <span>JOIN SUPERPREP</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight">
                            Create Free Account
                        </h1>
                        <p className="text-sm font-semibold text-black/70 mt-1">
                            Clear your placement aptitude rounds with confidence
                        </p>
                    </div>

                    {/* Brutalist Signup Card */}
                    <div className="brutal-card p-6 sm:p-8 bg-[#fffef8]">
                        {success && (
                            <div className="p-4 rounded-xl border-2 border-black mb-6 bg-green-100 text-green-900 flex items-center gap-3 text-sm font-bold">
                                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-green-600" />
                                <span>Account created successfully! Redirecting to setup...</span>
                            </div>
                        )}

                        {errors.form && (
                            <div className="p-4 rounded-xl border-2 border-black mb-6 bg-red-100 text-red-900 flex items-center gap-3 text-sm font-bold">
                                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
                                <span>{errors.form}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-gray-800 mb-1.5">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Jane Doe"
                                    className={`w-full px-4 py-2.5 rounded-xl border-2 font-medium text-black focus:bg-amber-50/40 focus:outline-none brutal-shadow-sm ${
                                        errors.fullName ? 'border-red-500 bg-red-50' : 'border-black bg-white'
                                    }`}
                                />
                                {errors.fullName && <p className="text-xs font-bold text-red-600 mt-1">{errors.fullName}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-wider text-gray-800 mb-1.5">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="jane@college.edu"
                                        className={`w-full px-4 py-2.5 rounded-xl border-2 font-medium text-black focus:bg-amber-50/40 focus:outline-none brutal-shadow-sm ${
                                            errors.email ? 'border-red-500 bg-red-50' : 'border-black bg-white'
                                        }`}
                                    />
                                    {errors.email && <p className="text-xs font-bold text-red-600 mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-wider text-gray-800 mb-1.5">
                                        College / Roll ID
                                    </label>
                                    <input
                                        type="text"
                                        name="collegeId"
                                        placeholder="CS2026-089"
                                        className={`w-full px-4 py-2.5 rounded-xl border-2 font-medium text-black focus:bg-amber-50/40 focus:outline-none brutal-shadow-sm ${
                                            errors.collegeId ? 'border-red-500 bg-red-50' : 'border-black bg-white'
                                        }`}
                                    />
                                    {errors.collegeId && <p className="text-xs font-bold text-red-600 mt-1">{errors.collegeId}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-wider text-gray-800 mb-1.5">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        className={`w-full px-4 py-2.5 rounded-xl border-2 font-medium text-black focus:bg-amber-50/40 focus:outline-none brutal-shadow-sm ${
                                            errors.password ? 'border-red-500 bg-red-50' : 'border-black bg-white'
                                        }`}
                                    />
                                    {errors.password && <p className="text-xs font-bold text-red-600 mt-1">{errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-wider text-gray-800 mb-1.5">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        className={`w-full px-4 py-2.5 rounded-xl border-2 font-medium text-black focus:bg-amber-50/40 focus:outline-none brutal-shadow-sm ${
                                            errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-black bg-white'
                                        }`}
                                    />
                                    {errors.confirmPassword && <p className="text-xs font-bold text-red-600 mt-1">{errors.confirmPassword}</p>}
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="flex items-start gap-2.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="terms"
                                        className="mt-1 w-4 h-4 rounded border-2 border-black accent-black focus:ring-0"
                                    />
                                    <span className="text-xs font-semibold text-gray-700 leading-snug">
                                        I agree to the Terms of Service and acknowledge tests are generated via Gemini AI.
                                    </span>
                                </label>
                                {errors.terms && <p className="text-xs font-bold text-red-600 mt-1">{errors.terms}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full brutal-btn-primary py-3.5 text-base font-black flex items-center justify-center gap-2 mt-4"
                            >
                                {isSubmitting ? (
                                    <span>Registering Account...</span>
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 pt-5 border-t-2 border-dashed border-gray-200 text-center">
                            <p className="text-xs font-bold text-gray-600">
                                Already have an account?{' '}
                                <Link to="/LoginForm" className="text-black font-black underline hover:text-[#ff851b]">
                                    Log in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;