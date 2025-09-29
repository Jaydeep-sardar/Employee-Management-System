import React, { useState, useEffect } from 'react'

const CompleteTask = ({data}) => {
    const [showConfetti, setShowConfetti] = useState(false)

    useEffect(() => {
        // Trigger confetti animation when component mounts
        setShowConfetti(true)
        const timer = setTimeout(() => setShowConfetti(false), 2000)
        return () => clearTimeout(timer)
    }, [])

    const getCategoryColor = (category) => {
        const colors = {
            'Design': 'from-purple-500 to-pink-500',
            'Development': 'from-blue-500 to-cyan-500',
            'Meeting': 'from-orange-500 to-red-500',
            'Testing': 'from-yellow-500 to-orange-500',
            'Documentation': 'from-green-500 to-teal-500',
            'default': 'from-gray-500 to-gray-600'
        }
        return colors[category] || colors.default
    }

    return (
        <div className='flex-shrink-0 h-full w-[320px] glass rounded-2xl border-2 border-green-400/50 hover:border-green-400/80 transition-all duration-500 hover-lift group relative overflow-hidden'>
            {/* Success background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 opacity-100 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Confetti particles */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 animate-bounce"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 100}ms`,
                                animationDuration: '1s'
                            }}
                        ></div>
                    ))}
                </div>
            )}

            {/* Success badge */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </div>

            {/* Content */}
            <div className='relative p-6 h-full flex flex-col'>
                {/* Header */}
                <div className='flex justify-between items-center mb-6'>
                    <div className={`bg-gradient-to-r ${getCategoryColor(data.category)} px-4 py-2 rounded-xl text-white text-sm font-bold shadow-lg transform group-hover:scale-105 transition-transform duration-300`}>
                        {data.category}
                    </div>
                    <div className='flex items-center space-x-2 text-gray-300 group-hover:text-white transition-colors duration-300'>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className='text-sm font-medium'>{data.taskDate}</span>
                    </div>
                </div>

                {/* Title with strikethrough effect */}
                <h2 className='text-2xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors duration-300 relative'>
                    <span className="relative">
                        {data.taskTitle}
                        <div className="absolute inset-0 border-b-2 border-green-400 transform scale-x-100 transition-transform duration-500"></div>
                    </span>
                </h2>

                {/* Description */}
                <div className='flex-1 mb-6'>
                    <p className='text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300'>
                        {data.taskDescription}
                    </p>
                </div>

                {/* Completion Status */}
                <div className="mb-6">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/30 text-green-300 text-sm font-medium border border-green-500/50">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-ping"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-3 absolute"></div>
                        Task Completed Successfully
                    </div>
                </div>

                {/* Completion Time */}
                <div className="mb-6 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Completed on:</span>
                        <span className="text-green-400 font-medium">{data.taskDate}</span>
                    </div>
                </div>

                {/* Achievement Badge */}
                <div className='w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold text-white text-center relative overflow-hidden group/btn'>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center space-x-2">
                        <span className="text-lg">🎉</span>
                        <span>Task Completed</span>
                        <span className="text-lg">✨</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-transparent rounded-tl-2xl"></div>
            </div>
        </div>
    )
}

export default CompleteTask