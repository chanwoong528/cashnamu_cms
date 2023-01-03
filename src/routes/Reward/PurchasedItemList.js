import React from 'react'
import { Table, } from 'antd'
import { useQuery } from 'react-query'

import api from "../../apis/apiReward"
import { PurchasedItemListActionTab } from '../../common/ActionTabsConfig'
import PageLayout from '../../components/layout/PageLayout'

const PurchasedItemList = () => {

    const purchasedItemList = useQuery("purchasedItemList", api.fetchGetPurchasedItemList)
    return (
        <PageLayout pageTitle={"리워드 실적 조회"}>

            <div style={{ width: "100%" }}>
                <Table columns={PurchasedItemListActionTab} dataSource={purchasedItemList.data ? purchasedItemList.data.map((item, idx) => { return { ...item, key: idx } }) : []} />
            </div>

        </PageLayout>
    )
}

export default PurchasedItemList