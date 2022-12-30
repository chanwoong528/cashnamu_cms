import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient, } from 'react-query'
import { Button, Form, Input, Select, } from 'antd';
import { useNavigate, } from 'react-router-dom'

import { useQuill } from "react-quilljs";
import QuillEditor from '../../components/Elements/Form/QuillEditor'

import PageLayout from '../../components/layout/PageLayout'

import api from "../../apis/apiBoard"

const NoticeAdd = () => {
    const { quill, quillRef } = useQuill();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [form] = Form.useForm();


    const [htmlContent, setHtmlContent] = useState("");
    const [noticeContext, setNoticeContext] = useState({ category: "", title: "", content: "", createdDate: "" });
    useEffect(() => {
        setNoticeContext({ ...noticeContext, content: htmlContent })
    }, [htmlContent])
    const mutationPostNotice = useMutation((content) => api.fetchPostBoardType("notice", content), {
        onSuccess: () => {
            alert("New FAQ Created");
            queryClient.invalidateQueries("notice");
            navigate("/board/notice")

        }
    })
    const onSubmitAddNotice = (formValue) => {
        const dateNow = new Intl.DateTimeFormat("ko-KR").format(new Date());
        mutationPostNotice.mutate({ ...noticeContext, createdDate: dateNow })

    }
    return (
        <PageLayout pageTitle={"공지사항 등록"} >
            <div style={{ width: "100%" }}>
                <Form form={form} initialValues={noticeContext} layout='vertical' onFinish={onSubmitAddNotice}>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional} name="title"
                        label="제목" >
                        <Input onChange={(e) => { setNoticeContext({ ...noticeContext, title: e.target.value }) }} />
                    </Form.Item>
                    <Form.Item shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}>
                        <QuillEditor setHtmlContent={setHtmlContent} quill={quill} ref={quillRef} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </PageLayout>
    )
}

export default NoticeAdd