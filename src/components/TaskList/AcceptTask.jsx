import React, { useState, useEffect } from 'react'

const AcceptTask = ({data}) => {
    const [progress, setProgress] = useState(0)
    const [isCompleting, setIsCompleting] = useState(false)
    const [isFailing, setIsFailing] = useState(false)

    useEffect(() => {
        // Simulate progress
        const interval = setInterval(() => {
            setProgress(prev => (prev >= 100 ? 0 : prev + 1))
        }, 200)
        return () => clearInterval(interval)
    }, [])

    const handleComplete = () => {
        setIsCompleting(true)
        setTimeout(() => {
            setIsCompleting(false)
            // Add your completion logic here
        }, 1500)
    }

    const handleFail = () => {
        setIsFailing(true)
        setTimeout(() => {
            setIsFailing(false)
            // Add your fail logic here
        }, 1500)
    }

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
        <div className='flex-shrink-0 h-full w-[320px] glass rounded-2xl border-2 border-yellow-400/40 hover:border-yellow-400/70 transition-all duration-500 hover-lift group relative overflow-hidden'>
            {/* Animated background with pulse effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Working indicator - animated border */}
            <div className="absolute inset-0 rounded-2xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 opacity-30 animate-spin" style={{animation: 'spin 3s linear infinite'}}></div>
                <div className="absolute inset-[2px] rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80"></div>
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

                {/* Title */}
                <h2 className='text-2xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300'>
                    {data.taskTitle}
                </h2>

                {/* Description */}
                <div className='flex-1 mb-6'>
                    <p className='text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300'>
                        {data.taskDescription}
                    </p>
                </div>

                {/* Status Badge with Progress */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium border border-yellow-500/30">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                            In Progress
                        </div>
                        <span className="text-xs text-gray-400">{progress}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                            className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-300 relative overflow-hidden"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-3'>
                    <button 
                        onClick={handleComplete}
                        disabled={isCompleting}
                        className='flex-1 relative py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed btn-glow'
                    >
                        <span className={`transition-opacity duration-300 ${isCompleting ? 'opacity-0' : 'opacity-100'}`}>
                            ✅ Complete
                        </span>
                        {isCompleting && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            </div>
                        )}
                    </button>

                    <button 
                        onClick={handleFail}
                        disabled={isFailing}
                        className='flex-1 relative py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed btn-glow'
                    >
                        <span className={`transition-opacity duration-300 ${isFailing ? 'opacity-0' : 'opacity-100'}`}>
                            ❌ Fail
                        </span>
                        {isFailing && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            </div>
                        )}
                    </button>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-tr-2xl"></div>
            </div>
        </div>
    )
}

export default AcceptTask