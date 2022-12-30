import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Button, Form, Input, } from 'antd';
import queryString from 'query-string'

import api from "../../apis/apiBoard"

import { useQuill } from "react-quilljs";
import QuillEditor from '../../components/Elements/Form/QuillEditor'

import PageLayout from '../../components/layout/PageLayout'
const NoticeEdit = () => {

    const { search } = useLocation();
    const navigate = useNavigate();
    const queryValues = queryString.parse(search);

    const { quill, quillRef } = useQuill();

    const [form] = Form.useForm();
    const [htmlContent, setHtmlContent] = useState("");
    const [noticeContext, setNoticeContext] = useState();
    const queryClient = useQueryClient();
    useEffect(() => {
        setNoticeContext({ ...noticeContext, content: htmlContent })
    }, [htmlContent])

    const singleNotice = useQuery([`singleNotice${queryValues.id}`, queryValues.id], () => {
        return api.fetchGetBoardTypeById("notice", queryValues.id)
    }, {
        onSuccess: (data) => {
            setNoticeContext(data);
            setHtmlContent(data.content)
        },
        cacheTime: 0
    });
    const mutationPatchNotice = useMutation((content) => api.fetchPatchBoardTypeById("notice", content), {
        onSuccess: () => {
            queryClient.invalidateQueries(`singleNotice${queryValues.id}`)
            queryClient.invalidateQueries("notice")
            alert("Edit Notice Successful");
            navigate("/board/notice")
        }
    })

    const onSubmitEditNotice = (formValue) => {
        mutationPatchNotice.mutate({ ...noticeContext })
    }
    if (!singleNotice.isLoading)
        return (
            <PageLayout pageTitle={"공지사항 수정"} >
                <div style={{ width: "100%" }}>
                    <Form form={form} initialValues={noticeContext} layout='vertical' onFinish={onSubmitEditNotice}>
                        <Form.Item
                            shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional} name="title"
                            label="제목" >
                            <Input onChange={(e) => { setNoticeContext({ ...noticeContext, title: e.target.value }) }} />
                        </Form.Item>
                        <Form.Item shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}>
                            <QuillEditor setHtmlContent={setHtmlContent} htmlContent={htmlContent} quill={quill} ref={quillRef} />
                        </Form.Item>
                        <Form.Item >
                            <Button htmlType="submit">
                                Edit
                            </Button>
                            <Button danger style={{ marginLeft: 10 }} onClick={() => { navigate(-1) }}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </PageLayout>
        )
}

export default NoticeEdit