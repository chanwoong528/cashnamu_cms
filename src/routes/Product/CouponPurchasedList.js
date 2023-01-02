import React, { useState } from 'react'
import { Table, Space, Button, Modal, Form, Switch, Input, InputNumber, Select } from 'antd'
import PageLayout from '../../components/layout/PageLayout'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import api from "../../apis/apiPoints"

import { BoughtCouponListActionTab } from '../../common/ActionTabsConfig'

const CouponPurchasedList = () => {

    const boughtCouponList = useQuery("boughtCoupon", api.fetchGetBoughtCouponList);
    const [searchTerm, setSearchTerm] = useState({})
    const [searchCate, setSearchCate] = useState("")
    const [textInput, setTextInput] = useState("")
    const onSubmitSearchTerm = () => {
        setSearchTerm({ ...searchTerm, [searchCate]: textInput })
        console.log(searchTerm)
    }
    // const mutationCouponListByTerm = useMutation((term) => { return api.})



    return (


        <PageLayout pageTitle={"쿠폰 구매 내역 목록"}>
            <div className='search-control'>
                <Form layout='inline' onFinish={onSubmitSearchTerm} >
                    <Form.Item>
                        <Select
                            style={{ width: 150 }}
                            placeholder={"쿠폰 사용 유무"}
                            options={[
                                { label: "사용함", value: "used" }, { label: "사용 안함", value: "available" }
                            ]}
                            onChange={(value) => {
                                setSearchTerm({ ...searchTerm, status: value })
                            }
                            } />
                    </Form.Item>
                    <Form.Item>
                        <Select
                            style={{ width: 150 }}
                            options={[
                                { label: '쿠폰 번호', value: 'couponNumber', },
                                { label: '브랜드 명', value: 'brand', },
                                { label: '유저 이메일', value: 'purchasedEmail', },
                                { label: '상품 명', value: 'itemName', },
                            ]}
                            onChange={(value) => {
                                setSearchCate(value)
                            }
                            } />
                    </Form.Item>
                    <Form.Item>
                        <Input disabled={!searchCate}
                            onChange={(e) => {
                                setSearchTerm({ [searchCate]: e.target.value })
                            }} />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType="submit" >Search</Button>
                    </Form.Item>
                </Form>
            </div>
            <div style={{ width: "100%" }}>
                <Table columns={BoughtCouponListActionTab} dataSource={boughtCouponList.data ? boughtCouponList.data.map((item, idx) => { return { ...item, key: idx } }) : []} />
            </div>

        </PageLayout>
    )
}

export default CouponPurchasedList