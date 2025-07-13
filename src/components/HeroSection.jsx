import React, { useState } from 'react'
import { Search } from 'lucide-react'

const HeroSection = () => {
    const [query, setQuery] = useState("")

    const searchJobHandler = () => {
        if (!query.trim()) return
        // Your existing logic here
        console.log("Searching for:", query)
    }

    return (
        <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400 to-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
                {/* Floating Badge */}
                <div className="inline-flex items-center justify-center">
                    <span className="relative px-8 py-3 text-sm font-semibold bg-gradient-to-r from-emerald-400 to-cyan-500 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 animate-bounce">
                        <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full blur opacity-75"></span>
                        <span className="relative flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            #1 Job Discovery Platform
                        </span>
                    </span>
                </div>

                {/* Dynamic Heading */}
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
                        <span className="block bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent animate-pulse">
                            Find Your
                        </span>
                        <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent font-extrabold transform hover:scale-105 transition-transform duration-300">
                            Dream Career
                        </span>
                    </h1>
                </div>

                {/* Compelling Subtext */}
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
                    Join thousands of professionals who've transformed their careers.
                    <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-semibold"> Discover, Apply, Succeed.</span>
                </p>

                {/* Enhanced Search Bar */}
                <div className="max-w-2xl mx-auto mt-12">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform group-hover:scale-105 transition-all duration-300">
                            <input
                                type="text"
                                placeholder="Search for jobs, companies, or skills..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 px-8 py-6 text-lg font-medium bg-transparent focus:outline-none text-slate-800 dark:text-white placeholder:text-slate-400 placeholder:font-normal"
                            />
                            <button
                                onClick={searchJobHandler}
                                className="m-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 flex items-center gap-2"
                            >
                                <Search className="w-6 h-6" />
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats or Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-16 text-center">
                    <div className="group">
                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                            50K+
                        </div>
                        <div className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium mt-1">
                            Active Jobs
                        </div>
                    </div>
                    <div className="group">
                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                            200+
                        </div>
                        <div className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium mt-1">
                            Top Companies
                        </div>
                    </div>
                    <div className="group">
                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                            98%
                        </div>
                        <div className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium mt-1">
                            Success Rate
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection