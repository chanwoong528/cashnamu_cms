import React, { useState, useEffect } from 'react'
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import api from "../../../apis/apiMenus"

import { Menu } from 'antd';

const MainNav = () => {
    const [currentOpen, setCurrentOpen] = useState(location.pathname[0])
    const [current, setCurrent] = useState(location.pathname)
    const { isLoading, isError, data, error } = useQuery("menus", api.fetchGetMenusCMS,)
    const navigate = useNavigate();
    useEffect(() => {
        setCurrent(location.pathname)
        setCurrentOpen(`/${location.pathname.split("/")[1]}`)

    }, [])

    const onClickMenu = (e) => {
        setCurrent(location.pathname)
        navigate(e.item.props.url)
    }


    if (!isLoading) {
        return (
            <nav className='main-nav'>
                <Menu
                    onClick={onClickMenu}
                    style={{ width: 256 }}
                    // selectedKeys={[current]}
                    defaultSelectedKeys={[current]}
                    defaultOpenKeys={[currentOpen]}
                    mode="inline"
                    items={
                        data.map(item => {
                            return {
                                key: `${item.url}`,
                                label: item.title,
                                children: item.subMenu.map((sub) => {
                                    return {
                                        key: `${sub.url}`, label: sub.sub_title, url: sub.url
                                    }
                                })
                            }
                        })}
                />
            </nav>
        )
    }
}

export default MainNav