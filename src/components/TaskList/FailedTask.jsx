import React, { useState } from 'react'

const FailedTask = ({data}) => {
    const [showRetryOptions, setShowRetryOptions] = useState(false)

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

    const handleRetry = () => {
        // Add retry logic here
        console.log('Retrying task:', data.taskTitle)
    }

    const handleReassign = () => {
        // Add reassignment logic here
        console.log('Reassigning task:', data.taskTitle)
    }

    return (
        <div className='flex-shrink-0 h-full w-[320px] glass rounded-2xl border-2 border-red-400/50 hover:border-red-400/80 transition-all duration-500 hover-lift group relative overflow-hidden'>
            {/* Error background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-pink-500/20 to-purple-500/20 opacity-100 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shake animation on hover */}
            <div className="absolute inset-0 group-hover:animate-pulse">
                <div className="absolute inset-0 bg-red-500/10 rounded-2xl"></div>
            </div>

            {/* Error badge */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
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

                {/* Title with error styling */}
                <h2 className='text-2xl font-bold text-white mb-4 group-hover:text-red-300 transition-colors duration-300 relative'>
                    <span className="relative opacity-75">
                        {data.taskTitle}
                    </span>
                </h2>

                {/* Description */}
                <div className='flex-1 mb-6'>
                    <p className='text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 opacity-75'>
                        {data.taskDescription}
                    </p>
                </div>

                {/* Failure Status */}
                <div className="mb-6">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/30 text-red-300 text-sm font-medium border border-red-500/50">
                        <div className="w-3 h-3 bg-red-400 rounded-full mr-3 animate-ping"></div>
                        <div className="w-3 h-3 bg-red-400 rounded-full mr-3 absolute"></div>
                        Task Failed
                    </div>
                </div>

                {/* Failure Reason */}
                <div className="mb-6 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                    <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div>
                            <div className="text-sm font-medium text-red-400 mb-1">Failure Reason</div>
                            <div className="text-xs text-gray-400">Technical difficulties or resource constraints</div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button 
                        onClick={() => setShowRetryOptions(!showRetryOptions)}
                        className='w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 btn-glow'
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Retry Options</span>
                        </div>
                    </button>

                    {/* Retry Options */}
                    <div className={`space-y-2 transition-all duration-300 ${showRetryOptions ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                        <button 
                            onClick={handleRetry}
                            className='w-full py-2 px-4 bg-blue-600/50 hover:bg-blue-600 rounded-lg text-white text-sm transition-all duration-300'
                        >
                            🔄 Retry Task
                        </button>
                        <button 
                            onClick={handleReassign}
                            className='w-full py-2 px-4 bg-purple-600/50 hover:bg-purple-600 rounded-lg text-white text-sm transition-all duration-300'
                        >
                            👥 Reassign Task
                        </button>
                    </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-red-400/20 to-transparent rounded-tl-2xl"></div>
            </div>
        </div>
    )
}

export default FailedTask