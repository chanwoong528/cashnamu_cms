import React, { useState } from 'react'
import { Button } from 'antd'

import { useQuery } from 'react-query'
import PageLayout from '../../components/layout/PageLayout'
import api from "../../apis/apiAdmin"
const Category = () => {

    const allCate = useQuery("merchantCate", api.fetchGetAllCategory)


    const [selectedCate, setSelectedCate] = useState(0);
    const [selectedBigCate, setSelectedBigCate] = useState(0)

    if (!allCate.isLoading) {
        return (
            <PageLayout pageTitle={"카테고리 목록"}>
                <div className='cate-container'>
                    <section>
                        <header>
                            <h3>Category</h3>
                        </header>
                        <div className='btn-container'>
                            {allCate.data.map((item, idx) => {
                                return <Button type={idx === selectedCate ? "primary" : ""}
                                    onClick={() => {
                                        setSelectedCate(idx);
                                        setSelectedBigCate(0)
                                    }}>{item.title}</Button>
                            })}
                        </div>
                    </section>
                    <section>
                        <header>
                            <h3>Big Category</h3>
                        </header>
                        <div className='btn-container'>

                            {allCate.data[selectedCate].cate.sort((a, b) => a.priority - b.priority).map((bigCate, idx) => {
                                return <Button type={idx === selectedBigCate ? "primary" : ""} onClick={() => { setSelectedBigCate(idx) }}> {bigCate.label}</Button>
                            })}

                        </div>
                    </section>
                    <section>
                        <header>
                            <h3>Small Category</h3>
                        </header>
                        <div className='btn-container'>
                            {allCate.data[selectedCate].cate[selectedBigCate].smallCategory.sort((a, b) => a.priority - b.priority).map((smallCate, idx) => {
                                return <Button> {smallCate.label}</Button>
                            })}
                        </div>

                    </section>
                </div>

            </PageLayout>
        )
    }

}

export default Category