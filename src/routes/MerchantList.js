import React, { useState } from 'react'
import { Table, Space, Button, Modal, Form, Switch, Input, InputNumber, Select } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

import api from "../apis/apiMerchant"
const MerchantList = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const merchantsList = useQuery("merchants", api.fetchGetMerchantsList)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const merchantEditMobile = useMutation(api.fetchPatchMerchantById, {
        onSuccess: () => {
            queryClient.invalidateQueries("merchants")
        }
    })

    const actionTab = [
        {
            "key": "id",
            "title": "ID",
            "dataIndex": "id"
        },
        {
            "key": "siteName",
            "title": "siteName",
            "dataIndex": "siteName"
        }, {
            "key": "views",
            "title": "views",
            "dataIndex": "views"
        }, {
            "key": "commission",
            "title": "commission",
            "dataIndex": "commission"
        }, {
            "key": "mobile",
            "title": "mobile",
            "dataIndex": "mobile",
            render: (bool) => bool ? "Y" : "N",

        }, {
            "key": "deepLink",
            "title": "deepLink",
            "dataIndex": "deepLink",
            render: (bool) => bool ? "Y" : "N",
        }, {
            "key": "popular",
            "title": "popular",
            "dataIndex": "popular",
            render: (bool, record) => {
                return <Switch checked={bool} onChange={(checked) => {
                    merchantEditMobile.mutate({ ...record, popular: checked })
                }} />
            }
        }, {
            "key": "status",
            "title": "status",
            "dataIndex": "status",

            render: (status, record) => {
                return (
                    <Select
                        defaultValue={status}
                        onChange={(status) => {
                            console.log(status)
                            merchantEditMobile.mutate({ ...record, status: status })
                        }}
                        options={
                            [{
                                value: "available",
                                label: "사용가능",
                            },
                            {
                                value: "unavailable",
                                label: "사용불가",
                            },
                            {
                                value: "pending",
                                label: "승인대기",
                            },
                            {
                                value: "permit",
                                label: "승인가능",
                            }
                            ]} />)
            }
        },

        {
            "key": "createdDate",
            "title": "createdDate",
            "dataIndex": "createdDate"
        }, {
            "key": "updatedDate",
            "title": "updatedDate",
            "dataIndex": "updatedDate"
        },
    ]

    const onSelectChange = (newSelectedRowKeys, record) => {

        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        console.log(record)//here you can get all the records. 
        setSelectedRowKeys(newSelectedRowKeys);
    }; const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return (
        <main className='page'>
            <div style={{ width: "100%" }} className='btn-control'>
                <Button onClick={() => { navigate("/merchants/new") }}>Add New Merchant</Button>
            </div>

            <div style={{ width: "100%" }}>
                <Table rowSelection={rowSelection} columns={actionTab} dataSource={merchantsList.data?.map((item, idx) => { return { ...item, key: idx } })} />
            </div>
        </main>
    )
}

export default MerchantList