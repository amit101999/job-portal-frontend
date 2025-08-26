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
        <section className="relative min-h-screen flex items-center justify-center px-6 py-10 bg-gray-50 dark:bg-gray-900">
            {/* Subtle background accent */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
                {/* Clean Heading */}
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white">
                        <span className="block">
                            Find Your
                        </span>
                        <span className="block text-blue-600 dark:text-blue-400">
                            Dream Career
                        </span>
                    </h1>
                </div>

                {/* Simplified Subtext */}
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Join thousands of professionals who've transformed their careers.
                    <span className="text-blue-600 dark:text-blue-400 font-medium"> Discover, Apply, Succeed.</span>
                </p>

                {/* Clean Search Bar */}
                <div className="max-w-xl mx-auto mt-12">
                    <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <input
                            type="text"
                            placeholder="Search for jobs, companies, or skills..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 px-6 py-4 text-base bg-transparent focus:outline-none text-gray-800 dark:text-white placeholder:text-gray-500"
                        />
                        <button
                            onClick={searchJobHandler}
                            className="m-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base rounded-md transition-colors duration-200 flex items-center gap-2"
                        >
                            <Search className="w-5 h-5" />
                            Search
                        </button>
                    </div>
                </div>

                {/* Clean Stats */}
                <div className="flex flex-wrap justify-center gap-12 mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            50K+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Active Jobs
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            200+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Top Companies
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            98%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Success Rate
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection