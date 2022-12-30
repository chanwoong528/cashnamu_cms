import React, { useState, useEffect } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Button, Form, } from 'antd';

import api from "../../apis/apiBoard"

import { useQuill } from "react-quilljs";
import QuillEditor from '../../components/Elements/Form/QuillEditor'
import PageLayout from '../../components/layout/PageLayout'

const Privacy = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [privacyContext, setPrivacyContext] = useState({})
    const [htmlContent, setHtmlContent] = useState("");
    const [form] = Form.useForm();

    const { quill, quillRef } = useQuill();

    const termsPrivacy = useQuery("privacy", () => api.fetchGetBoardTypeById("privacy", 0), {
        onSuccess: (data) => {
            setPrivacyContext(data);
            setHtmlContent(data.content)
        },
        cacheTime: 0
    })
    const mutationPatchPrivacy = useMutation((content) => api.fetchPatchBoardTypeById("privacy", content), {
        onSuccess: () => {
            queryClient.invalidateQueries("privacy")
            alert("Edit Privacy Successful");
            navigate("/board/terms-privacy")
        }
    })

    useEffect(() => {
        setPrivacyContext({ ...privacyContext, content: htmlContent })
    }, [htmlContent])

    const onSubmitEditPrivacy = (formValue) => {
        mutationPatchPrivacy.mutate(privacyContext)
    }
    if (!termsPrivacy.isLoading)
        return (
            <PageLayout pageTitle={"개인정보 이용방침"}>
                <div style={{ width: "100%" }}>
                    <Form form={form} layout='vertical' onFinish={onSubmitEditPrivacy}>
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

export default Privacy