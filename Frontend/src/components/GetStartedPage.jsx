// import React from 'react';
// import { Link, useNavigate } from "react-router-dom";

// const GetStartedPage = () => {
//     const navigate = useNavigate();

//     return (
//         <div className="min-h-screen flex items-center justify-center p-4">
//             <div className="text-center  w-full">
//                 <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
//                     <h1 className="text-2xl font-semibold text-gray-900 mb-4">
//                         Welcome to our platform
//                     </h1>
//                     <p className="text-gray-600 mb-6">
//                         Click the button below to access our platform and begin exploring
//                         all the features we have to offer.
//                     </p>

//                     <button
//                         onClick={() => navigate('/AptitudeExam')}
//                         className="w-40 bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
//                     >
//                         Get Started
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GetStartedPage;

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const GetStartedPage = () => {
    const navigate = useNavigate();
    const [questionCount, setQuestionCount] = useState(0);
    const [questionTopic, setQuestionTopic] = useState("");


    const handleStart = async () => {
        console.log(questionCount)
        try {
            // const response = await axios.post('http://localhost:3001/mcqs/generate', {
            //     count: questionCount
            // });
            // console.log("Received questions:", response.data);

            // Optionally store the data using Context, localStorage, or global state
            // localStorage.setItem('quizData', JSON.stringify(response.data));

            // Navigate to the exam page after data is received
            navigate('/AptitudeExam', { state : {
                count: questionCount,
                topic: questionTopic
            } });
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center w-full">
                <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                        Welcome to our platform
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Select number of questions and click the button below to begin.
                    </p>

                    <div className="mb-6">
                        <label htmlFor="questionTopic" className="block text-gray-700 mb-2">
                            Select Topic:
                        </label>
                        <select
                            id="questionTopic"
                            value={questionTopic}
                            onChange={(e) => setQuestionTopic(e.target.value)}
                            className="w-60 p-2 border border-gray-300 rounded-md"
                        >
                            <option value="Quantitative Aptitude">Quantitative Aptitude</option>
                            <option value="Logical Reasoning">Logical Reasoning Aptitude</option>
                            <option value="Verbal Ability">Verbal Ability Aptitude</option>
                            <option value="Programming">Programming Aptitude</option>
                            <option value="Programming">Mixed Aptitude </option>
                            {/* Add more topics as needed */}
                        </select>
                    </div>


                    {/* Dropdown */}
                    <div className="mb-6">
                        <label htmlFor="questionCount" className="block text-gray-700 mb-2">
                            Number of Questions:
                        </label>
                        <select
                            id="questionCount"
                            value={questionCount}
                            onChange={(e) => setQuestionCount(Number(e.target.value))}
                            className="w-40 p-2 border border-gray-300 rounded-md"
                        >
                            {[10, 20, 30, 40, 50].map((count) => (
                                <option key={count} value={count}>
                                    {count}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* Button */}
                    <button
                        onClick={handleStart}
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
