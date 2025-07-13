import React, { useState } from 'react'
import Nabvar from '../shared/Nabvar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {

    const companyArray = []

    const [input, setInput] = useState({
        title: "",
        description: "",
        location: "",
        requirements: "",
        salary: "",
        jobType: "",
        exprience: "",
        position: 0,
        companyId: ""
    })

    const [loading, setLoading] = useState(false)

    const { companies } = useSelector((store) => store.company)

    const navigate = useNavigate()

    const changeEventHandlder = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((cmp) => cmp.name.toLowerCase() == value)
        setInput({ ...input, companyId: selectedCompany._id })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_JOB_API_END_POINT}/postjob`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            if (res.data.success) {
                toast.message("job posted successfully")
                navigate("/admin/jobs")
            }
        } catch (err) {
            toast.error("Error in posting job")
            console.log("error in posting job", err)
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <Nabvar />
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800 py-2 ">
                <div className="max-w-6xl mx-auto">


                    {/* Main Form Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 md:p-6">
                        <h1 className="text-center pb-6 text-3xl md:text-4xl font-black  bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
                            Create New  Job
                        </h1>
                        <form onSubmit={submitHandler} className="space-y-8">
                            {/* Basic Information Section */}
                            <div className="space-y-2">
                                <div className="border-b border-slate-200 dark:border-slate-700 ">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white ">
                                        Basic Information
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                                            Job Title
                                        </Label>
                                        <Input
                                            value={input.title}
                                            onChange={changeEventHandlder}
                                            type="text"
                                            name="title"
                                            className="h-12 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500 rounded-xl text-slate-900 dark:text-white"
                                            placeholder="e.g. Senior React Developer"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                                            Job Type
                                        </Label>
                                        <Input
                                            value={input.jobType}
                                            onChange={changeEventHandlder}
                                            type="text"
                                            name="jobType"
                                            className="h-12 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500 rounded-xl text-slate-900 dark:text-white"
                                            placeholder="e.g. Full-time, Part-time, Contract"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                                            Job Description
                                        </Label>
                                        <Input
                                            value={input.description}
                                            onChange={changeEventHandlder}
                                            type="text"
                                            name="description"
                                            className="h-12 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500 rounded-xl text-slate-900 dark:text-white"
                                            placeholder="Brief description of the role and responsibilities"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Requirements & Compensation Section */}
                            <div className="space-y-2">
                                <div className="border-b border-slate-200 dark:border-slate-700 ">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white ">
                                        Requirements & Compensation
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                                            Required Skills
                                        </Label>
                                        <Input
                                            value={input.requirements}
                                            onChange={changeEventHandlder}
                                            type="text"
                                            name="requirements"
                                            className="h-12 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500 rounded-xl text-slate-900 dark:text-white"
                                            placeholder="e.g. React, Node.js, MongoDB"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                                            Salary Range
                                        </Label>
                                        <Input
                                            value={input.salary}
                                            onChange={changeEventHandlder}
                                            type="text"
                                            name="salary"
                                            className="h-12 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500 rounded-xl text-slate-900 dark:text-white"
                                            placeholder="e.g. 12-15 LPA"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                                            Location
                                        </Label>
                                        <Input
                                            value={input.location}
                                            onChange={changeEventHandlder}
                                            type="text"
                                            name="location"
                                            className="h-12 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500 rounded-xl text-slate-900 dark:text-white"
                                            placeholder="e.g. Mumbai, Remote, Hybrid"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                                            Experience Level
                                        </Label>
                                        <Input
                                            value={input.exprience}
                                            onChange={changeEventHandlder}
                                            type="text"
                                            name="exprience"
                                            className="h-12 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500 rounded-xl text-slate-900 dark:text-white"
                                            placeholder="e.g. 2-4 years, Entry Level, Senior"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Additional Details Section */}
                            <div className="space-y-2">
                                <div className="border-b border-slate-200 dark:border-slate-700 ">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white ">
                                        Additional Details
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                                            Number of Positions
                                        </Label>
                                        <Input
                                            value={input.position}
                                            onChange={changeEventHandlder}
                                            type="number"
                                            name="position"
                                            className="h-12 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500 rounded-xl text-slate-900 dark:text-white"
                                            placeholder="e.g. 3"
                                        />
                                    </div>

                                    {companies.length !== 0 && (
                                        <div className="space-y-2">
                                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                                                Select Company
                                            </Label>
                                            <Select onValueChange={selectChangeHandler}>
                                                <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500 rounded-xl text-slate-900 dark:text-white">
                                                    <SelectValue placeholder="Choose a company" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup className='bg-white dark:bg-slate-800'>
                                                        {companies.map((cmp) => (
                                                            <SelectItem
                                                                key={cmp._id}
                                                                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                                                                value={cmp.name.toLowerCase()}
                                                            >
                                                                {cmp.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                {loading ? (
                                    <Button
                                        disabled
                                        className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg rounded-xl shadow-lg transition-all duration-300"
                                    >
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                        Publishing Job...
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                                    >
                                        Post New Job
                                    </Button>
                                )}
                            </div>

                            {/* Warning Message */}
                            {companies.length === 0 && (
                                <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border border-red-200 dark:border-red-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                                            Please register a company first before posting a job
                                        </p>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostJob