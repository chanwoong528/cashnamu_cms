import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Table, Space, Button, Modal, Form, Switch, Input, InputNumber, Select, DatePicker } from 'antd'
// import { SearchOutlined } from '@ant-design/icons';
// import Highlighter from 'react-highlight-words';
const { RangePicker } = DatePicker;

import api from "../../apis/apiUser"
import { UserListActionTab } from '../../common/ActionTabsConfig';

const UserList = () => {

    const queryClient = useQueryClient();
    const users = useQuery(
        "users",
        api.fetchGetUserList, {
            cacheTime: 0
    }
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
    const mutationUsersByTerm = useMutation((terms) => { return api.fetchGetUserListByTerms(terms, dateType) }, {
        onSuccess: () => {
            queryClient.invalidateQueries("users")
        }
    })
    const mutationPatchUserList = useMutation((userArr) => { return api.fetchPatchUserList(userArr) }, {
        onSuccess: () => {
            queryClient.invalidateQueries("users");
        }, cacheTime: 0
    })
    const bankNames = useQuery("bankNames", api.fetchGetBankList);
    const [dateType, setDateType] = useState("createdDate");
    const [curUser, setCurUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerms, setSearchTerms] = useState({});
    const [checkedKeys, setCheckedKeys] = useState([])
    const [pointsToAdd, setPointsToAdd] = useState(0)
    const [form] = Form.useForm();

    // for filtering in the client side
    // const [searchText, setSearchText] = useState('');
    // const [searchedColumn, setSearchedColumn] = useState('');
    // const searchInput = useRef(null);
    // const handleReset = (clearFilters) => {

    //     setSearchText('');
    //     clearFilters();
    // };
    // const handleSearch = (selectedKeys, confirm, dataIndex) => {
    //     confirm();
    //     setSearchText(selectedKeys[0]);
    //     setSearchedColumn(dataIndex);
    // };
    // const getColumnSearchProps = (dataIndex) => ({
    //     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
    //         <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
    //             <Input
    //                 ref={searchInput}
    //                 placeholder={`Search ${dataIndex}`}
    //                 value={selectedKeys[0]}
    //                 onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
    //                 onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
    //                 style={{ marginBottom: 8, display: 'block' }}
    //             />
    //             <Space>
    //                 <Button
    //                     type="primary"
    //                     onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
    //                     icon={<SearchOutlined />}
    //                     size="small"
    //                     style={{ width: 90 }}
    //                 >
    //                     Search
    //                 </Button>
    //                 <Button
    //                     onClick={() => clearFilters && handleReset(clearFilters)}
    //                     size="small"
    //                     style={{ width: 90 }}
    //                 >
    //                     Reset
    //                 </Button>
    //                 <Button
    //                     type="link"
    //                     size="small"
    //                     onClick={() => {
    //                         confirm({ closeDropdown: false });
    //                         setSearchText((selectedKeys)[0]);
    //                         setSearchedColumn(dataIndex);
    //                     }}
    //                 >
    //                     Filter
    //                 </Button>
    //                 <Button
    //                     type="link"
    //                     size="small"
    //                     onClick={() => {
    //                         close();
    //                     }}
    //                 >
    //                     close
    //                 </Button>
    //             </Space>
    //         </div>
    //     ),
    //     filterIcon: (filtered) => (
    //         <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    //     ),
    //     onFilter: (value, record) =>
    //         record[dataIndex]
    //             .toString()
    //             .toLowerCase()
    //             .includes((value).toLowerCase()),
    //     onFilterDropdownOpenChange: (visible) => {
    //         if (visible) {
    //             setTimeout(() => searchInput.current?.select(), 100);
    //         }
    //     },
    //     render: (text) =>
    //         searchedColumn === dataIndex ? (
    //             <Highlighter
    //                 highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //                 searchWords={[searchText]}
    //                 autoEscape
    //                 textToHighlight={text ? text.toString() : ''}
    //             />
    //         ) : (
    //             text
    //         ),
    // });


    const onSubmitUserData = async (record) => {
        mutationPatchUser.mutate({ ...record, id: curUser.id, email: curUser.email });
    }
    const onClickEditUser = async (record) => {
        const targetUser = users.data.filter((dataUser) => dataUser.id === record.id);
        setCurUser(...targetUser);
        setIsModalOpen(true)
    }
    const actionTab = [
        ...UserListActionTab,
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
    const onSubmitSearchTerm = () => {
        if (!searchTerms.date && !searchTerms.type && !searchTerms.userInfoCate && !searchTerms.searchInfo) {
            return alert("type something")
        }
        if (searchTerms.userInfoCate && !searchTerms.searchInfo || !searchTerms.userInfoCate && searchTerms.searchInfo) {
            return alert("type something")
        }
        mutationUsersByTerm.mutate(searchTerms)
    }
    const onClickDeleteUser = async (record) => {
        let deleteConfirm = confirm("Sure to delete User?")
        if (deleteConfirm) {
            return mutationDeleteUser.mutate(record.id)
        } else {
            return;
        }
    }
    const onClickAddPoints = () => {

        const usersToAddPoints = users.data.filter((user) => { return checkedKeys.includes(user.id) }).map((user) => {
            return { ...user, points: user.points + pointsToAdd }
        })

        mutationPatchUserList.mutate(usersToAddPoints);


    }
    const selectedRow = (selectedRecord) => {
        setCheckedKeys(selectedRecord)
    }


    const rowSelection = {
        onChange: selectedRow,
        type: 'checkbox'
    };
    return (

        <main className='page'>
            <header>
                <h2>유저 목록</h2>
            </header>
            <div className='search-control'>
                <Form layout='inline' onFinish={onSubmitSearchTerm} >
                    <Form.Item>
                        <Select
                            defaultValue={{ label: '가입 날짜', value: 'createdDate', }}
                            style={{ width: 150 }}
                            placeholder={"날짜 형식"}
                            options={[
                                { label: '가입 날짜', value: 'createdDate', },
                                { label: '최근 로그인 날짜', value: 'lastLoggedInDate', }
                            ]}
                            onChange={(value) => {
                                setDateType(value);
                            }
                            } />
                    </Form.Item>
                    <Form.Item>
                        <RangePicker onChange={(date, dateString) => {
                            setSearchTerms({ ...searchTerms, date: dateString })
                        }} />
                    </Form.Item>
                    <Form.Item>
                        <Select
                            style={{ width: 150 }}
                            placeholder={"로그인 타입"}
                            options={[
                                { label: '카카오', value: 'kakao', },
                                { label: '네이버', value: 'naver', }
                            ]}
                            onChange={(value) => {
                                setSearchTerms({ ...searchTerms, type: value })
                            }
                            } />
                    </Form.Item>
                    <Form.Item>
                        <Select
                            style={{ width: 150 }}
                            placeholder={"사용자 정보"}
                            options={[
                                { value: "name", label: "이름" },
                                { value: "email", label: "이메일" },
                                { value: "cell", label: "전화번호" }
                            ]} onChange={(value) => {
                                setSearchTerms({ ...searchTerms, userInfoCate: value })
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input onChange={(e) => { setSearchTerms({ ...searchTerms, searchInfo: e.target.value }) }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType="submit" >Search</Button>
                    </Form.Item>
                </Form>


            </div>


            <div style={{ width: "100%" }}>
                <Table rowSelection={rowSelection}
                    rowKey={'id'}
                    dataSource={mutationUsersByTerm.isSuccess ?
                        mutationUsersByTerm.data.map((item, idx) => { return { ...item, key: idx } }) :
                        !users.isLoading && users.data.map((item, idx) => { return { ...item, key: idx } })}
                    columns={actionTab} />
            </div>
            <div className='footer-btn-control'>
                <InputNumber defaultValue={0} onChange={(pointVal) => { setPointsToAdd(pointVal) }} />
                <Button onClick={() => { onClickAddPoints() }}>Add Points</Button>

            </div>
            <Modal title="유저 수정" open={isModalOpen}
                onOk={() => {
                    form.submit();
                    setIsModalOpen(false);
                    queryClient.invalidateQueries("users")
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