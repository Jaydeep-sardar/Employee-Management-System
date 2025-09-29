import React, { useState, useEffect } from 'react'

const TaskListNumbers = ({data}) => {
  const [animatedCounts, setAnimatedCounts] = useState({
    newTask: 0,
    completed: 0,
    active: 0,
    failed: 0
  })

  useEffect(() => {
    const animateCount = (target, key) => {
      let current = 0
      const increment = target / 20
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setAnimatedCounts(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }))
      }, 50)
    }

    animateCount(data.taskCounts.newTask, 'newTask')
    animateCount(data.taskCounts.completed, 'completed')
    animateCount(data.taskCounts.active, 'active')
    animateCount(data.taskCounts.failed, 'failed')
  }, [data.taskCounts])

  const cards = [
    {
      title: 'New Tasks',
      count: animatedCounts.newTask,
      icon: '📋',
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-500/20 to-blue-600/30',
      shadowColor: 'shadow-blue-500/30',
      textColor: 'text-blue-100'
    },
    {
      title: 'Completed',
      count: animatedCounts.completed,
      icon: '✅',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-500/20 to-emerald-600/30',
      shadowColor: 'shadow-green-500/30',
      textColor: 'text-green-100'
    },
    {
      title: 'In Progress',
      count: animatedCounts.active,
      icon: '⚡',
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-500/20 to-orange-500/30',
      shadowColor: 'shadow-yellow-500/30',
      textColor: 'text-yellow-100'
    },
    {
      title: 'Failed',
      count: animatedCounts.failed,
      icon: '❌',
      gradient: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-500/20 to-pink-600/30',
      shadowColor: 'shadow-red-500/30',
      textColor: 'text-red-100'
    }
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8'>
      {cards.map((card, index) => (
        <div 
          key={card.title}
          className={`relative group hover-lift glass rounded-2xl p-6 bg-gradient-to-br ${card.bgGradient} border border-white/20 hover:border-white/40 transition-all duration-500 animate-slide-up cursor-pointer overflow-hidden`}
          style={{animationDelay: `${index * 100}ms`}}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Icon and Count */}
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <div className={`text-4xl font-black ${card.textColor} group-hover:scale-110 transition-all duration-300`}>
                {card.count}
              </div>
            </div>

            {/* Title */}
            <h3 className={`text-lg font-bold ${card.textColor} group-hover:text-white transition-colors duration-300`}>
              {card.title}
            </h3>

            {/* Progress Bar */}
            <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${card.gradient} transition-all duration-1000 ease-out`}
                style={{
                  width: card.count > 0 ? '100%' : '0%',
                  transitionDelay: `${index * 200}ms`
                }}
              ></div>
            </div>
          </div>

          {/* Hover Effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl`}></div>
          
          {/* Glow Effect */}
          <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 ${card.shadowColor} blur-xl -z-10`}></div>
        </div>
      ))}
    </div>
  )
}

export default TaskListNumbers