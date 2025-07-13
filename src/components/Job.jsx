import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Calendar, Building, DollarSign, Users, Clock, ExternalLink } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate()

    const daysAgoFunction = () => {
        const currentDate = new Date().getDate();
        const documentCreatedDate = new Date(job?.createdAt).getDate();

        return currentDate - documentCreatedDate == 0 ? "Today" : `${currentDate - documentCreatedDate} days ago`
    }

    return (
        <div className='group relative w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4  hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden'>
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-pink-50/30  dark:from-purple-900/10 dark:via-pink-900/10  "></div>

            <div className="relative z-10 min-w-0">
                {/* Header with date and bookmark */}
                <div className='flex items-center justify-between mb-1'>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-full border border-emerald-200/50 dark:border-emerald-500/30">
                        <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className='text-emerald-700 dark:text-emerald-300 text-sm font-medium'>{daysAgoFunction()}</span>
                    </div>
                    <Button
                        variant="outline"
                        className="rounded-full w-10 h-10 p-0 border-2 border-slate-200 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 group/bookmark"
                    >
                        <Bookmark className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover/bookmark:text-purple-600 dark:group-hover/bookmark:text-purple-400 transition-colors duration-300" />
                    </Button>
                </div>

                {/* Company info */}
                <div className='flex items-center gap-4 mb-2 min-w-0'>
                    <div className="flex-shrink-0">
                        <div className="p-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={job?.company?.logo} />
                            </Avatar>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                        <h2 className='font-bold text-xl text-slate-900 dark:text-white  truncate'>
                            {job?.company?.name}
                        </h2>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 min-w-0">
                            <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                            <span className='text-sm font-medium truncate'>{job?.location || "India"}</span>
                        </div>
                    </div>
                </div>

                {/* Job details */}
                <div className="mb-4 min-w-0">
                    <h1 className='font-bold text-xl mb-3 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent line-clamp-2 overflow-hidden'>
                        {job?.title || job?.description?.slice(0, 50)}
                    </h1>
                    <p className='text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3 overflow-hidden'>
                        {job?.description}
                    </p>
                </div>

                {/* Job badges */}
                <div className='flex flex-wrap gap-2 mb-6 min-w-0'>
                    <Badge className='px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-0 rounded-full flex items-center gap-1.5 flex-shrink-0'>
                        <Users className="w-3 h-3" />
                        12 Positions
                    </Badge>
                    <Badge className='px-3 py-1.5 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-0 rounded-full flex items-center gap-1.5 flex-shrink-0'>
                        <Building className="w-3 h-3" />
                        <span className="truncate">{job?.jobType}</span>
                    </Badge>
                    <Badge className='px-3 py-1.5 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-0 rounded-full flex items-center gap-1.5 flex-shrink-0'>
                        <DollarSign className="w-3 h-3" />
                        <span className="truncate">{job?.salary || "24 LPA"}</span>
                    </Badge>
                </div>

                {/* Action buttons */}
                <div className='flex items-center gap-3 min-w-0'>
                    <Button
                        onClick={() => navigate(`/description/${job?._id}`)}
                        variant="outline"
                        className="flex-1 py-2.5 text-sm font-semibold border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/details min-w-0"
                    >
                        <ExternalLink className="w-4 h-4 group-hover/details:translate-x-0.5 transition-transform duration-300 flex-shrink-0" />
                        <span className="truncate">View Details</span>
                    </Button>
                    <Button
                        className="flex-1 py-2.5 text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 min-w-0"
                    >
                        <Bookmark className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">Save Job</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Job