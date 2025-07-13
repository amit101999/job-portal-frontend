import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Building2, MapPin, Users, DollarSign, Briefcase, ArrowRight } from 'lucide-react'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='group relative p-6 rounded-sm cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2'
        >
            {/* Background with gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-sm blur opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

            {/* Card content */}
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6 group-hover:shadow-2xl transition-all duration-300">
                {/* Company Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
                                <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h1 className='font-bold text-lg text-slate-800 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300'>
                                {job?.company?.name}
                            </h1>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                            <MapPin className="w-4 h-4" />
                            <p className='text-sm'>{job?.company?.location || "India"}</p>
                        </div>
                    </div>

                    {/* Arrow icon that appears on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                </div>

                {/* Job Details */}
                <div className="mb-6">
                    <h2 className='font-bold text-xl text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300'>
                        {job?.title || job?.description?.slice(0, 30) + "..."}
                    </h2>
                    <p className='text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3'>
                        {job?.description?.length > 120 ? job?.description?.slice(0, 120) + "..." : job?.description}
                    </p>
                </div>

                {/* Badges */}
                <div className='flex flex-wrap items-center gap-2 mt-4'>
                    <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full border border-blue-200 dark:border-blue-700/50">
                        <Users className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        <span className='text-xs font-semibold text-blue-700 dark:text-blue-300'>
                            {job?.positions || "12"} Positions
                        </span>
                    </div>

                    <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-full border border-red-200 dark:border-red-700/50">
                        <Briefcase className="w-3 h-3 text-red-600 dark:text-red-400" />
                        <span className='text-xs font-semibold text-red-700 dark:text-red-300'>
                            {job?.jobType || "Full-time"}
                        </span>
                    </div>

                    <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-full border border-purple-200 dark:border-purple-700/50">
                        <DollarSign className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                        <span className='text-xs font-semibold text-purple-700 dark:text-purple-300'>
                            {job?.salary || "24LPA"}
                        </span>
                    </div>
                </div>

                {/* Bottom highlight bar that appears on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
        </div>
    )
}

export default LatestJobCards