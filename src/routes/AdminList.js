import React, { useState } from 'react'
import { Table, Space, Button, Modal, Form, Input, Switch } from 'antd'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import api from "../apis/apiAdmin"

const AdminList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [curAdmin, setCurAdmin] = useState({});
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const { isLoading, isError, data, error } = useQuery(
        "adminUsers",
        api.fetchGetAdminList,
    )
    const mutationDeleteAdmin = useMutation(api.fetchPatchDeleteAdmin, {
        onSuccess: () => {
            queryClient.invalidateQueries("adminUsers")
        }
    })
    const mutationPatchAdmin = useMutation(api.fetchPatchAuthById, {
        onSuccess: () => {
            queryClient.invalidateQueries("adminUsers")
        }
    })
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
                    <Button onClick={() => { onClickGiveAuthRow(record) }}>Edit</Button>
                    <Button danger onClick={() => { onClickDeleteRow(record) }}>Delete</Button>
                </Space>
            }
        }
    ]

    const onClickGiveAuthRow = (record) => {
        const targetAdmin = data.find(admin => admin.id === record.id)
        setCurAdmin(targetAdmin)
        setIsModalOpen(true)
    }
    const onClickDeleteRow = async (record) => {
        let deleteConfirm = confirm("Sure to delete Admin?")
        if (deleteConfirm) {
            return mutationDeleteAdmin.mutate(record.id)
        } else {
            return;
        }

    }
    const onSubmitSaveAdminData = async (record) => {
        mutationPatchAdmin.mutate({ ...record, id: curAdmin.id })


    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    return (
        <main>
            <div style={{ width: "100%", padding: "20px" }}>
                {!isLoading ?
                    <Table dataSource={data}
                        onRow={(row, rowIdx) => {
                            return {
                                onClick: (e) => {
                                    //    onClickRow(e, row)
                                }
                            }
                        }} columns={actionTab}
                        pagination={true} />
                    : null}
            </div>
            <Modal title="권한부여"
                open={isModalOpen}
                onOk={() => {
                    form.submit();
                    setIsModalOpen(false);
                }}
                onCancel={() => { setIsModalOpen(false); }}>
                <Form initialValues={curAdmin} form={form} onFinish={onSubmitSaveAdminData}>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="name"
                        label="name">
                        <Input />
                    </Form.Item>

                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="email"
                        label="email">
                        <Input />
                    </Form.Item>

                    {Object.keys(curAdmin).filter((key) => key.includes("auth")).map((formItem, idx) => {
                        return (
                            <Form.Item
                                key={idx}
                                shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                                name={formItem}
                                label={formItem}>
                                <Switch
                                    checked={curAdmin[formItem]}
                                    onChange={(checked) => {
                                        setCurAdmin({ ...curAdmin, [formItem]: checked })
                                    }} />
                            </Form.Item>)
                    })
                    }
                </Form>
            </Modal>
        </main >
    )
}

export default AdminList