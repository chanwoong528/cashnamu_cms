import React from 'react'
import { Table, } from 'antd'
import { useQuery } from 'react-query'
import { RewardUserListActionTab } from '../../common/ActionTabsConfig'
import api from "../../apis/apiReward"
import PageLayout from '../../components/layout/PageLayout'

const RewardUserList = () => {
    const userRewardList = useQuery("userRewardList", api.fetchGetRewardUserList);

    return (
        <PageLayout pageTitle={"리워드 목록"}>
            <div style={{ width: "100%" }}>
                <Table columns={RewardUserListActionTab} dataSource={userRewardList.data ? userRewardList.data.map((item, idx) => { return { ...item, key: idx } }) : []} />
            </div>
        </PageLayout>
    )
}

export default RewardUserList