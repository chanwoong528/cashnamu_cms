import React, { useState } from 'react'
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import api from "../../../apis/apiMenus"

import { Menu } from 'antd';

const MainNav = () => {

    const { isLoading, isError, data, error } = useQuery("menus", api.fetchGetMenusCMS,)
    const navigate = useNavigate();
    const onClickMenu = (e) => {
        navigate(e.item.props.url)
    }




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
}

export default MainNav