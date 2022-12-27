import React, { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Table, Space, Button, Modal, Form, Switch, Input, InputNumber, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import api from "../../apis/apiUser"

const UserList = () => {

    const queryClient = useQueryClient();
    const users = useQuery(
        "users",
        api.fetchGetUserList,
    )
    const mutationPatchUser = useMutation(api.fetchPatchUser, {
        onSuccess: () => {
            queryClient.invalidateQueries("users");
        }
    })
    const mutationDeleteUser = useMutation(api.fetchPatchDeleteUser, {
        onSuccess: () => {
            queryClient.invalidateQueries("users")
        }
    })

    const bankNames = useQuery("bankNames", api.fetchGetBankList);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [curUser, setCurUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const searchInput = useRef(null);
    const handleReset = (clearFilters) => {

        setSearchText('');
        clearFilters();
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys)[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const onClickDeleteUser = async (record) => {
        let deleteConfirm = confirm("Sure to delete User?")
        if (deleteConfirm) {
            return mutationDeleteUser.mutate(record.id)
        } else {
            return;
        }
    }
    const onSubmitUserData = async (record) => {
        mutationPatchUser.mutate({ ...record, id: curUser.id, email: curUser.email });
    }
    const onClickEditUser = async (record) => {
        const targetUser = users.data.filter((dataUser) => dataUser.id === record.id);
        setCurUser(...targetUser);
        setIsModalOpen(true)
    }
    const actionTab = [
        {
            "key": "id",
            "title": "ID",
            "dataIndex": "id",

        },
        {
            "key": "type",
            "title": "회원구분",
            "dataIndex": "type",
            filters: [
                {
                    text: '카카오',
                    value: 'kakao',
                },
                {
                    text: '네이버',
                    value: 'naver',
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.type.includes(value),
        },
        {
            "key": "name",
            "title": "Name",
            "dataIndex": "name",
            ...getColumnSearchProps('name'),
        },
        {
            "key": "email",
            "title": "Email",
            "dataIndex": "email",
            ...getColumnSearchProps('email'),
        }, {
            "key": "points",
            "title": "Points",
            "dataIndex": "points"
        }, {
            "key": "createdDate",
            "title": "가입날짜",
            "dataIndex": "createdDate"
        }, {
            "key": "lastLoggedInDate",
            "title": "마지막 로그인 날짜",
            "dataIndex": "lastLoggedInDate"
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => {

                return <Space size="middle">
                    <Button onClick={() => { onClickEditUser(record) }}>Edit</Button>
                    <Button danger onClick={() => { onClickDeleteUser(record) }}>Delete</Button>
                </Space>
            }
        }

    ]


    return (

        <main className='page'>
            <div style={{ width: "100%" }}>
                <Table dataSource={users.data ? users.data.map((item, idx) => { return { ...item, key: idx } }) : []}
                    columns={actionTab} />
            </div>
            <Modal title="유저 수정" open={isModalOpen}
                onOk={() => {
                    form.submit();
                    setIsModalOpen(false);
                }}
                onCancel={() => { setIsModalOpen(false); }}>
                <div className='unchangeable-input'>
                    <p>회원 구분: {curUser.type}</p>
                    <p>이메일: {curUser.email}</p>
                    <p>가입날짜: {curUser.createdDate}</p>
                    <p>마지막 활동 날짜: {curUser.lastLoggedInDate}</p>
                </div>
                <Form layout='vertical' initialValues={curUser} form={form} onFinish={onSubmitUserData}>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="name"
                        label="name">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="cell"
                        label="cell">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="points"
                        label="points">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="bankOwner"
                        label="bankOwner">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="bankName"
                        label="bankName">
                        <Select options={!bankNames.isLoading ? bankNames.data : null}
                        />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="bankAccountNum"
                        label="bankAccountNum">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        name="marketingAgree"
                        label="marketingAgree">
                        <Switch checked={curUser.marketingAgree} onChange={(checked) => {
                            setCurUser({ ...curUser, marketingAgree: checked })
                        }} />
                    </Form.Item>
                </Form>
            </Modal>
        </ main >

    )
}

export default UserList