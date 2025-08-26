import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { setAuthUser, setLoading } from '@/redux/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { Mail, Lock, User, Users, Eye, EyeOff, Sparkles } from 'lucide-react'
import Navbar from '../shared/Nabvar'

const Login = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const [showPassword, setShowPassword] = useState(false)
    const submitHandler = async (e) => {
        dispatch(setLoading(true))
        e.preventDefault()
        try {
            const res = await axios.post(`${import.meta.env.VITE_USER_API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user))
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (err) {
            console.log("error in login : ", err)
            // toast.error("Use A valid Credientials")
            toast.error('Invalid credentials');
        } finally {
            dispatch(setLoading(false))
        }
    }


    return (

        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800 flex items-center justify-center p-4">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black bg-gradient-to-r from-slate-900 to-purple-900 dark:from-white dark:to-purple-200 bg-clip-text text-transparent">
                        Sign In
                    </h1>
                </div>

                {/* Form Container */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8">
                        <div className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-800 dark:text-white placeholder:text-slate-400 transition-all duration-300"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={input.password}
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-800 dark:text-white placeholder:text-slate-400 transition-all duration-300"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    I am a
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            id="student"
                                            checked={input.role === "student"}
                                            onChange={changeEventHandler}
                                            className="sr-only"
                                        />
                                        <label
                                            htmlFor="student"
                                            className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${input.role === "student"
                                                ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300'
                                                : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 text-slate-600 dark:text-slate-400'
                                                }`}
                                        >
                                            <User className="w-5 h-5" />
                                            <span className="font-medium">Student</span>
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            id="recruiter"
                                            checked={input.role === "recruiter"}
                                            onChange={changeEventHandler}
                                            className="sr-only"
                                        />
                                        <label
                                            htmlFor="recruiter"
                                            className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${input.role === "recruiter"
                                                ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300'
                                                : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 text-slate-600 dark:text-slate-400'
                                                }`}
                                        >
                                            <Users className="w-5 h-5" />
                                            <span className="font-medium">Recruiter</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                onClick={submitHandler}
                                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-bold text-lg rounded-xl shadow-lg transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Signing In...</span>
                                    </>
                                ) : (
                                    <span>Sign In</span>
                                )}
                            </button>

                            {/* Sign Up Link */}
                            <div className="text-center pt-4">
                                <p className="text-slate-600 dark:text-slate-400">
                                    Don't have an account?{' '}
                                    <Link to="/signup">
                                        <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-semibold hover:from-purple-700 hover:to-pink-700 cursor-pointer transition-all duration-300">
                                            Sign Up
                                        </span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
                    <p>Secure login with end-to-end encryption</p>
                </div>
            </div>
        </div>
    )
}

export default Login