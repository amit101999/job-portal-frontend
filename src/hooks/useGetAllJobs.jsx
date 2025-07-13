import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job)
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_JOB_API_END_POINT}/get?keyword=` + searchedQuery, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.job))
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchAllJobs()
    }, [])
}

export default useGetAllJobs