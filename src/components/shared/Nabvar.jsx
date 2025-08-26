import React from 'react'
import { LogOut, User2, Briefcase, Building, Home, Search, Eye } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setAuthUser } from '@/redux/authSlice'

const Navbar = () => {
    // Mock user data and functions for demonstration
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
            // toast.error(err?.response?.data?.message || "Logout failed")
        }
    }

    return (
        <header className="relative z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <div className="cursor-pointer">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            Dream
                        </span>
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            Jobs
                        </span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-8">
                        {user?.role === 'recruiter' ? (
                            <>
                                <li>
                                    <a href="/admin/companies" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200">
                                        <Building className="w-4 h-4" />
                                        Companies
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/jobs" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200">
                                        <Briefcase className="w-4 h-4" />
                                        Jobs
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <a href="/" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200">
                                        <Home className="w-4 h-4" />
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="/jobs" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200">
                                        <Briefcase className="w-4 h-4" />
                                        Jobs
                                    </a>
                                </li>
                                <li>
                                    <a href="/browse" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200">
                                        <Search className="w-4 h-4" />
                                        Browse
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

                {/* Auth Section */}
                {!user ? (
                    <div className="flex items-center gap-4">
                        <a href="/login">
                            <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
                                Login
                            </button>
                        </a>
                        <a href="/signup">
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                                Sign Up
                            </button>
                        </a>
                    </div>
                ) : (
                    <div className="relative group">
                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <User2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div className="hidden md:block">
                                <div className="text-gray-900 dark:text-white font-medium text-sm">{user?.fullname}</div>
                                <div className="text-gray-600 dark:text-gray-400 text-xs">{user?.profile?.bio}</div>
                            </div>
                        </div>

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                            {/* User Info */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                        <User2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{user?.fullname}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{user?.profile?.bio}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="p-2">
                                {user?.role === "student" && (
                                    <a href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                        <User2 className="w-4 h-4" />
                                        <span className="font-medium">View Profile</span>
                                    </a>
                                )}
                                <button
                                    onClick={logoutHandler}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar