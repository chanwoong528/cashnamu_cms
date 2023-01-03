import React, { useEffect } from 'react'
import { Table, Space, Button, Modal, Form, Switch, Input, InputNumber, Select } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import queryString from 'query-string'

import PageLayout from '../../components/layout/PageLayout'

import { PointItemActionTab } from '../../common/ActionTabsConfig'
import api from "../../apis/apiPoints";


const PointItemList = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const queryValues = queryString.parse(search);


    const queryClient = useQueryClient();
    useEffect(() => { queryClient.invalidateQueries("pointItemList") }, [search])


    const pointItemList = useQuery("pointItemList", () => {
        if (queryValues.brandCode) {
            return api.fetchGetPointItemListByBrandCode(queryValues.brandCode)
        } else {
            console.log("!!!!!!")
            return api.fetchGetPointItemList();

        }
    });



    const actionTab = [
        ...PointItemActionTab,
        {
            title: 'Action',
            key: 'action',
            render: (record) => {
                return <Space size="middle">
                    <Button onClick={() => { navigate(`/points/item-edit?id=${record.id}`, { replace: true }) }}>Edit</Button>
                </Space>
            }
        }
    ]

    if (!pointItemList.isLoading)
        return (
            <PageLayout pageTitle={"포인트 샵 상품 목록"}>
                <div></div>

                <div style={{ width: "100%" }}>
                    <Table columns={actionTab} dataSource={pointItemList.data?.map((item, idx) => { return { ...item, key: idx } })} />
                </div>
            </PageLayout>
        )
}

export default PointItemList; 