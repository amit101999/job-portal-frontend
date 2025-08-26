import React, { useState } from 'react'
import Nabvar from './shared/Nabvar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText, Briefcase, User, Award } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobs from './AppliedJobs'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import axios from 'axios'

const skills = ['html', 'js', 'css', 'react']
const Profile = () => {
    const ishaveResume = true;
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth)
    useGetAppliedJobs()

    const genrateSummary = () => {
        console.log(user)
        const res = axios.post(`${import.meta.env.VITE_USER_API_END_POINT}/profile/summary`, { skills }, { withCredentials: true }).then(res => console.log(res.data)).catch(err => console.log("error in genrating summary", err))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800">
            <Nabvar />

            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400 to-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 pt-8 pb-12 px-4">
                {/* Main Profile Card */}
                <div className='max-w-4xl mx-auto bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl shadow-2xl my-8 p-8 md:p-12'>
                    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
                        <div className='flex items-center gap-6'>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                                <Avatar className="relative h-28 w-28 border-4 border-white/50 shadow-xl">
                                    <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwm2crnRitxC5fh95sHn-NIvLHH1CyORvr9g&s" />
                                </Avatar>
                            </div>
                            <div className="space-y-2">
                                <h1 className='text-3xl font-bold text-slate-800 dark:text-white bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                                    {user?.fullname}
                                </h1>
                                <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
                                    {user?.profile?.bio}
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setOpen(true)}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 px-6 py-3"
                            variant="outline"
                        >
                            <Pen className="w-4 h-4 mr-2" />
                            Edit Profile
                        </Button>
                    </div>

                    {/* Contact Information */}
                    <div className='my-8 space-y-4'>
                        <div className="flex items-center gap-2 mb-4">
                            <User className="w-5 h-5 text-purple-600" />
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Contact Information</h2>
                        </div>
                        <div className='grid md:grid-cols-2 gap-4'>
                            <div className='flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-500/30'>
                                <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Email</p>
                                    <span className="text-slate-800 dark:text-white font-semibold">{user?.email}</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-500/30'>
                                <div className="p-2 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg">
                                    <Contact className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Phone</p>
                                    <span className="text-slate-800 dark:text-white font-semibold">{user?.phoneNumber}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="my-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Award className="w-5 h-5 text-purple-600" />
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Skills</h2>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            {
                                user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => (
                                    <Badge
                                        key={index}
                                        className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                                    >
                                        {item}
                                    </Badge>
                                )) : <span className="text-slate-500 dark:text-slate-400 italic">No skills added yet</span>
                            }
                        </div>
                    </div>

                    {/* Resume Section */}
                    <div className='space-y-3'>
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="w-5 h-5 text-purple-600" />
                            <Label className="text-xl font-semibold text-slate-800 dark:text-white">Resume</Label>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-500/30">
                            {ishaveResume ? (
                                <a
                                    href={user?.profile?.resume}
                                    target='blank'
                                    className='flex items-center gap-3 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold hover:underline cursor-pointer group'
                                >
                                    <div className="p-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg group-hover:shadow-lg transition-shadow duration-300">
                                        <FileText className="w-4 h-4 text-white" />
                                    </div>
                                    <span>{user?.profile?.resumeOriginalName}</span>
                                </a>
                            ) : (
                                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                                    <div className="p-2 bg-slate-300 dark:bg-slate-600 rounded-lg">
                                        <FileText className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                    </div>
                                    <span className="italic">No Resume Found</span>
                                </div>
                            )}
                        </div>
                    </div>
                  {ishaveResume &&   <div>
                    profile Description :
                    <button className='text-sm bg-blue-600 p-2'
                    onClick={genrateSummary}
                    >Generate Summary</button>
                    </div>}
                </div>
                </div>
                 <div>

                {/* Applied Jobs Section */}
                <div className='max-w-4xl mx-auto bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl shadow-2xl p-8 md:p-12'>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <h1 className='text-2xl font-bold text-slate-800 dark:text-white'>Applied Jobs</h1>
                    </div>
                    <AppliedJobs />
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile