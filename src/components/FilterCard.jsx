import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useDispatch } from 'react-redux'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Pune", "Dehradun"]
    },
    {
        filterType: "Role",
        array: ["Full stack", "Backend", "Frontend", "Datascience", "react Js"]
    },
    {
        filterType: "Salary",
        array: ["7lpa", "9lpa", "12lpa"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("")
    const dispatch = useDispatch()

    console.log(selectedValue)

    const changeHandler = (value) => {
        setSelectedValue(value)
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6">
            {/* Header */}
            <div className="mb-2">
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
                    Filter Jobs
                </h1>
                <div className="mt-0 h-px bg-gradient-to-r from-purple-600 to-pink-600"></div>
            </div>

            {/* Filter Options */}
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                <div className="space-y-6">
                    {filterData.map((item, index) => (
                        <div key={index} className="space-y-3">
                            {/* Filter Category Header */}
                            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                {item.filterType}
                            </h2>

                            {/* Filter Options */}
                            <div className="space-y-2">
                                {item.array.map((itemData, idx) => {
                                    const itemId = `r${index}-${idx}`
                                    return (
                                        <div
                                            key={idx}
                                            className="flex items-center space-x-1 p-0 rounded-sm hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 transition-all duration-300"
                                        >
                                            <RadioGroupItem
                                                value={itemData}
                                                id={itemId}
                                                className="border-2 border-slate-300 dark:border-slate-600 data-[state=checked]:border-purple-600 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-pink-600"
                                            />
                                            <Label
                                                htmlFor={itemId}
                                                className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                                            >
                                                {itemData}
                                            </Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </RadioGroup>

            {/* Clear Filter Button */}
            {selectedValue && (
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <button
                        onClick={() => setSelectedValue("")}
                        className="w-full px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200"
                    >
                        Clear Filter
                    </button>
                </div>
            )}
        </div>
    )
}

export default FilterCard