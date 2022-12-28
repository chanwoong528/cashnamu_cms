import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Button, Form, Input, Select, } from 'antd';
import queryString from 'query-string'

import api from "../../apis/apiBoard"

import { useQuill } from "react-quilljs";
import QuillEditor from '../../components/Elements/Form/QuillEditor'
import "quill/dist/quill.snow.css";

const FAQEdit = () => {
    const { search } = useLocation();
    const navigate = useNavigate();

    const queryValues = queryString.parse(search);
    const { quill, quillRef } = useQuill();

    const [form] = Form.useForm();
    const [htmlContent, setHtmlContent] = useState("");
    const [FAQContext, setFAQContext] = useState({ category: "", title: "", content: "", createdDate: "" });

    const queryClient = useQueryClient();
    const FAQCate = useQuery("FAQCategory", api.fetchGetFAQCategory);
    const singleFAQ = useQuery([`singleFAQ${queryValues.id}`, queryValues.id], () => {
        return api.fetchGetBoardTypeById("FAQ", queryValues.id)
    }, {
        onSuccess: (data) => {
            setFAQContext(data);
            setHtmlContent(data.content)
        },
        cacheTime: 0
    });
    const mutationPatchFAQ = useMutation((content) => api.fetchPatchBoardTypeById("FAQ", content), {
        onSuccess: () => {
            queryClient.invalidateQueries(`singleFAQ${queryValues.id}`)
            queryClient.invalidateQueries("FAQ")
            alert("Edit FAQ Successful");
            navigate("/board/faq")
        }
    })
    useEffect(() => {
        setFAQContext({ ...FAQContext, content: htmlContent })
    }, [htmlContent])

    const onSubmitEditFAQ = (formValue) => {
        mutationPatchFAQ.mutate({ ...FAQContext })
    }
    if (!singleFAQ.isLoading)
        return (
            <main className='page'>
                <div style={{ width: "100%" }}>
                    <Form form={form} initialValues={FAQContext} layout='vertical' onFinish={onSubmitEditFAQ}>
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
                            <QuillEditor setHtmlContent={setHtmlContent} htmlContent={htmlContent} quill={quill} ref={quillRef} />
                        </Form.Item>
                        <Form.Item >
                            <Button htmlType="submit">
                                Edit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </main>
        )
}

export default FAQEdit