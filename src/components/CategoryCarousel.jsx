import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Code, Database, BarChart3, Monitor, Video, Sparkles } from 'lucide-react'

const categories = [
    { name: "Frontend", icon: Monitor, color: "from-blue-500 to-cyan-500" },
    { name: "Backend", icon: Database, color: "from-green-500 to-emerald-500" },
    { name: "Data Science", icon: BarChart3, color: "from-purple-500 to-pink-500" },
    { name: "Full Stack", icon: Code, color: "from-orange-500 to-red-500" },
    { name: "Video Editor", icon: Video, color: "from-indigo-500 to-purple-500" }
]

const CategoryCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const searchJobHandler = (query) => {
        console.log("Searching for:", query)
    }

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % categories.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length)
    }

    return (
        <div className="relative py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-4">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Popular Categories</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 to-purple-900 dark:from-white dark:to-purple-200 bg-clip-text text-transparent">
                        Explore by Category
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Find opportunities in your field of expertise
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110"
                    >
                        <ChevronLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110"
                    >
                        <ChevronRight className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                    </button>

                    {/* Carousel Content */}
                    <div className="overflow-hidden rounded-2xl">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {categories.map((category, index) => {
                                const Icon = category.icon
                                return (
                                    <div key={index} className="w-full flex-shrink-0 px-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                            {categories.map((cat, catIndex) => {
                                                const CatIcon = cat.icon
                                                return (
                                                    <div
                                                        key={catIndex}
                                                        className="group relative"
                                                    >
                                                        {/* Glow Effect */}
                                                        <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>

                                                        {/* Card */}
                                                        <button
                                                            onClick={() => searchJobHandler(cat.name.toLowerCase())}
                                                            className="relative w-full p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                                                        >
                                                            {/* Icon */}
                                                            <div className={`mb-4 p-3 bg-gradient-to-r ${cat.color} rounded-xl w-fit mx-auto`}>
                                                                <CatIcon className="w-6 h-6 text-white" />
                                                            </div>

                                                            {/* Category Name */}
                                                            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">
                                                                {cat.name}
                                                            </h3>

                                                            {/* Subtitle */}
                                                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                                                                Explore opportunities
                                                            </p>

                                                            {/* Action Button */}

                                                        </button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center mt-8 gap-2">
                        {categories.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 scale-125'
                                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                        Can't find your category?
                    </p>
                    <button className="px-8 py-3 bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 text-white font-semibold rounded-full hover:from-slate-900 hover:to-black transition-all duration-300 hover:scale-105">
                        View All Categories
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryCarousel