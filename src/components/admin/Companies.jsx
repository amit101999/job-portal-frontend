import React, { useEffect, useState } from 'react'
import Nabvar from '../shared/Nabvar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setfilterCompanyByText } from '@/redux/companySlice'
import { useDispatch } from 'react-redux'

const Companies = () => {
    useGetAllCompanies()
    const [input, setInput] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setfilterCompanyByText(input))
    }, [input])

    const navigate = useNavigate()
    return (
        <div>
            <Nabvar />
            <div className='max-w-6xl mx-auto my-10 '>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className='w-fit'
                        placeholder="filter by name"
                        value={input}
                        onChange={(e) => { setInput(e.target.value) }}
                    />
                    <Button className='flex bg-black text-white rounded'
                        onClick={() => navigate("/admin/companies/create")}
                    >
                        New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies