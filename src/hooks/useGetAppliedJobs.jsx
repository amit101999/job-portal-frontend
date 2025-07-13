import { setAllAppliedJobs, setAllJobs } from '@/redux/jobSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAppliedJobs = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_APPLICATION_API_END_POINT}/get`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.applications))
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchAllAppliedJobs()
    }, [])
}

export default useGetAppliedJobs