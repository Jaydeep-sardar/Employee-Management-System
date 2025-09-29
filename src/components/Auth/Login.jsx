import React, { useState, useEffect } from 'react'

const Login = ({handleLogin}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        setTimeout(() => setShowForm(true), 200)
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        // Add a small delay for better UX
        setTimeout(() => {
            handleLogin(email, password)
            setEmail("")
            setPassword("")
            setIsLoading(false)
        }, 800)
    }

    return (
        <div className='flex h-screen w-screen items-center justify-center relative overflow-hidden'>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-40 left-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
            </div>

            <div className={`glass border-2 rounded-3xl border-emerald-500/30 p-12 hover-lift backdrop-blur-xl bg-gradient-to-br from-emerald-900/20 to-blue-900/20 shadow-2xl transform transition-all duration-700 ${showForm ? 'animate-slide-up scale-100' : 'scale-95 opacity-0'}`}>
                {/* Login Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-300 text-sm">Employee Management System</p>
                </div>

                <form 
                    onSubmit={submitHandler}
                    className='flex flex-col items-center justify-center space-y-6'
                >
                    <div className="relative group w-full">
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            className='w-full outline-none bg-white/10 border-2 border-emerald-500/30 focus:border-emerald-400 font-medium text-lg py-4 px-6 rounded-2xl placeholder:text-gray-400 transition-all duration-300 focus:bg-white/20 focus:scale-[1.02] focus:shadow-lg focus:shadow-emerald-500/20' 
                            type="email" 
                            placeholder='Enter your email'
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                    </div>

                    <div className="relative group w-full">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            className='w-full outline-none bg-white/10 border-2 border-emerald-500/30 focus:border-emerald-400 font-medium text-lg py-4 px-6 rounded-2xl placeholder:text-gray-400 transition-all duration-300 focus:bg-white/20 focus:scale-[1.02] focus:shadow-lg focus:shadow-emerald-500/20' 
                            type="password" 
                            placeholder='Enter password' 
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                    </div>

                    <button 
                        disabled={isLoading}
                        className='relative mt-4 text-white border-none outline-none font-bold bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-emerald-500 text-lg py-4 px-8 w-full rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30 btn-glow disabled:opacity-70 disabled:cursor-not-allowed group'
                    >
                        <span className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                            Log in
                        </span>
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            </div>
                        )}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    </button>
                </form>

                {/* Demo credentials hint */}
                <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-xs text-gray-400 text-center mb-2">Demo Credentials:</p>
                    <div className="text-xs text-gray-300 space-y-1">
                        <div>Admin: admin@me.com / 123</div>
                        <div>Employee: e@e.com / 123</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login