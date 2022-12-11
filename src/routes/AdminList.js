import React from 'react'
import { Table, Space, Button } from 'antd'
import { useQuery } from 'react-query'

import api from "../apis/apiAdmin"

const AdminList = () => {

    const { isLoading, isError, data, error } = useQuery(
        "adminUsers",
        api.fetchGetAdminList,
    )
    const actionTab = [
        {
            "key": "id",
            "title": "ID",
            "dataIndex": "id"
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
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => {

                return <Space size="middle">
                    <Button onClick={() => { onClickGiveAuthRow(record) }}>give Auth</Button>
                    <Button danger onClick={() => { onClickEditDeleteRow(record) }}>edit/delete</Button>
                </Space>
            }
        }
    ]
    const onClickGiveAuthRow = async (record) => {
        console.log(record)

    }
    const onClickEditDeleteRow = async (record) => {
        console.log(record)
        api.fetchPostDeleteAdmin(record.id);
    }

    const onClickRow = async (
        e, row
    ) => {
        // console.log(e)
    }




    return (
        <main>
            <div style={{ width: "100%", padding: "20px" }}>
                {!isLoading ? <Table dataSource={data} onRow={
                    (row, rowIdx) => { return { onClick: (e) => { onClickRow(e, row) } } }
                } columns={
                    actionTab

                } pagination={true} /> : null}
            </div>
        </main>
    )
}

export default AdminList