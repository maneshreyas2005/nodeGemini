import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate(); // 👈 add this line
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setSuccess(null);

        try {
            const res = await axios.post('http://localhost:3001/login', formData);

            if (res.data.token) {
                setSuccess(true);
                setMessage(res.data.message || 'Login successful');

                // Store token & user data
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                alert("Login Successfull !!");
                // Navigate to GetStartedPage
                navigate('/GetStartedPage'); // 👈 redirect
            } else {
                setSuccess(false);
                setMessage('Invalid login response');
            }
        } catch (error) {
            const errMsg = error.response?.data?.message || 'Login failed';
            setSuccess(false);
            setMessage(errMsg);
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />

                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>

            {message && (
                <p className={`mt-4 text-center text-sm ${success ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default LoginForm;
