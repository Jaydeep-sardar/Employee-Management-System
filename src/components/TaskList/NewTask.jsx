import React, { useState } from 'react'

const NewTask = ({data}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isAccepting, setIsAccepting] = useState(false)

    const handleAccept = () => {
        setIsAccepting(true)
        // Simulate API call delay
        setTimeout(() => {
            setIsAccepting(false)
            // Add your accept logic here
        }, 1000)
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
        <div 
            className='flex-shrink-0 h-full w-[320px] glass rounded-2xl border-2 border-emerald-400/30 hover:border-emerald-400/60 transition-all duration-500 hover-lift group relative overflow-hidden cursor-pointer'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>

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
                <h2 className='text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors duration-300'>
                    {data.taskTitle}
                </h2>

                {/* Description */}
                <div className='flex-1 mb-6'>
                    <p className='text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300'>
                        {data.taskDescription}
                    </p>
                </div>

                {/* Status Badge */}
                <div className="mb-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium border border-emerald-500/30">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                        New Task
                    </div>
                </div>

                {/* Action Button */}
                <button 
                    onClick={handleAccept}
                    disabled={isAccepting}
                    className={`
                        relative w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed btn-glow
                        ${isHovered 
                            ? 'bg-gradient-to-r from-emerald-500 to-blue-500 shadow-lg shadow-emerald-500/30' 
                            : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-blue-500'
                        }
                    `}
                >
                    <span className={`transition-opacity duration-300 ${isAccepting ? 'opacity-0' : 'opacity-100'}`}>
                        🚀 Accept Task
                    </span>
                    {isAccepting && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        </div>
                    )}
                </button>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-400/20 to-transparent rounded-tr-2xl"></div>
            </div>
        </div>
    )
}

export default NewTask