import React, { useState } from 'react'
import { Button, Form, Switch, Input, Select } from 'antd'
import { useQuery, useMutation, useQueryClient, } from 'react-query'

import api from "../../apis/apiMerchant"
import { MerchantStatusList } from '../../common/ActionTabsConfig'



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
            alert("New Merchant Created.")
            queryClient.invalidateQueries("merchants")
        }
    })
    const onSubmitAddMerchant = async (formValue) => {
        setCurMerchantValues({ ...curMerchantValues, ...formValue })

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
                <h2>????????? ??????</h2>
            </header>
            <div style={{ width: "100%" }}>
                <Form initialValues={curMerchantValues} layout='vertical' onFinish={onSubmitAddMerchant}>
                    <Form.Item label="?????????"
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}>
                        <Select
                            name="bigCategory"
                            defaultValue={"shopping"}
                            options={categories.data} onChange={(value) => {
                                const target = categories.data.filter((big) => big.value === value)
                                setCurBigCate(...categories.data.filter((big) => big.value === value))
                                setCurSmallCate(target[0].smallCategory)
                                setCurMerchantValues({ ...curMerchantValues, bigCategory: value })
                            }} />
                    </Form.Item>
                    <Form.Item label="?????????"
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}>
                        <Select
                            name="smallCategory"
                            value={curSmallCate}
                            options={curSmallCate}
                            onChange={(value) => {
                                setCurMerchantValues({ ...curMerchantValues, smallCategory: value })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="logoImgUrl"
                        label="?????? ?????? ??????">
                        <Input onChange={(e) => {
                            setCurMerchantValues({ ...curMerchantValues, logoImgUrl: e.target.value })
                        }} />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="siteName"
                        label="????????? ??????">
                        <Input onChange={(e) => {
                            setCurMerchantValues({ ...curMerchantValues, siteName: e.target.value })
                        }} />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="siteUrl"
                        label="????????? ??????">
                        <Input onChange={(e) => {
                            setCurMerchantValues({ ...curMerchantValues, siteUrl: e.target.value })
                        }} />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="popular"
                        label="???????????? ??????">
                        <Switch defaultChecked={false}
                            onChange={(check) => {
                                setCurMerchantValues({ ...curMerchantValues, popular: check })
                            }} />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="status"
                        label="????????? ????????????">
                        <Select
                            onChange={(status) => {
                                setCurMerchantValues({ ...curMerchantValues, status: status })
                            }}
                            options={MerchantStatusList} />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="siteInfo"
                        label="????????? ??????">
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
                        label="????????????">
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