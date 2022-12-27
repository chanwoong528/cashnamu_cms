import React, { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient, } from 'react-query'
import { Button, Form, Switch, Input, Select, } from 'antd';
import api from "../../apis/apiPoints";



const PointShopAdd = () => {

    const queryClient = useQueryClient();
    const [valueBigCate, setValueBigCate] = useState("");
    const [valueSmallCate, setValueSmallCate] = useState("");
    const [curSmallCatePoint, setCurSmallCatePoint] = useState([])
    const [curPointShopValue, setCurPointShopValue] = useState({
        bigCategory: "",
        smallCategory: "",
        brandCode: "",
        brandName: "",
        imgUrl: "",
        popular: false,
        status: true,

    })
    const categories = useQuery("pointsCategory", api.fetchGetCategory);
    const mutationPostPointShop = useMutation(api.fetchPostNewPointShop, {
        onSuccess: () => {
            queryClient.invalidateQueries("pointShops");
            alert("New Point Shop Created.")
        }
    })

    const onSubmitAddPointShop = async (formValue) => {
        //TODO: validation Check
        const formattedDateKR = new Intl.DateTimeFormat("ko-KR").format(new Date());
        mutationPostPointShop.mutate({ ...curPointShopValue, createdDate: formattedDateKR });
        setCurPointShopValue({});
        setValueBigCate("")
        setValueSmallCate("")
    }
    const onChangeBigCate = (value) => {
        setValueBigCate(value)
        setCurPointShopValue({ ...curPointShopValue, bigCategory: value })
        setCurSmallCatePoint(categories.data.find(item => item.value === value).smallCategory)
        setValueSmallCate("")
    }
    if (!categories.isLoading)
        return (
            <main className='page'>
                <header>
                    <h2>포인트 샵 등록</h2>
                </header>
                <div style={{ width: "100%" }}>
                    <Form initialValues={curPointShopValue} layout='vertical' onFinish={onSubmitAddPointShop}>
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
                            label="브랜드 코드">
                            <Input onChange={(e) => {
                                setCurPointShopValue({ ...curPointShopValue, brandCode: e.target.value })
                            }} />
                        </Form.Item>
                        <Form.Item
                            shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                            name="brandName"
                            label="브랜드 이름">
                            <Input onChange={(e) => {
                                setCurPointShopValue({ ...curPointShopValue, brandName: e.target.value })
                            }} />
                        </Form.Item>
                        {/*//TODO: Image file insert later need discussion */}
                        <Form.Item
                            name="popular"
                            label="인기 브랜드 유무">
                            <Switch defaultChecked={false}
                                onChange={(check) => {
                                    setCurPointShopValue({ ...curPointShopValue, popular: check })
                                }} />
                        </Form.Item>
                        <Form.Item
                            name="status"
                            label="브랜드 사용 유무">
                            <Switch
                                defaultChecked={true}
                                onChange={(check) => {
                                    setCurPointShopValue({ ...curPointShopValue, status: check })
                                }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>


                </div>


            </main>
        )
}

export default PointShopAdd