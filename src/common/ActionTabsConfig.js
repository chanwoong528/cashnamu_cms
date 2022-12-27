import { Table, Space, Button, Modal, Form, Input, Switch } from 'antd'


export const RewardUserListActionTab = [
    {
        "key": "id",
        "title": "ID",
        "dataIndex": "id"
    },
    {
        "key": "userEmail",
        "title": "유저 이메일",
        "dataIndex": "userEmail"
    },
    {
        "key": "userName",
        "title": "이름",
        "dataIndex": "userName"
    }, {
        "key": "purchasedDate",
        "title": "구매확정 날짜",
        "dataIndex": "purchasedDate"
    }, {
        "key": "purchasedAmount",
        "title": "구매 금액",
        "dataIndex": "purchasedAmount"
    },
    {
        "key": "linkPricePoint",
        "title": "링크프라이스 P",
        "dataIndex": "linkPricePoint"
    },
    {
        "key": "cashnamuPoint",
        "title": "캐시나무 P",
        "dataIndex": "cashnamuPoint"
    },
    {
        "key": "userPoint",
        "title": "유저 P",
        "dataIndex": "userPoint"
    },
    {
        "key": "status",
        "title": "상태",
        "dataIndex": "status"
    },


];

export const PurchasedItemListActionTab = [
    {
        "key": "id",
        "title": "ID",
        "dataIndex": "id"
    },
    {
        "key": "userEmail",
        "title": "유저 이메일",
        "dataIndex": "userEmail"
    },
    {
        "key": "purchasedDate",
        "title": "구매 날짜",
        "dataIndex": "purchasedDate"
    }, {
        "key": "itemNumber",
        "title": "상품 번호",
        "dataIndex": "itemNumber"
    }, {
        "key": "itemCode",
        "title": "상품 코드",
        "dataIndex": "itemCode"
    },
    {
        "key": "itemName",
        "title": "상품 이름",
        "dataIndex": "itemName"
    },
    {
        "key": "itemPrice",
        "title": "가격",
        "dataIndex": "itemPrice"
    },
    {
        "key": "commission",
        "title": "커미션",
        "dataIndex": "commission"
    },
    {
        "key": "status",
        "title": "상태",
        "dataIndex": "status"
    },
];

export const AdminListActionTab = [{
    "key": "id",
    "title": "ID",
    "dataIndex": "id"
},
{
    "key": "name",
    "title": "Name",
    "dataIndex": "name"
},
{
    "key": "email",
    "title": "Email",
    "dataIndex": "email"
}];


export const MerchantStatusList = [{
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
]; 
