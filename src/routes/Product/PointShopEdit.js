import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Button, Form, Input, Switch, Select } from 'antd'
import queryString from 'query-string'

import api from "../../apis/apiPoints"

import PageLayout from '../../components/layout/PageLayout'

const PointShopEdit = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const queryValues = queryString.parse(search);
    const [form] = Form.useForm();
    const queryClient = useQueryClient();

    const [valueBigCate, setValueBigCate] = useState("");
    const [valueSmallCate, setValueSmallCate] = useState("");
    const [curSmallCatePoint, setCurSmallCatePoint] = useState([])
    const [curPointShopValue, setCurPointShopValue] = useState({})
    const singlePointShop = useQuery([`singlePointShop${queryValues.id}`, queryValues.id],
        () => { return api.fetchGetPointShopById(queryValues.id) },
        {
            onSuccess: (data) => {
                setCurPointShopValue(data);
                setValueBigCate(data.bigCategory);
                setValueSmallCate(data.smallCategory);
                form.setFieldsValue(data)
            }
        })

    const categories = useQuery("pointsCategory", api.fetchGetCategory, {
        enabled: !!singlePointShop.data,
        onSuccess: (data) => {
            setCurSmallCatePoint(data.find(item => item.value === singlePointShop.data.bigCategory).smallCategory)
        }
    });
    const mutationPatchPointShop = useMutation((content) => api.fetchPatchPointShop(content), {
        onSuccess: () => {
            queryClient.invalidateQueries(`singlePointShop${queryValues.id}`)
            queryClient.invalidateQueries("pointShops")
            alert("Edit PointShop Successful");
            navigate("/points/shop-list")
        }
    })

    const onSubmitPatchPointShop = () => {
        mutationPatchPointShop.mutate(curPointShopValue);

    }
    const onChangeBigCate = (value) => {
        setValueBigCate(value)
        setCurPointShopValue({ ...curPointShopValue, bigCategory: value })
        setCurSmallCatePoint(categories.data.find(item => item.value === value).smallCategory)
        setValueSmallCate("")
    }
    if (!singlePointShop.isLoading)
        return (
            <PageLayout pageTitle={"포인트샵 수정"}>
                <div style={{ width: "100% " }}>
                    <Form form={form} initialValues={curPointShopValue} layout='vertical' onFinish={onSubmitPatchPointShop}>
                        <Form.Item label="대분류"
                            shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}>
                            <Select
                                value={valueBigCate}
                                name="bigCategory"
                                options={categories.data}
                                onChange={onChangeBigCate} />
                        </Form.Item>
                        <Form.Item label="소분류"
                            shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}>
                            <Select
                                name="smallCategory"
                                value={valueSmallCate}
                                options={curSmallCatePoint}
                                onChange={(value) => {
                                    setValueSmallCate(value);
                                    setCurPointShopValue({ ...curPointShopValue, smallCategory: value })
                                }} />
                        </Form.Item>
                        <Form.Item
                            shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                            name="brandCode"
                            label="브랜드 코드"
                        >
                            <Input disabled
                                onChange={(e) => {
                                    setCurPointShopValue({ ...curPointShopValue, brandCode: e.target.value })
                                }} />
                        </Form.Item>
                        <Form.Item
                            shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                            name="brandName"
                            label="브랜드 이름">
                            <Input
                                onChange={(e) => {
                                    setCurPointShopValue({ ...curPointShopValue, brandName: e.target.value })
                                }} />
                        </Form.Item>
                        {/*//TODO: Image file insert later need discussion */}
                        <Form.Item
                            name="popular"
                            label="인기 브랜드 유무">
                            <Switch
                                checked={curPointShopValue.popular}
                                onChange={(check) => {
                                    setCurPointShopValue({ ...curPointShopValue, popular: check })
                                }} />
                        </Form.Item>
                        <Form.Item
                            name="status"
                            label="브랜드 사용 유무">
                            <Switch
                                checked={curPointShopValue.status}
                                onChange={(check) => {
                                    setCurPointShopValue({ ...curPointShopValue, status: check })
                                }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button style={{ marginLeft: 10 }} danger type="dashed"
                                onClick={() => navigate("/points/shop-list")} >
                                cancel
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </PageLayout>
        )
}

export default PointShopEdit