import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const CreateTask = () => {
    const [userData, setUserData] = useContext(AuthContext)

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')
    const [priority, setPriority] = useState('medium')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const categories = ['Design', 'Development', 'Testing', 'Meeting', 'Documentation', 'Research']
    const priorities = [
        { value: 'low', label: 'Low Priority', color: 'from-green-500 to-emerald-500', icon: '🟢' },
        { value: 'medium', label: 'Medium Priority', color: 'from-yellow-500 to-orange-500', icon: '🟡' },
        { value: 'high', label: 'High Priority', color: 'from-red-500 to-pink-500', icon: '🔴' }
    ]

    const employees = userData ? userData.map(emp => emp.firstName) : []

    const submitHandler = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        const newTask = { 
            taskTitle, 
            taskDescription, 
            taskDate, 
            category, 
            priority,
            active: false, 
            newTask: true, 
            failed: false, 
            completed: false 
        }

        const data = userData
        data.forEach(function (elem) {
            if (asignTo === elem.firstName) {
                elem.tasks.push(newTask)
                elem.taskCounts.newTask = elem.taskCounts.newTask + 1
            }
        })
        setUserData(data)

        // Reset form
        setTaskTitle('')
        setCategory('')
        setAsignTo('')
        setTaskDate('')
        setTaskDescription('')
        setPriority('medium')
        setIsSubmitting(false)
        setShowSuccess(true)

        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000)
    }

    return (
        <div className='glass rounded-2xl p-8 hover-lift animate-slide-up'>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className='text-3xl font-bold text-white flex items-center space-x-3'>
                        <span className="text-4xl">✨</span>
                        <span>Create New Task</span>
                    </h2>
                    <p className="text-gray-400 mt-2">Assign tasks to team members efficiently</p>
                </div>
                {showSuccess && (
                    <div className="bg-green-500/20 text-green-400 px-6 py-3 rounded-xl border border-green-500/30 animate-slide-right">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl">🎉</span>
                            <span className="font-medium">Task created successfully!</span>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={submitHandler} className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Left Column - Task Details */}
                <div className='lg:col-span-2 space-y-6'>
                    {/* Task Title */}
                    <div className="group">
                        <label className='block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2'>
                            <span className="text-lg">📝</span>
                            <span>Task Title</span>
                        </label>
                        <input
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className='w-full py-4 px-6 rounded-xl outline-none bg-white/10 border-2 border-gray-600 focus:border-emerald-400 text-white placeholder:text-gray-400 transition-all duration-300 focus:bg-white/20 group-hover:border-gray-500'
                            type="text" 
                            placeholder='Enter a clear and descriptive task title'
                            required
                        />
                    </div>

                    {/* Date and Assignment Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                            <label className='block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2'>
                                <span className="text-lg">📅</span>
                                <span>Due Date</span>
                            </label>
                            <input
                                value={taskDate}
                                onChange={(e) => setTaskDate(e.target.value)}
                                className='w-full py-4 px-6 rounded-xl outline-none bg-white/10 border-2 border-gray-600 focus:border-emerald-400 text-white transition-all duration-300 focus:bg-white/20 group-hover:border-gray-500'
                                type="date"
                                required
                            />
                        </div>

                        <div className="group">
                            <label className='block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2'>
                                <span className="text-lg">👤</span>
                                <span>Assign To</span>
                            </label>
                            <select
                                value={asignTo}
                                onChange={(e) => setAsignTo(e.target.value)}
                                className='w-full py-4 px-6 rounded-xl outline-none bg-white/10 border-2 border-gray-600 focus:border-emerald-400 text-white transition-all duration-300 focus:bg-white/20 group-hover:border-gray-500'
                                required
                            >
                                <option value="" className="bg-gray-800">Select an employee</option>
                                {employees.map(emp => (
                                    <option key={emp} value={emp} className="bg-gray-800">{emp}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Category and Priority Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                            <label className='block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2'>
                                <span className="text-lg">🏷️</span>
                                <span>Category</span>
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='w-full py-4 px-6 rounded-xl outline-none bg-white/10 border-2 border-gray-600 focus:border-emerald-400 text-white transition-all duration-300 focus:bg-white/20 group-hover:border-gray-500'
                                required
                            >
                                <option value="" className="bg-gray-800">Select category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="group">
                            <label className='block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2'>
                                <span className="text-lg">⚡</span>
                                <span>Priority</span>
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {priorities.map(p => (
                                    <button
                                        key={p.value}
                                        type="button"
                                        onClick={() => setPriority(p.value)}
                                        className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                                            priority === p.value
                                                ? `bg-gradient-to-r ${p.color} text-white shadow-lg`
                                                : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                                        }`}
                                    >
                                        <span>{p.icon}</span>
                                        <span className="text-xs">{p.value.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Description and Submit */}
                <div className='space-y-6'>
                    <div className="group">
                        <label className='block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2'>
                            <span className="text-lg">📄</span>
                            <span>Description</span>
                        </label>
                        <textarea 
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            className='w-full h-48 text-white py-4 px-6 rounded-xl outline-none bg-white/10 border-2 border-gray-600 focus:border-emerald-400 placeholder:text-gray-400 transition-all duration-300 focus:bg-white/20 group-hover:border-gray-500 resize-none'
                            placeholder='Provide detailed description of the task, requirements, and expected deliverables...'
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className='w-full relative py-4 px-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-400 hover:via-emerald-500 hover:to-emerald-600 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed btn-glow'
                    >
                        <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                            🚀 Create Task
                        </span>
                        {isSubmitting && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            </div>
                        )}
                    </button>

                    {/* Task Preview */}
                    {(taskTitle || taskDescription) && (
                        <div className="glass rounded-xl p-4 border border-emerald-500/30">
                            <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center space-x-2">
                                <span>👁️</span>
                                <span>Preview</span>
                            </h4>
                            <div className="space-y-2 text-sm">
                                {taskTitle && <div className="text-white font-medium">{taskTitle}</div>}
                                {category && <div className="text-gray-400">Category: {category}</div>}
                                {priority && <div className="text-gray-400">Priority: {priority.toUpperCase()}</div>}
                                {asignTo && <div className="text-gray-400">Assigned to: {asignTo}</div>}
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default CreateTask