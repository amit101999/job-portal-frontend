import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Building2, Calendar, Users } from 'lucide-react'
import { useSelector } from 'react-redux'
import { setfilterCompanyByText } from '@/redux/companySlice'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, filterCompanyByText } = useSelector(store => store.company)
    const navigate = useNavigate()
    const [filterCompany, setFilterCompany] = useState(companies)

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
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 mb-8 overflow-hidden">
                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-xl shadow-lg">
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
                                    Companies Dashboard
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400 mt-2">
                                    Manage your registered companies
                                </p>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Total Companies</p>
                                        <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                            {companies?.length || 0}
                                        </p>
                                    </div>
                                    <Users className="w-8 h-8 text-blue-500 opacity-70" />
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 p-6 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Active Companies</p>
                                        <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                                            {filterCompany?.length || 0}
                                        </p>
                                    </div>
                                    <Building2 className="w-8 h-8 text-emerald-500 opacity-70" />
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Recent Activity</p>
                                        <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                            Today
                                        </p>
                                    </div>
                                    <Calendar className="w-8 h-8 text-orange-500 opacity-70" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Companies Table */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                            Company Directory
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            A comprehensive list of your registered companies
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4">
                                        Logo
                                    </TableHead>
                                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4">
                                        Company Name
                                    </TableHead>
                                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4">
                                        Registration Date
                                    </TableHead>
                                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4 text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filterCompany?.length <= 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-12">
                                            <div className="flex flex-col items-center justify-center">
                                                <Building2 className="w-16 h-16 text-slate-400 mb-4" />
                                                <p className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">
                                                    No companies found
                                                </p>
                                                <p className="text-sm text-slate-500 dark:text-slate-500">
                                                    Start by registering your first company
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filterCompany?.map((cmp, index) => (
                                        <TableRow
                                            key={index}
                                            className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-200"
                                        >
                                            <TableCell className="py-4">
                                                <div className="flex items-center">
                                                    <div className="relative">
                                                        <Avatar className="w-12 h-12 ring-2 ring-slate-200 dark:ring-slate-600">
                                                            <AvatarImage
                                                                src={cmp.logo}
                                                                alt={cmp.name}
                                                                className="object-cover"
                                                            />
                                                        </Avatar>
                                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-900 dark:text-white text-base">
                                                        {cmp.name}
                                                    </span>
                                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                                        Active Company
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-slate-400" />
                                                    <span className="text-slate-600 dark:text-slate-300 font-medium">
                                                        {cmp.createdAt.split("T")[0]}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4 text-right">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200">
                                                            <MoreHorizontal className="w-5 h-5 text-slate-500" />
                                                        </button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-48 p-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl">
                                                        <div className="p-1">
                                                            <button
                                                                onClick={() => navigate(`/admin/companies/${cmp._id}`)}
                                                                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                                <span>Edit Company</span>
                                                            </button>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Footer */}
                    {filterCompany?.length > 0 && (
                        <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Showing {filterCompany.length} of {companies?.length || 0} companies
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
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