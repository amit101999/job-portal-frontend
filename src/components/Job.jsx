import React from 'react'
import { Bookmark, MapPin, Calendar, Building, DollarSign, Users, Clock, ExternalLink } from 'lucide-react'

const Job = ({ job }) => {
    // Mock navigate function for demonstration
    const navigate = (path) => {
        console.log(`Navigating to: ${path}`)
    }

    const daysAgoFunction = () => {
        const currentDate = new Date().getDate();
        const documentCreatedDate = new Date(job?.createdAt).getDate();

        return currentDate - documentCreatedDate == 0 ? "Today" : `${currentDate - documentCreatedDate} days ago`
    }

    return (
        <div className='group relative w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200'>
            <div className="relative z-10 min-w-0">
                {/* Header with date and bookmark */}
                <div className='flex items-center justify-between mb-4'>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-full">
                        <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className='text-green-700 dark:text-green-300 text-sm font-medium'>{daysAgoFunction()}</span>
                    </div>
                    <button className="rounded-full w-10 h-10 p-0 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 flex items-center justify-center">
                        <Bookmark className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" />
                    </button>
                </div>

                {/* Company info */}
                <div className='flex items-center gap-4 mb-4 min-w-0'>
                    <div className="flex-shrink-0">
                        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                <Building className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                        <h2 className='font-semibold text-lg text-gray-900 dark:text-white truncate'>
                            {job?.company?.name}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 min-w-0">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className='text-sm truncate'>{job?.location || "India"}</span>
                        </div>
                    </div>
                </div>

                {/* Job details */}
                <div className="mb-4 min-w-0">
                    <h1 className='font-semibold text-xl mb-3 text-gray-900 dark:text-white line-clamp-2 overflow-hidden'>
                        {job?.title || job?.description?.slice(0, 50)}
                    </h1>
                    <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 overflow-hidden'>
                        {job?.description}
                    </p>
                </div>

                {/* Job badges */}
                <div className='flex flex-wrap gap-2 mb-6 min-w-0'>
                    <div className='px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded-full flex items-center gap-1.5 flex-shrink-0'>
                        <Users className="w-3 h-3" />
                        12 Positions
                    </div>
                    <div className='px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 rounded-full flex items-center gap-1.5 flex-shrink-0'>
                        <Building className="w-3 h-3" />
                        <span className="truncate">{job?.jobType}</span>
                    </div>
                    <div className='px-3 py-1.5 text-xs font-medium bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full flex items-center gap-1.5 flex-shrink-0'>
                        <DollarSign className="w-3 h-3" />
                        <span className="truncate">{job?.salary || "24 LPA"}</span>
                    </div>
                </div>

                {/* Action buttons */}
                <div className='flex items-center gap-3 min-w-0'>
                    <button
                        onClick={() => navigate(`/description/${job?._id}`)}
                        className="flex-1 py-2.5 text-sm font-medium border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 min-w-0"
                    >
                        <ExternalLink className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">View Details</span>
                    </button>
                    <button className="flex-1 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 min-w-0">
                        <Bookmark className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">Save Job</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Job