import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const GetStartedPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center  w-full">
                <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                        Welcome to our platform
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Click the button below to access our platform and begin exploring
                        all the features we have to offer.
                    </p>
                    <button
                        onClick={() => navigate('/AptitudeExam')}
                        className="w-40 bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GetStartedPage;