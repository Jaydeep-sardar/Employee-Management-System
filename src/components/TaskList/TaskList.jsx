import React, { useState } from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data }) => {
    const [filter, setFilter] = useState('all')

    const filterButtons = [
        { key: 'all', label: 'All Tasks', icon: '📋' },
        { key: 'new', label: 'New', icon: '🆕' },
        { key: 'active', label: 'Active', icon: '⚡' },
        { key: 'completed', label: 'Completed', icon: '✅' },
        { key: 'failed', label: 'Failed', icon: '❌' }
    ]

    const filteredTasks = data.tasks.filter(task => {
        if (filter === 'all') return true
        if (filter === 'new') return task.newTask
        if (filter === 'active') return task.active
        if (filter === 'completed') return task.completed
        if (filter === 'failed') return task.failed
        return true
    })

    return (
        <div className='mt-8'>
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
                {filterButtons.map(button => (
                    <button
                        key={button.key}
                        onClick={() => setFilter(button.key)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 group ${
                            filter === button.key 
                                ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg shadow-emerald-500/30' 
                                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                        }`}
                    >
                        <span className={`transition-transform duration-300 ${filter === button.key ? 'scale-110' : 'group-hover:scale-110'}`}>
                            {button.icon}
                        </span>
                        <span>{button.label}</span>
                    </button>
                ))}
            </div>

            {/* Task Count Badge */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                        {filteredTasks.length} {filteredTasks.length === 1 ? 'Task' : 'Tasks'}
                    </div>
                </div>
            </div>

            {/* Tasks Container */}
            <div 
                id='tasklist' 
                className='h-[55vh] overflow-x-auto overflow-y-hidden flex items-start justify-start gap-6 flex-nowrap w-full py-4 scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-transparent'
            >
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((elem, idx) => {
                        const taskComponent = (() => {
                            if (elem.active) return <AcceptTask key={`${idx}-active`} data={elem} />
                            if (elem.newTask) return <NewTask key={`${idx}-new`} data={elem} />
                            if (elem.completed) return <CompleteTask key={`${idx}-completed`} data={elem} />
                            if (elem.failed) return <FailedTask key={`${idx}-failed`} data={elem} />
                            return null
                        })()

                        return (
                            <div 
                                key={`task-${idx}`}
                                className="animate-slide-right"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {taskComponent}
                            </div>
                        )
                    })
                ) : (
                    <div className="flex-1 flex items-center justify-center h-full">
                        <div className="text-center glass rounded-2xl p-12">
                            <div className="text-6xl mb-4 opacity-50">📭</div>
                            <h3 className="text-xl font-semibold text-gray-300 mb-2">No tasks found</h3>
                            <p className="text-gray-400">
                                {filter === 'all' 
                                    ? 'You have no tasks assigned yet.' 
                                    : `No ${filter} tasks available.`
                                }
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TaskList