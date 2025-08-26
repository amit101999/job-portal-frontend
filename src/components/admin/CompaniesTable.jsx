import React, { useEffect, useState } from 'react'
import { Edit2, MoreHorizontal, Building2, Calendar, Users } from 'lucide-react'

const CompaniesTable = () => {
    // Mock data for demonstration
    const companies = [
        {
            _id: "1",
            name: "Tech Corp",
            logo: "",
            createdAt: "2024-01-15T10:00:00Z"
        },
        {
            _id: "2", 
            name: "Innovation Labs",
            logo: "",
            createdAt: "2024-02-20T14:30:00Z"
        }
    ]
    
    const filterCompanyByText = ""
    const [filterCompany, setFilterCompany] = useState(companies)
    const [activeDropdown, setActiveDropdown] = useState(null)

    const navigate = (path) => {
        console.log(`Navigating to: ${path}`)
    }

    useEffect(() => {
        const filterCompany = companies.length >= 0 && companies.filter((company) => {
            if (!filterCompanyByText) {
                return companies
            }
            return company?.name?.toLowerCase().includes(filterCompanyByText.toLowerCase())
        })
        setFilterCompany(filterCompany)
    }, [filterCompanyByText])

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Companies Dashboard
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                    Manage your registered companies
                                </p>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Companies</p>
                                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            {companies?.length || 0}
                                        </p>
                                    </div>
                                    <Users className="w-8 h-8 text-blue-500 opacity-70" />
                                </div>
                            </div>

                            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Active Companies</p>
                                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            {filterCompany?.length || 0}
                                        </p>
                                    </div>
                                    <Building2 className="w-8 h-8 text-green-500 opacity-70" />
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Recent Activity</p>
                                        <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                                            Today
                                        </p>
                                    </div>
                                    <Calendar className="w-8 h-8 text-gray-500 opacity-70" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Companies Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Company Directory
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            A comprehensive list of your registered companies
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700/50">
                                    <th className="text-left font-semibold text-gray-700 dark:text-gray-300 py-4 px-6">
                                        Logo
                                    </th>
                                    <th className="text-left font-semibold text-gray-700 dark:text-gray-300 py-4 px-6">
                                        Company Name
                                    </th>
                                    <th className="text-left font-semibold text-gray-700 dark:text-gray-300 py-4 px-6">
                                        Registration Date
                                    </th>
                                    <th className="text-right font-semibold text-gray-700 dark:text-gray-300 py-4 px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterCompany?.length <= 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center py-12 px-6">
                                            <div className="flex flex-col items-center justify-center">
                                                <Building2 className="w-16 h-16 text-gray-400 mb-4" />
                                                <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                                                    No companies found
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Start by registering your first company
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filterCompany?.map((cmp, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                                        >
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <div className="relative">
                                                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                                            <Building2 className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                                        </div>
                                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-900 dark:text-white text-base">
                                                        {cmp.name}
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        Active Company
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    <span className="text-gray-600 dark:text-gray-300 font-medium">
                                                        {cmp.createdAt.split("T")[0]}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="relative">
                                                    <button 
                                                        onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                                                    >
                                                        <MoreHorizontal className="w-5 h-5 text-gray-500" />
                                                    </button>
                                                    
                                                    {activeDropdown === index && (
                                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                                                            <div className="p-1">
                                                                <button
                                                                    onClick={() => {
                                                                        navigate(`/admin/companies/${cmp._id}`)
                                                                        setActiveDropdown(null)
                                                                    }}
                                                                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                                                                >
                                                                    <Edit2 className="w-4 h-4" />
                                                                    <span>Edit Company</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    {filterCompany?.length > 0 && (
                        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Showing {filterCompany.length} of {companies?.length || 0} companies
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        All systems operational
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CompaniesTable