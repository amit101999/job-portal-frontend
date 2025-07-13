import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { setSingleCompany } from '@/redux/companySlice'
import { useDispatch } from 'react-redux'
import { Building2, ArrowRight, ArrowLeft, Sparkles, CheckCircle } from 'lucide-react'
import Navbar from '../shared/Nabvar'

const CreateCompany = () => {
    const navigate = useNavigate()
    const [companyName, setComapanyName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error('Please enter a company name')
            return
        }

        setIsLoading(true)
        try {
            const res = await axios.post(`${import.meta.env.VITE_COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    "Content-Type": "application/json"
                }, withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setSingleCompany(res.data.company))
                const cmpID = res?.data?.company?._id
                navigate(`/admin/companies/${cmpID}`)
            }
        } catch (err) {
            console.error("Error in registering new company", err)
            toast.error('Failed to create company. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            registerNewCompany()
        }
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800 py-8 px-4">
                <div className="max-w-4xl mx-auto">


                    {/* Main Form Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="p-8 md:p-12">
                            <div className="max-w-2xl mx-auto">
                                {/* Form Header */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-lg mb-4">
                                        <Sparkles className="w-4 h-4 text-emerald-600" />
                                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Step 1 of 3</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                        What's your company name?
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Choose a name that represents your brand. Don't worry, you can change this later in your company settings.
                                    </p>
                                </div>

                                {/* Input Section */}
                                <div className="space-y-6">
                                    <div>
                                        <Label htmlFor="companyName" className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                                            Company Name *
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="companyName"
                                                type="text"
                                                value={companyName}
                                                onChange={(e) => setComapanyName(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="Enter your company name (e.g., JobHunt, Microsoft, Google)"
                                                className="w-full px-4 py-4 text-lg border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                                            />
                                            {companyName && (
                                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                            This will be displayed on your company profile and job postings
                                        </p>
                                    </div>

                                    {/* Company Name Preview */}
                                    {companyName && (
                                        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                                                    <span className="text-white font-bold text-lg">
                                                        {companyName.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                                        {companyName}
                                                    </h3>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                                        Preview of your company name
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between pt-8">
                                        <Button
                                            variant="outline"
                                            onClick={() => navigate("/admin/companies")}
                                            className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                            Cancel
                                        </Button>

                                        <Button
                                            onClick={registerNewCompany}
                                            disabled={!companyName.trim() || isLoading}
                                            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    Continue
                                                    <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </Button>
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

export default CreateCompany