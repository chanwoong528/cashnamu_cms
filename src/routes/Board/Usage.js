import React, { useState, useEffect } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Button, Form, } from 'antd';

import api from "../../apis/apiBoard"

import { useQuill } from "react-quilljs";
import QuillEditor from '../../components/Elements/Form/QuillEditor'
import PageLayout from '../../components/layout/PageLayout'

const Usage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [usageContext, setUsageContext] = useState({})
    const [htmlContent, setHtmlContent] = useState("");
    const [form] = Form.useForm();

    const { quill, quillRef } = useQuill();

    const termsUsage = useQuery("usage", () => api.fetchGetBoardTypeById("usage", 0), {
        onSuccess: (data) => {
            setUsageContext(data);
            setHtmlContent(data.content)
        },
        cacheTime: 0
    })
    const mutationPatchUsage = useMutation((content) => api.fetchPatchBoardTypeById("usage", content), {
        onSuccess: () => {
            queryClient.invalidateQueries("usage")
            alert("Edit Usage Successful");
            navigate("/board/terms-usage")
        }
    })

    useEffect(() => {
        setUsageContext({ ...usageContext, content: htmlContent })
    }, [htmlContent])


    const onSubmitEditUsage = (formValue) => {
        mutationPatchUsage.mutate(usageContext)
    }
    if (!termsUsage.isLoading)
        return (
            <PageLayout pageTitle={"이용약관"}>
                <div style={{ width: "100%" }}>
                    <Form form={form} layout='vertical' onFinish={onSubmitEditUsage}>
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
            </PageLayout >
        )
}

export default Usage