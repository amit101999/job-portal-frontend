import React, { useEffect, useState } from 'react'
import Nabvar from './shared/Nabvar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Jobs = () => {

    const { allJobs, searchedQuery } = useSelector(store => store.job)

    const [filterJobs, setFilterJobs] = useState(allJobs)
    console.log(filterJobs)

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job?.title?.toLowerCase().includes(searchedQuery.toLowerCase())
                    // || job?.description?.toLowerCase().includes(searchedQuery.toLowerCase())
                    || job?.location?.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery])

    return (
        <div className="w-full overflow-x-hidden">
            <Nabvar />
            <div className='max-w-7xl mx-auto mt-5 px-4'>
                <div className='flex gap-5 w-full'>
                    <div className='w-1/5 flex-shrink-0 min-w-0'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs?.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 pb-5 min-w-0'>
                                <div className='grid grid-cols-3 gap-4 w-full'>
                                    {
                                        filterJobs?.map((job) => {
                                            return (
                                                <motion.div
                                                    initial={{ opacity: 10, x: 100 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 100 }}
                                                    transition={{ duration: 0.3 }}
                                                    key={job?._id}
                                                    className="w-full min-w-0">
                                                    <Job job={job} />
                                                </motion.div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div >
    )
}

export default Jobs