import React, { useState, useEffect } from 'react'
import { setLocalStorage } from '../../utils/localStorage'

const Header = (props) => {
  const [showLogout, setShowLogout] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getUsername = () => {
    if (!props.data) {
      return 'Admin'
    } else {
      return props.data.firstName
    }
  }

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon' 
    return 'Good Evening'
  }

  const logOutUser = () => {
    localStorage.setItem('loggedInUser', '')
    props.changeUser('')
  }

  return (
    <div className='flex items-center justify-between p-6 glass rounded-2xl mb-6 animate-slide-up hover-lift'>
      <div className="flex items-center space-x-4">
        {/* Animated Avatar */}
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
            {getUsername().charAt(0)}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-gray-800 animate-pulse"></div>
        </div>

        {/* Welcome Message */}
        <div className="animate-slide-left">
          <p className='text-lg font-medium text-gray-300'>
            {getGreeting()} 👋
          </p>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent'>
            {getUsername()}
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Current Time */}
        <div className="text-center animate-fade-in">
          <div className="text-sm text-gray-400">Current Time</div>
          <div className="text-lg font-mono text-emerald-400">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>

        {/* Notifications */}
        <div className="relative group">
          <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110">
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 17H8a2 2 0 01-2-2V7a2 2 0 012-2h7m0 12V7m0 0a2 2 0 012 2v6.5" />
            </svg>
          </button>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button 
            onClick={() => setShowLogout(!showLogout)}
            className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/10 transition-all duration-300 group"
          >
            <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <div className={`absolute right-0 top-full mt-2 w-48 glass rounded-xl shadow-2xl border border-white/20 transform transition-all duration-300 ${showLogout ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}>
            <div className="p-2">
              <button 
                onClick={logOutUser}
                className='w-full text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300 flex items-center space-x-3 group'
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header