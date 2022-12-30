import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient, } from 'react-query'
import { Button, Form, Input, Select, } from 'antd';
import { useNavigate, } from 'react-router-dom'

import { useQuill } from "react-quilljs";
import QuillEditor from '../../components/Elements/Form/QuillEditor'

import api from "../../apis/apiBoard"
import PageLayout from '../../components/layout/PageLayout';

const FAQAdd = () => {
    const { quill, quillRef } = useQuill();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [form] = Form.useForm();

    const [htmlContent, setHtmlContent] = useState("");
    const [FAQContext, setFAQContext] = useState({ category: "", title: "", content: "", createdDate: "" });

    useEffect(() => {
        setFAQContext({ ...FAQContext, content: htmlContent })
    }, [htmlContent])

    const FAQCate = useQuery("FAQCategory", api.fetchGetFAQCategory);
    const mutationPostFAQ = useMutation((content) => api.fetchPostBoardType("FAQ", content), {
        onSuccess: () => {
            alert("New FAQ Created");
            queryClient.invalidateQueries("FAQ");
            navigate("/board/faq")

        }
    })
    const onSubmitAddFAQ = (formValue) => {
        const dateNow = new Intl.DateTimeFormat("ko-KR").format(new Date());
        mutationPostFAQ.mutate({ ...FAQContext, createdDate: dateNow })

    }

    if (!FAQCate.isLoading)
        return (
            <PageLayout pageTitle={"FAQ 등록"} >
                <div style={{ width: "100%" }}>
                    <Form form={form} initialValues={FAQContext} layout='vertical' onFinish={onSubmitAddFAQ}>
                        <Form.Item label="분류"
                            shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}>
                            <Select
                                value={FAQContext.category}
                                name="category"
                                options={FAQCate.data}
                                onChange={(value) => { setFAQContext({ ...FAQContext, category: value }) }} />
                        </Form.Item>
                        <Form.Item
                            shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional} name="title"
                            label="제목" >
                            <Input onChange={(e) => { setFAQContext({ ...FAQContext, title: e.target.value }) }} />
                        </Form.Item>
                        <Form.Item shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}>
                            <QuillEditor setHtmlContent={setHtmlContent} quill={quill} ref={quillRef} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button type="primary" danger style={{ marginLeft: 10 }} onClick={() => { navigate(-1) }}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </PageLayout>
        )
}

export default FAQAdd