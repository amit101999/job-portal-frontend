import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from './shared/Nabvar'

const Home = () => {

    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate("/login")
        if (user?.role === 'recruiter') {
            navigate('admin/companies')
        }   // check if user is logged in
    }, [])

    useGetAllJobs()
    return (
        <div>
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs />
            <Footer />
        </div>
    )
}

export default Home