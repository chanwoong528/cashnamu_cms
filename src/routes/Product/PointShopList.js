import React from 'react'
import { Table, Space, Button, Modal, Form, Switch, Input, InputNumber, Select } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { PointShopActionTab } from '../../common/ActionTabsConfig'

import api from "../../apis/apiPoints"
import PageLayout from '../../components/layout/PageLayout'

const PointShopList = () => {
    const navigate = useNavigate();
    const pointShopList = useQuery("pointShops", api.fetchGetPointShopList)
    const actionTab = [
        ...PointShopActionTab,
        {
            title: 'Action',
            key: 'action',
            render: (record) => {
                return <Space size="middle">
                    <Button onClick={() => { navigate(`/points/edit?id=${record.id}`) }}>Edit</Button>
                    <Button type='primary' onClick={() => {
                        return navigate(`/points/item-list?brandCode=${record.brandCode}`)
                    }}>회사 상품 목록</Button>
                </Space>
            }
        }
    ]

    if (!pointShopList.isLoading)
        return (
            <PageLayout pageTitle={"포인트 샵 목록"}>
                <div style={{ width: "100%" }} className='btn-control'>
                    <Button type="primary" onClick={() => { navigate("/points/new") }}>Add New Point Shop</Button>
                </div>
                <div style={{ width: "100%" }}>
                    <Table columns={actionTab} dataSource={pointShopList.data?.map((item, idx) => { return { ...item, key: idx } })} />
                </div>
            </PageLayout>
        )
}

export default PointShopList