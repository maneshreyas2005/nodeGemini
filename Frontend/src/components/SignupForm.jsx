import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            newErrors.collegeId = 'College ID is required';
        }

        const password = formData.get('password');
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = 'Password must contain at least one uppercase letter';
        } else if (!/[0-9]/.test(password)) {
            newErrors.password = 'Password must contain at least one number';
        }

        if (password !== formData.get('confirmPassword')) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.get('terms')) {
            newErrors.terms = 'You must accept the terms and conditions';
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
            const response = await fetch('http://localhost:3001/signup', {
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
                throw new Error(data.error || 'Signup failed');
            }

            // Store the token in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setSuccess(true);
            form.reset();

            // Redirect to dashboard after successful signup
            setTimeout(() => {
                navigate('/GetStartedPage');
            }, 2000);
        } catch (error) {
            setErrors({ form: error.message || 'An error occurred during signup. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
            <div className="bg-white shadow-md rounded-xl border border-gray-200 w-full max-w-md p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Create Account</h1>
                    <p className="text-sm text-gray-500">Join our platform to get started</p>
                </div>

                {success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                        Account created successfully! Redirecting to dashboard...
                    </div>
                )}

                {errors.form && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                        {errors.form}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            required
                            className={`w-full px-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                        />
                        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="collegeId" className="block text-sm font-medium text-gray-700 mb-1">College ID</label>
                        <input
                            type="text"
                            id="collegeId"
                            name="collegeId"
                            required
                            className={`w-full px-4 py-3 border ${errors.collegeId ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                        />
                        {errors.collegeId && <p className="mt-1 text-sm text-red-600">{errors.collegeId}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters with 1 uppercase letter and 1 number</p>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            className={`w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                        />
                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>

                    <div className="flex items-start space-x-2">
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            required
                            className={`mt-1 ${errors.terms ? 'border-red-500' : ''}`}
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                            I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                        </label>
                    </div>
                    {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 rounded-md text-white font-medium transition ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Account...
                            </span>
                        ) : 'Create Account'}
                    </button>
                </form>

                <div className="relative my-6 text-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative bg-white px-4 text-sm text-gray-500">or</div>
                </div>

                <div className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/LoginForm" className="text-blue-600 hover:underline font-medium">Sign in</a>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;