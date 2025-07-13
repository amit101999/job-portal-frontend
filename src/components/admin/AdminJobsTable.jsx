import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {

    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)

    const navigate = useNavigate()
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)

    useEffect(() => {
        const filterJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                // return true mean the same 
                return allAdminJobs
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
        })
        setFilterJobs(filterJob)
    }, [searchJobByText, allAdminJobs])

    return (
        <div className="w-full overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-2">
                        Job Management
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-lg">
                        Manage and track all your posted jobs
                    </p>
                </div>

                {/* Table Container */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table className="w-full min-w-0">
                            <TableCaption className="py-6 text-slate-600 dark:text-slate-300 text-base bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 font-medium">
                                A list of your recent registered jobs
                            </TableCaption>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-b-2 border-purple-200 dark:border-purple-500/30">
                                    <TableHead className="min-w-0 text-slate-700 dark:text-slate-200 font-bold text-base py-4 px-6">
                                        Company Name
                                    </TableHead>
                                    <TableHead className="min-w-0 text-slate-700 dark:text-slate-200 font-bold text-base py-4 px-6">
                                        Role
                                    </TableHead>
                                    <TableHead className="min-w-0 text-slate-700 dark:text-slate-200 font-bold text-base py-4 px-6">
                                        Date
                                    </TableHead>
                                    <TableHead className="text-right min-w-0 text-slate-700 dark:text-slate-200 font-bold text-base py-4 px-6">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    filterJobs.length <= 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-12">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center">
                                                        <Eye className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                                                    </div>
                                                    <div className="text-slate-600 dark:text-slate-300 text-lg font-medium">
                                                        No jobs found
                                                    </div>
                                                    <div className="text-slate-500 dark:text-slate-400 text-sm">
                                                        Start by creating your first job posting
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filterJobs?.map((job, index) => {
                                            return (
                                                <TableRow key={index} className="hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 dark:hover:from-purple-900/10 dark:hover:to-pink-900/10 transition-all duration-300 border-b border-slate-100 dark:border-slate-700">
                                                    <TableCell className="min-w-0 truncate max-w-[200px] py-4 px-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center">
                                                                <span className="text-slate-600 dark:text-slate-300 font-bold text-sm">
                                                                    {job?.company?.name?.charAt(0)?.toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                                                                {job?.company?.name}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="min-w-0 truncate max-w-[200px] py-4 px-6">
                                                        <div className="font-medium text-slate-700 dark:text-slate-300">
                                                            {job?.title}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="min-w-0 whitespace-nowrap py-4 px-6">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                            <span className="text-slate-600 dark:text-slate-300 font-medium">
                                                                {job.createdAt.split("T")[0]}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right cursor-pointer min-w-0 py-4 px-6">
                                                        <Popover>
                                                            <PopoverTrigger className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200">
                                                                <MoreHorizontal className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-40 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl">
                                                                <div onClick={() => { navigate(`/admin/companies/${job._id}`) }}
                                                                    className='flex items-center gap-3 cursor-pointer p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200'>
                                                                    <Edit2 className='w-4 h-4 text-blue-600 dark:text-blue-400' />
                                                                    <span className="text-slate-700 dark:text-slate-200 font-medium">Edit</span>
                                                                </div>
                                                                <div onClick={() => navigate(`/admin/job/${job._id}/applicants`)}
                                                                    className='flex items-center gap-3 cursor-pointer p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200'>
                                                                    <Eye className='w-4 h-4 text-green-600 dark:text-green-400' />
                                                                    <span className="text-slate-700 dark:text-slate-200 font-medium">Applicants</span>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    )
                                }
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminJobsTable