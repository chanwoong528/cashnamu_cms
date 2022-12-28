import React from 'react'
import { Table, Space, Button, Modal, Form, Switch, Input, InputNumber, Select } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

import api from "../../apis/apiBoard";

const NoticeList = () => {
    const navigate = useNavigate();
    const noticeList = useQuery(["notice", "notice"], () => api.fetchGetBoardTypeList("notice"))
    const actionTab = [
        {
            "key": "id",
            "title": "ID",
            "dataIndex": "id"
        },
        {
            "key": "title",
            "title": "title",
            "dataIndex": "title"
        },
        {
            "key": "createdDate",
            "title": "createdDate",
            "dataIndex": "createdDate"
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => {

                return <Space size="middle">
                    <Button onClick={() => { navigate(`/board/notice-edit?id=${record.id}`) }}>Edit</Button>
                    <Button danger onClick={() => { onClickDeleteFAQ(record) }}>Delete</Button>
                </Space>
            }
        }
    ]


    return (
        <main className='page'>
            <div style={{ width: "100%" }} className='btn-control'>
                <Button type="primary" onClick={() => { navigate("/board/notice-new") }}>Add New Notice</Button>
            </div>
            <div style={{ width: "100%" }}>
                <Table columns={actionTab} dataSource={noticeList.data?.map((item, idx) => { return { ...item, key: idx } })} />
            </div>
        </main>
    )
}

export default NoticeList