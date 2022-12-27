import React from 'react'
import { Table, } from 'antd'
import { useQuery } from 'react-query'

import api from "../../apis/apiReward"
import { PurchasedItemListActionTab } from '../../common/ActionTabsConfig'

const PurchasedItemList = () => {

    const purchasedItemList = useQuery("purchasedItemList", api.fetchGetPurchasedItemList)
    return (
        <main className='page'>

            <div style={{ width: "100%" }}>
                <Table columns={PurchasedItemListActionTab} dataSource={purchasedItemList.data ? purchasedItemList.data.map((item, idx) => { return { ...item, key: idx } }) : []} />
            </div>

        </main>
    )
}

export default PurchasedItemList