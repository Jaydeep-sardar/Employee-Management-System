import React, { useState, useEffect } from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'

const AdminDashboard = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')
    const [stats, setStats] = useState({
        totalEmployees: 5,
        totalTasks: 15,
        completedTasks: 8,
        pendingTasks: 7
    })

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1200)
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-2xl">👑</div>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-300 mb-2">Loading Admin Panel...</h2>
                    <p className="text-gray-400">Preparing management dashboard</p>
                </div>
            </div>
        )
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'create', label: 'Create Task', icon: '➕' },
        { id: 'manage', label: 'Manage Tasks', icon: '📋' }
    ]

    return (
        <div className='min-h-screen p-8 animate-fade-in relative overflow-hidden'>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-full translate-y-48 -translate-x-48"></div>
            
            {/* Main content */}
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-slide-up">
                    <Header changeUser={props.changeUser} />
                </div>

                {/* Admin Navigation */}
                <div className="mb-8 animate-slide-up" style={{animationDelay: '200ms'}}>
                    <div className="flex space-x-1 bg-white/5 rounded-2xl p-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                    activeTab === tab.id
                                        ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg shadow-emerald-500/30'
                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                <span className="text-xl">{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="animate-slide-up" style={{animationDelay: '300ms'}}>
                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="glass rounded-2xl p-6 hover-lift border border-emerald-500/20">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-3xl">👥</div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-emerald-400">{stats.totalEmployees}</div>
                                        <div className="text-sm text-gray-400">Total Employees</div>
                                    </div>
                                </div>
                                <div className="w-full bg-emerald-900/30 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full w-full"></div>
                                </div>
                            </div>

                            <div className="glass rounded-2xl p-6 hover-lift border border-blue-500/20">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-3xl">📋</div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-blue-400">{stats.totalTasks}</div>
                                        <div className="text-sm text-gray-400">Total Tasks</div>
                                    </div>
                                </div>
                                <div className="w-full bg-blue-900/30 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full w-full"></div>
                                </div>
                            </div>

                            <div className="glass rounded-2xl p-6 hover-lift border border-green-500/20">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-3xl">✅</div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-green-400">{stats.completedTasks}</div>
                                        <div className="text-sm text-gray-400">Completed</div>
                                    </div>
                                </div>
                                <div className="w-full bg-green-900/30 rounded-full h-2">
                                    <div 
                                        className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-1000"
                                        style={{width: `${(stats.completedTasks / stats.totalTasks) * 100}%`}}
                                    ></div>
                                </div>
                            </div>

                            <div className="glass rounded-2xl p-6 hover-lift border border-orange-500/20">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-3xl">⏳</div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-orange-400">{stats.pendingTasks}</div>
                                        <div className="text-sm text-gray-400">Pending</div>
                                    </div>
                                </div>
                                <div className="w-full bg-orange-900/30 rounded-full h-2">
                                    <div 
                                        className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all duration-1000"
                                        style={{width: `${(stats.pendingTasks / stats.totalTasks) * 100}%`}}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="glass rounded-2xl p-6 mb-8 hover-lift">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                                <span className="text-2xl">📈</span>
                                <span>Recent Activity</span>
                            </h3>
                            <div className="space-y-4">
                                {['New task assigned to Arjun', 'Sneha completed Database optimization', 'Ravi submitted presentation draft'].map((activity, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                        <span className="text-gray-300">{activity}</span>
                                        <span className="text-xs text-gray-500 ml-auto">Just now</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Create Task Tab */}
                {activeTab === 'create' && (
                    <div className="animate-slide-up" style={{animationDelay: '300ms'}}>
                        <CreateTask />
                    </div>
                )}

                {/* Manage Tasks Tab */}
                {activeTab === 'manage' && (
                    <div className="animate-slide-up" style={{animationDelay: '300ms'}}>
                        <AllTask />
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminDashboard