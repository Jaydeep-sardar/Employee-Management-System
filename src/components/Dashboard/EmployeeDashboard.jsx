import React, { useState, useEffect } from 'react'
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
    
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-300 mb-2">Loading Dashboard...</h2>
          <p className="text-gray-400">Preparing your workspace</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen p-8 animate-fade-in relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full translate-y-48 -translate-x-48"></div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Welcome section with enhanced animations */}
        <div className="mb-8 animate-slide-up">
          <Header changeUser={props.changeUser} data={props.data}/>
        </div>

        {/* Quick stats section */}
        <div className="mb-8 animate-slide-up" style={{animationDelay: '200ms'}}>
          <TaskListNumbers data={props.data} />
        </div>

        {/* Productivity insights */}
        <div className="mb-8 animate-slide-up" style={{animationDelay: '300ms'}}>
          <div className="glass rounded-2xl p-6 hover-lift">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <span className="text-2xl">📊</span>
                <span>Today's Progress</span>
              </h3>
              <div className="text-sm text-gray-400">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-400">
                      {Math.round((props.data.taskCounts.completed / (props.data.taskCounts.completed + props.data.taskCounts.active + props.data.taskCounts.newTask + props.data.taskCounts.failed)) * 100) || 0}%
                    </div>
                    <div className="text-sm text-gray-400">Completion Rate</div>
                  </div>
                  <div className="text-3xl">🎯</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-purple-400">
                      {props.data.taskCounts.active}
                    </div>
                    <div className="text-sm text-gray-400">Active Tasks</div>
                  </div>
                  <div className="text-3xl">⚡</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-xl p-4 border border-orange-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-400">
                      {props.data.tasks?.length || 0}
                    </div>
                    <div className="text-sm text-gray-400">Total Tasks</div>
                  </div>
                  <div className="text-3xl">📋</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks section */}
        <div className="animate-slide-up" style={{animationDelay: '400ms'}}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
              <span className="text-3xl">📝</span>
              <span>Your Tasks</span>
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live Updates</span>
            </div>
          </div>
          <TaskList data={props.data} />
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard