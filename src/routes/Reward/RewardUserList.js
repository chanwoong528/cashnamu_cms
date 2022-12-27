import React from 'react'
import { Table, } from 'antd'
import { useQuery } from 'react-query'
import { RewardUserListActionTab } from '../../common/ActionTabsConfig'
import api from "../../apis/apiReward"

const RewardUserList = () => {
    const userRewardList = useQuery("userRewardList", api.fetchGetRewardUserList);

    return (
        <main className='page'>

            <div style={{ width: "100%" }}>
                <Table columns={RewardUserListActionTab} dataSource={userRewardList.data ? userRewardList.data.map((item, idx) => { return { ...item, key: idx } }) : []} />
            </div>
        </main>
    )
}

export default RewardUserList