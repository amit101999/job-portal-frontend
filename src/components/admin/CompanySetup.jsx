import React, { useEffect, useState } from 'react'
import Nabvar from '../shared/Nabvar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileText, Upload, CheckCircle, Sparkles } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
// import { Textarea } from '../ui/textarea'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import useGetCompanyByID from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams()
    const companyID = params.id
    const navigate = useNavigate()

    useGetCompanyByID(companyID)

    const [loading, setLoading] = useState(false)
    const { singleCompany } = useSelector(store => store.company)

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file: file })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', input.name)
        formData.append('description', input.description)
        formData.append('website', input.website)
        formData.append('location', input.location)
        if (input.file) {
            formData.append('file', input.file)
        }

        try {
            setLoading(true)
            const res = await axios.put(`${import.meta.env.VITE_COMPANY_API_END_POINT}/update/${companyID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/companies")
            }
        } catch (err) {
            console.error("Error in submitting form", err)
            toast.error("Error in updating company profile")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany])

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800">
            <Nabvar />

            <div className="py-8 px-4">
                <div className="max-w-4xl mx-auto">


                    {/* Main Form Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="p-8 md:p-12">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg mb-4">
                                    <Sparkles className="w-4 h-4 text-purple-600" />
                                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Step 2 of 3</span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    Complete Your Company Profile
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Add detailed information about your company to make it more attractive to potential candidates
                                </p>
                            </div>

                            <form onSubmit={submitHandler} className="space-y-8">
                                {/* Company Information Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Company Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                            <Building2 className="w-4 h-4" />
                                            Company Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={input.name}
                                            onChange={changeEventHandler}
                                            placeholder="Enter company name"
                                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                            required
                                        />
                                    </div>

                                    {/* Website */}
                                    <div className="space-y-2">
                                        <Label htmlFor="website" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                            <Globe className="w-4 h-4" />
                                            Website
                                        </Label>
                                        <Input
                                            id="website"
                                            type="text"
                                            name="website"
                                            value={input.website}
                                            onChange={changeEventHandler}
                                            placeholder="https://yourcompany.com"
                                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    {/* Location */}
                                    <div className="space-y-2">
                                        <Label htmlFor="location" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            Location
                                        </Label>
                                        <Input
                                            id="location"
                                            type="text"
                                            name="location"
                                            value={input.location}
                                            onChange={changeEventHandler}
                                            placeholder="City, Country"
                                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    {/* Company Logo */}
                                    <div className="space-y-2">
                                        <Label htmlFor="logo" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            Company Logo
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="logo"
                                                type="file"
                                                name="logo"
                                                accept="image/*"
                                                onChange={changeFileHandler}
                                                className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-slate-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                            />
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Upload a logo (PNG, JPG, or SVG recommended)
                                        </p>
                                    </div>
                                </div>

                                {/* Company Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Company Description
                                    </Label>
                                    <Input
                                        id="description"
                                        name="description"
                                        value={input.description}
                                        onChange={changeEventHandler}
                                        placeholder="Tell us about your company, culture, and what makes it special..."
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-700 text-slate-900 dark:text-white resize-none"
                                    />
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        A compelling description helps attract the right candidates
                                    </p>
                                </div>

                                {/* Company Preview */}
                                {(input.name || input.description) && (
                                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                            Company Preview
                                        </h3>
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-bold text-xl">
                                                    {input.name ? input.name.charAt(0).toUpperCase() : 'C'}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
                                                    {input.name || 'Company Name'}
                                                </h4>
                                                {input.location && (
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {input.location}
                                                    </p>
                                                )}
                                                {input.description && (
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3">
                                                        {input.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <div className="flex items-center justify-end pt-6">
                                    <Button
                                        type="submit"
                                        disabled={loading || !input.name.trim()}
                                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-w-[200px]"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-4 h-4" />
                                                Update Company
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup