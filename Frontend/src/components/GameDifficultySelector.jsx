import React, { useState } from 'react';
import { Play, Zap, Target, Crown } from 'lucide-react';

export default function GameDifficultySelector() {
    const [selectedLevel, setSelectedLevel] = useState('easy');
    const [gameStarted, setGameStarted] = useState(false);

    const difficultyLevels = [
        {
            id: 'easy',
            name: 'Easy',
            icon: <Zap className="w-8 h-8" />,
            description: 'Perfect for beginners',
            color: 'from-green-400 to-green-600',
            borderColor: 'border-green-400',
            bgColor: 'bg-green-50',
            textColor: 'text-green-800'
        },
        {
            id: 'moderate',
            name: 'Moderate',
            icon: <Target className="w-8 h-8" />,
            description: 'A balanced challenge',
            color: 'from-yellow-400 to-orange-500',
            borderColor: 'border-orange-400',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-800'
        },
        {
            id: 'difficult',
            name: 'Difficult',
            icon: <Crown className="w-8 h-8" />,
            description: 'For the brave souls',
            color: 'from-red-500 to-purple-600',
            borderColor: 'border-red-500',
            bgColor: 'bg-red-50',
            textColor: 'text-red-800'
        }
    ];

    const handleStart = () => {
        setGameStarted(true);
        // Here you would typically navigate to the game or trigger game logic
        setTimeout(() => {
            setGameStarted(false);
        }, 2000);
    };

    const selectedDifficulty = difficultyLevels.find(level => level.id === selectedLevel);

    if (gameStarted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mx-auto mb-4"></div>
                    <h2 className="text-2xl font-bold text-white mb-2">Starting Game...</h2>
                    <p className="text-gray-300">Loading {selectedDifficulty?.name} level</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Choose Your Challenge
                    </h1>
                    <p className="text-xl text-gray-300">Select your difficulty level and begin your adventure</p>
                </div>

                {/* Difficulty Cards */}
                
                {/* Start Button */}
                <div className="text-center">
                    <button
                        onClick={handleStart}
                        className="group relative inline-flex items-center justify-center px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        <Play className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                        Start Test

                        {/* Button glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                    </button>

                    {/* Selected level info */}
                    <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                        <p className="text-gray-300 text-sm">
                            Ready to give the Test
                        </p>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-pink-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>
        </div>
    );
}
