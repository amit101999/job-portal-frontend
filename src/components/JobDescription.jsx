import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';
import Navbar from './shared/Nabvar';

const JobDescription = () => {
    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant == user?._id) || false
    const [isApplied, setIsApplied] = useState(isIntiallyApplied)

    const applyJobhandler = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true
            })
            if (res.data.success) {
                setIsApplied(true)
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updateSingleJob))
                toast.success('Application submitted successfully!')
            }
        } catch (err) {
            console.log("error in applying job", err)
            toast.success('Application not submittted!')
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, user?._id])
    console.log(singleJob.location)

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 mb-8 overflow-hidden">
                        <div className="p-8 md:p-12">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                                <div className="flex-1">
                                    <div className="mb-6">
                                        <span className="inline-block px-4 py-2 text-sm font-semibold bg-gradient-to-r from-emerald-400 to-cyan-500 text-white rounded-lg shadow-sm">
                                            Open Position
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-3 mb-6">
                                        <Badge className="px-4 py-2 text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-0 rounded-full">
                                            {singleJob?.jobType}
                                        </Badge>
                                    </div>

                                    <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="font-medium">{singleJob?.applications?.length || 0} Applicants</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span className="font-medium">Posted: {singleJob?.createdAt?.split("T")[0]}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-shrink-0">
                                    <Button
                                        onClick={isApplied ? null : applyJobhandler}
                                        disabled={isApplied}
                                        className={`px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 ${isApplied
                                            ? 'bg-slate-400 cursor-not-allowed text-white hover:bg-slate-400'
                                            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                                            }`}
                                    >
                                        {isApplied ? "Application Submitted" : "Apply for Position"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Job Information */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
                                <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                                    Job Details
                                </h2>

                                <div className="space-y-6">
                                    <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                                            Role & Responsibilities
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {singleJob?.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                                                Position
                                            </h4>
                                            <p className="text-lg font-medium text-slate-900 dark:text-white">
                                                {singleJob?.title}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                                                Location
                                            </h4>
                                            <p className="text-lg font-medium text-slate-900 dark:text-white">
                                                {singleJob?.location}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                                                Experience Required
                                            </h4>
                                            <p className="text-lg font-medium text-slate-900 dark:text-white">
                                                {singleJob?.exprience}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                                                Salary Range
                                            </h4>
                                            <p className="text-lg font-medium text-slate-900 dark:text-white">
                                                {singleJob?.salary} LPA
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Information */}
                        <div className="space-y-6">
                            {/* Quick Stats */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                    Application Stats
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                                        <div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">Total Applications</p>
                                            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                {singleJob?.applications?.length || 0}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-xl">
                                        <div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">Positions Available</p>
                                            <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                                                12
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Job Requirements */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                    Key Requirements
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                                        <span className="text-sm text-slate-600 dark:text-slate-300">2+ years experience</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                                        <span className="text-sm text-slate-600 dark:text-slate-300">Frontend development skills</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                                        <span className="text-sm text-slate-600 dark:text-slate-300">Team collaboration</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                                        <span className="text-sm text-slate-600 dark:text-slate-300">Problem-solving skills</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobDescription