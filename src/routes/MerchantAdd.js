import React, { useState } from 'react'
import { Table, Space, Button, Modal, Form, Switch, Input, InputNumber, Select } from 'antd'
import { useQuery, useMutation, useQueryClient, } from 'react-query'

import api from "../apis/apiMerchant"
import Label from '../components/Elements/Form/Label'

const MerchantAdd = () => {
    const queryClient = useQueryClient()
    const [curBigCate, setCurBigCate] = useState([]);
    const [curSmallCate, setCurSmallCate] = useState([])
    const [curMerchantValues, setCurMerchantValues] = useState({
        bigCategory: "",
        smallCategory: "",
        logoImgUrl: "",
        merchantId: "",
        siteName: "",
        siteUrl: "",
        mobile: true,
        popular: false,
        deepLink: false,
        status: "available",
        siteInfo: "",
        siteCaution: "",
        commission: "",
        views: 0,
        createdDate: "",
        updatedDate: ""
    })
    const categories = useQuery("cate", api.fetchGetCategory, {
        onSuccess: (data) => {
            setCurBigCate(data[0])
            setCurSmallCate(data[0].smallCategory)
        }
    })
    const mutationPostMerchant = useMutation(api.fetchPostNewMerchant, {
        onSuccess: () => {
            queryClient.invalidateQueries("merchants")
            alert("New Merchant Created.")


        }
    })
    const onSubmitAddMerchant = async (formValue) => {
        setCurMerchantValues({ ...curMerchantValues, ...formValue })
        console.log("view: ", curMerchantValues)
        mutationPostMerchant.mutate(curMerchantValues);
        setCurMerchantValues({
            bigCategory: "",
            smallCategory: "",
            logoImgUrl: "",
            merchantId: "",
            siteName: "",
            siteUrl: "",
            mobile: true,
            popular: false,
            deepLink: false,
            status: "available",
            siteInfo: "",
            siteCaution: "",
            commission: "",
            views: 0,
            createdDate: "",
            updatedDate: ""
        })


    }




    return (
        <main className='page'>
            <header>
                <h2>머천트 등록</h2>
            </header>
            <div style={{ width: "100%" }}>
                <Form initialValues={curMerchantValues} layout='vertical' onFinish={onSubmitAddMerchant}>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="bigCategory"
                        label={<Label>{"대분류"}</Label>}
                    >
                        <Select
                            defaultValue={"shopping"}
                            options={categories.data} onChange={(value) => {
                                const target = categories.data.filter((big) => big.value === value)
                                setCurBigCate(...categories.data.filter((big) => big.value === value))
                                setCurSmallCate(target[0].smallCategory)
                                setCurMerchantValues({ ...curMerchantValues, bigCategory: value })
                            }} />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="smallCategory"
                        label="소분류"
                    >
                        <Select value={curSmallCate}
                            options={curSmallCate}
                            onChange={(value) => {
                                setCurMerchantValues({ ...curMerchantValues, smallCategory: value })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="logoImgUrl"
                        label="상품 로고 링크">
                        <Input onChange={(e) => {
                            setCurMerchantValues({ ...curMerchantValues, logoImgUrl: e.target.value })
                        }} />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="siteName"
                        label="사이트 이름">
                        <Input onChange={(e) => {
                            setCurMerchantValues({ ...curMerchantValues, siteName: e.target.value })
                        }} />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="siteUrl"
                        label="사이트 주소">
                        <Input onChange={(e) => {
                            setCurMerchantValues({ ...curMerchantValues, siteUrl: e.target.value })
                        }} />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="popular"
                        label="인기상품 등록">
                        <Switch defaultChecked={false}
                            onChange={(check) => {
                                setCurMerchantValues({ ...curMerchantValues, popular: check })
                            }} />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="status"
                        label="머천트 사용유무">
                        <Select

                            onChange={(status) => {
                                setCurMerchantValues({ ...curMerchantValues, status: status })
                            }}
                            options={
                                [{
                                    value: "available",
                                    label: "사용가능",
                                },
                                {
                                    value: "unavailable",
                                    label: "사용불가",
                                },
                                {
                                    value: "pending",
                                    label: "승인대기",
                                },
                                {
                                    value: "permit",
                                    label: "승인가능",
                                }
                                ]} />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="siteInfo"
                        label="브랜드 소개">
                        <Input.TextArea
                            style={{ height: 120, resize: 'none' }}
                            showCount
                            maxLength={500}
                            onChange={(e) => {
                                setCurMerchantValues({ ...curMerchantValues, siteInfo: e.target.value })
                            }} />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="siteCaution"
                        label="유의사항">
                        <Input.TextArea
                            style={{ height: 120, resize: 'none' }}
                            showCount
                            maxLength={500}
                            onChange={(e) => {
                                setCurMerchantValues({ ...curMerchantValues, siteCaution: e.target.value })
                            }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </main>
    )
}

export default MerchantAdd