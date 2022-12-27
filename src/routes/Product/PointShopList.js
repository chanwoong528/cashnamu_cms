import React from 'react'
import { Table, Space, Button, Modal, Form, Switch, Input, InputNumber, Select } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

import api from "../../apis/apiPoints"

const PointShopList = () => {
    const navigate = useNavigate();
    const pointShopList = useQuery("pointShops", api.fetchGetPointShopList)
    const actionTab = [
        {
            "key": "id",
            "title": "ID",
            "dataIndex": "id"
        },
        {
            "key": "bigCategory",
            "title": "1차 카테고리",
            "dataIndex": "bigCategory"
        }, {
            "key": "smallCategory",
            "title": "2차 카테고리",
            "dataIndex": "smallCategory"
        },
        , {
            "key": "brandCode",
            "title": "브랜드 코드",
            "dataIndex": "brandCode"
        }, {
            "key": "brandName",
            "title": "브랜드 이름",
            "dataIndex": "brandName"
        },
        {
            "key": "createdDate",
            "title": "등록 날짜",
            "dataIndex": "createdDate"
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => {
                return <Space size="middle">
                    <Button onClick={() => { onClickGiveAuthRow(record) }}>Edit</Button>
                    <Button type='primary' onClick={() => { onClickDeleteRow(record) }}>회사 상품 목록</Button>
                </Space>
            }
        }
    ]


    return (
        <main className='page'>
            <div style={{ width: "100%" }} className='btn-control'>
                <Button type="primary" onClick={() => { navigate("/points/new") }}>Add New Point Shop</Button>
            </div>
            <div style={{ width: "100%" }}>
                <Table columns={actionTab} dataSource={pointShopList.data?.map((item, idx) => { return { ...item, key: idx } })} />
            </div>
        </main>
    )
}

export default PointShopList