import React, { useEffect, useState } from 'react'

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
    
    // Mock dispatch function for demonstration
    const dispatch = (action) => {
        console.log('Dispatching action:', action)
    }

    console.log(selectedValue)

    const changeHandler = (value) => {
        setSelectedValue(value)
    }

    useEffect(() => {
        dispatch({ type: 'setSearchedQuery', payload: selectedValue })
    }, [selectedValue])

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Filter Jobs
                </h1>
                <div className="mt-2 h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>

            {/* Filter Options */}
            <div className="space-y-6">
                {filterData.map((item, index) => (
                    <div key={index} className="space-y-3">
                        {/* Filter Category Header */}
                        <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                            {item.filterType}
                        </h2>

                        {/* Filter Options */}
                        <div className="space-y-2">
                            {item.array.map((itemData, idx) => {
                                const itemId = `r${index}-${idx}`
                                const isSelected = selectedValue === itemData
                                return (
                                    <div
                                        key={idx}
                                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                    >
                                        <input
                                            type="radio"
                                            value={itemData}
                                            id={itemId}
                                            checked={isSelected}
                                            onChange={(e) => changeHandler(e.target.value)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                                        />
                                        <label
                                            htmlFor={itemId}
                                            className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer flex-1"
                                        >
                                            {itemData}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Clear Filter Button */}
            {selectedValue && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setSelectedValue("")}
                        className="w-full px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                    >
                        Clear Filter
                    </button>
                </div>
            )}
        </div>
    )
}

export default FilterCard