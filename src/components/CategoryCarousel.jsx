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
        <div className="relative py-16 bg-white dark:bg-gray-900">
            <div className="relative z-10 max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Popular Categories</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Explore by Category
                    </h2>
                    <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Find opportunities in your field of expertise
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>

                    {/* Carousel Content */}
                    <div className="overflow-hidden rounded-lg">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {categories.map((category, index) => {
                                const Icon = category.icon
                                return (
                                    <div key={index} className="w-full flex-shrink-0 px-2">
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                            {categories.map((cat, catIndex) => {
                                                const CatIcon = cat.icon
                                                return (
                                                    <div
                                                        key={catIndex}
                                                        className="group relative"
                                                    >
                                                        {/* Card */}
                                                        <button
                                                            onClick={() => searchJobHandler(cat.name.toLowerCase())}
                                                            className="relative w-full p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
                                                        >
                                                            {/* Icon */}
                                                            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg w-fit mx-auto">
                                                                <CatIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                                            </div>

                                                            {/* Category Name */}
                                                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                                                                {cat.name}
                                                            </h3>

                                                            {/* Subtitle */}
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                Explore opportunities
                                                            </p>
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
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${index === currentIndex
                                    ? 'bg-blue-600 scale-125'
                                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Can't find your category?
                    </p>
                    <button className="px-6 py-2.5 bg-gray-900 dark:bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200">
                        View All Categories
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryCarousel