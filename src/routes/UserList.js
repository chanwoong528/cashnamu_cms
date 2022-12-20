import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Table, Space, Button, Modal, Form, Switch, Input } from 'antd'

import api from "../apis/apiUser"

const UserList = () => {
    const queryClient = useQueryClient();
    const { status, data, error } = useQuery(
        "users",
        api.fetchGetUserList,
    )

    if (status.loading) {
        return <div>loading</div>

    }
    const actionTab = [
        {
            "key": "id",
            "title": "ID",
            "dataIndex": "id"
        },
        {
            "key": "type",
            "title": "회원구분",
            "dataIndex": "type"
        },
        {
            "key": "name",
            "title": "Name",
            "dataIndex": "name"
        },
        {
            "key": "email",
            "title": "Email",
            "dataIndex": "email"
        }, {
            "key": "points",
            "title": "Points",
            "dataIndex": "points"
        }, {
            "key": "createdDate",
            "title": "가입날짜",
            "dataIndex": "createdDate"
        }, {
            title: 'Action',
            key: 'action',
            render: (record) => {

                return <Space size="middle">
                    <Button onClick={() => { onClickEditUser(record) }}>Edit</Button>
                    <Button danger onClick={() => { onClickDeleteUser(record) }}>Delete</Button>
                </Space>
            }
        }
    ]
    const onClickEditUser = async (record) => {

    }
    const onClickDeleteUser = async (record) => {

    }

    return (
        <div style={{ width: "100%", padding: "20px" }}>{
            !status.loading ?
                <Table dataSource={data}
                    columns={actionTab}
                /> : null
        }</div>
    )
}

export default UserList