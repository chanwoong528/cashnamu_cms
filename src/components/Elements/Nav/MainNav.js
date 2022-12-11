import React, { useState } from 'react'
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import api from "../../../apis/apiMenus"


import { Menu } from 'antd';

import SubNav from './SubNav';

const MainNav = () => {

    const { isLoading, isError, data, error } = useQuery(

        "menus",
        api.fetchGetMenusCMS,
    )
    const navigate = useNavigate();
    const onClickMenu = (e) => {
        console.log(e.keyPath)
        navigate(e.item.props.url)
    }
    console.log(data)
    // key: "sub1"
    // icon: Object
    // children: Array(2)
    // label: "Navigation One"
    // type: undefined


    if (!isLoading) {
        console.log(data.map(item => {
            return {
                key: `main${item.id}`,
                label: item.title,
                children: item.subMenu.map((sub) => {
                    return { key: sub.id, label: sub.sub_title, url: sub.url }
                })
            }
        }))
        return (

            <Menu
                onClick={onClickMenu}
                style={{ width: 256 }}
                defaultSelectedKeys={['main00']}
                defaultOpenKeys={['main0']}
                mode="inline"
                items={
                    data.map(item => {
                        return {
                            key: `main${item.id}`,
                            label: item.title,
                            children: item.subMenu.map((sub) => {
                                return { key: `main${item.id}${sub.id}`, label: sub.sub_title, url: sub.url }
                            })
                        }
                    })}
            />
        )
    }


    // <nav className='xl:rounded-r transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 bg-gray-900 flex-col'>
    //     <ul className='flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full '>
    //         {!isLoading ?
    //             data.map((navIt, idx) => {
    //                 return <li>
    //                     <button onClick={() => { setCurSubIdx(idx) }} className='focus:outline-none focus:text-indigo-400  text-white flex justify-between items-center w-full text-center py-5 '>
    //                         {navIt.title}
    //                     </button>
    //                     {idx === curSubIdx ? <ul>
    //                         {
    //                             navIt.subMenu.map((subNavIt, subidx) => {
    //                                 return <SubNav sub_title={subNavIt.sub_title} url={subNavIt.url} />
    //                             })
    //                         }
    //                     </ul> : null
    //                     }


    //                 </li>
    //             }
    //             ) : null
    //         }


    //     </ul>


    // </nav>

}

export default MainNav