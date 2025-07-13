import { setCompanies } from '@/redux/companySlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_COMPANY_API_END_POINT}/get`, {
                    withCredentials: true
                })

                console.log(res.data)

                if (res.data.success) {
                    dispatch(setCompanies(res.data.company))
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchAllCompanies()
    }, [])
}

export default useGetAllCompanies