import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from "react-query";




const SubNav = ({ sub_title, url }) => {
    const [status, setStatus] = useState(false);
    const { isLoading, isError, data, error } = useQuery(
        "subtoggle",
        setStatus
    )

    return (
        <li className='flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52'>
            < Link to={url} >
                <h3>
                    {sub_title}
                </h3>
            </Link >
        </li >
    )
}

export default SubNav