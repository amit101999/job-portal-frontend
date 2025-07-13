import React from 'react'
import { LogOut, User2, Briefcase, Building, Home, Search, Eye } from 'lucide-react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { setAuthUser } from '@/redux/authSlice'

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_USER_API_END_POINT }/logout`, {
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setAuthUser(null))
                navigate("/login")
                toast.success("Logged out successfully")
            }
        } catch (err) {
            console.log("error in logout: ", err)
            toast.error(err?.response?.data?.message || "Logout failed")
        }
    }

    return (
        <header className="relative z-[100] bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 border-b border-purple-500/20 shadow-2xl backdrop-blur-xl">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-0 right-20 w-24 h-24 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <div className="relative px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg backdrop-blur-sm border border-purple-500/30">
                            <span className="text-2xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                Dream
                            </span>
                            <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Jobs
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-8">
                        {user?.role === 'recruiter' ? (
                            <>
                                <li>
                                    <div className="group relative">
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
                                            <Building className="w-4 h-4" />
                                            <Link to="/admin/companies">Companies</Link>
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
                                    </div>
                                </li>
                                <li>
                                    <div className="group relative">
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
                                            <Briefcase className="w-4 h-4" />
                                            <Link to="/admin/jobs">Jobs</Link>
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
                                    </div>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/">
                                        <div className="group relative">
                                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
                                                <Home className="w-4 h-4" />
                                                Home
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/jobs">
                                        <div className="group relative">
                                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
                                                <Briefcase className="w-4 h-4" />
                                                Jobs
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/browse">
                                        <div className="group relative">
                                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
                                                <Search className="w-4 h-4" />
                                                Browse
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
                                        </div>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

                {/* Auth Section */}
                {!user ? (
                    <div className="flex items-center gap-4">
                        <Link to="/login">
                            <button className="px-6 py-2 text-white/90 hover:text-white font-medium border border-white/20 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="relative group">
                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                                <img
                                    src={user?.profile?.profilePic || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"}
                                    alt="Profile"
                                    className="relative w-10 h-10 rounded-full border-2 border-white/30 object-cover"
                                />
                            </div>
                            <div className="hidden md:block">
                                <div className="text-white font-medium text-sm">{user?.fullname}</div>
                                <div className="text-white/60 text-xs">{user?.profile?.bio}</div>
                            </div>
                        </div>

                        {/* Dropdown Menu - Fixed z-index */}
                        <div className="absolute z-[9999] right-0 top-full mt-2 w-72 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            {/* User Info */}
                            <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30"></div>
                                        <img
                                            src={user?.profile?.profilePic || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"}
                                            alt="Profile"
                                            className="relative w-12 h-12 rounded-full border-2 border-purple-200 object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 dark:text-white">{user?.fullname}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">{user?.profile?.bio}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="p-4 space-y-2">
                                {user?.role === "student" && (
                                    <Link to="/profile">
                                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 transition-all duration-300 cursor-pointer group/item">
                                            <User2 className="w-4 h-4 text-purple-600 group-hover/item:text-purple-700" />
                                            <span className="font-medium">View Profile</span>
                                        </div>
                                    </Link>
                                )}
                                <div
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 transition-all duration-300 cursor-pointer group/item"
                                    onClick={logoutHandler}
                                >
                                    <LogOut className="w-4 h-4 text-red-600 group-hover/item:text-red-700" />
                                    <span className="font-medium">Logout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar