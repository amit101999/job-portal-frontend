import React from 'react'
import { Building2, MapPin, Users, DollarSign, Briefcase, ArrowRight } from 'lucide-react'

const LatestJobCards = ({ job }) => {
    // Mock navigate function for demonstration
    const navigate = (path) => {
        console.log(`Navigating to: ${path}`)
    }

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='group relative cursor-pointer transition-all duration-200'
        >
            {/* Card content */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                {/* Company Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <Building2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <h1 className='font-semibold text-lg text-gray-900 dark:text-white'>
                                {job?.company?.name}
                            </h1>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <p className='text-sm'>{job?.company?.location || "India"}</p>
                        </div>
                    </div>

                    {/* Arrow icon that appears on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>

                {/* Job Details */}
                <div className="mb-6">
                    <h2 className='font-semibold text-xl text-gray-900 dark:text-white mb-3'>
                        {job?.title || job?.description?.slice(0, 30) + "..."}
                    </h2>
                    <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3'>
                        {job?.description?.length > 120 ? job?.description?.slice(0, 120) + "..." : job?.description}
                    </p>
                </div>

                {/* Badges */}
                <div className='flex flex-wrap items-center gap-2 mt-4'>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                        <Users className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        <span className='text-xs font-medium text-blue-700 dark:text-blue-300'>
                            {job?.positions || "12"} Positions
                        </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-full">
                        <Briefcase className="w-3 h-3 text-green-600 dark:text-green-400" />
                        <span className='text-xs font-medium text-green-700 dark:text-green-300'>
                            {job?.jobType || "Full-time"}
                        </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-700 rounded-full">
                        <DollarSign className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                        <span className='text-xs font-medium text-gray-700 dark:text-gray-300'>
                            {job?.salary || "24LPA"}
                        </span>
                    </div>
                </div>

                {/* Bottom accent line that appears on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-b-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
            </div>
        </div>
    )
}

export default LatestJobCards