import React from 'react'
import { Table, Space, Button, Modal, Form, Switch, Input, InputNumber, Select } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import api from "../../apis/apiBoard"

import PageLayout from '../../components/layout/PageLayout'

const FAQList = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const faqList = useQuery(["FAQ", "FAQ"], () => { return api.fetchGetBoardTypeList("FAQ") });
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
                    <Button onClick={() => { navigate(`/board/faq-edit?id=${record.id}`) }}>Edit</Button>
                    <Button danger onClick={() => { onClickDeleteFAQ(record) }}>Delete</Button>
                </Space>
            }
        }
    ]
    const mutationDeleteFAQ = useMutation((id) => api.fetchDeleteBoardTypeById("FAQ", id), {
        onSuccess: () => {
            queryClient.invalidateQueries("FAQ")
        }
    })

    const onClickDeleteFAQ = (record) => {
        let deleteFAQConfirm = confirm("Sure to delete FAQ?")
        if (deleteFAQConfirm) {
            return mutationDeleteFAQ.mutate(record.id)
        }

    }


    if (!faqList.isLoading)
        return (
            <PageLayout pageTitle={"FAQ 목록"} >

                <div style={{ width: "100%" }} className='btn-control'>
                    <Button type="primary" onClick={() => { navigate("/board/faq-new") }}>Add New FAQ</Button>
                </div>
                <div style={{ width: "100%" }}>
                    <Table columns={actionTab} dataSource={faqList.data?.map((item, idx) => { return { ...item, key: idx } })} />
                </div>
            </PageLayout>
        )
}

export default FAQList