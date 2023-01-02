import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Main from "./routes/Main";
import MainTopBanner from './components/Elements/Nav/MainTopBanner';
import MainNav from './components/Elements/Nav/MainNav';
import AdminList from './routes/User/AdminList';
import UserList from './routes/User/UserList';
import MerchantList from './routes/Product/MerchantList';
import MerchantAdd from './routes/Product/MerchantAdd';
import RewardUserList from './routes/Reward/RewardUserList';
import PurchasedItemList from './routes/Reward/PurchasedItemList';
import PointShopList from './routes/Product/PointShopList';
import PointItemList from './routes/Product/PointItemList';
import HotDealList from './routes/Product/HotDealList';
import CouponPurchasedList from './routes/Product/CouponPurchasedList';
import PointShopAdd from './routes/Product/PointShopAdd';
import FAQEdit from './routes/Board/FAQEdit';
import FAQList from './routes/Board/FAQList';
import FAQAdd from './routes/Board/FAQAdd';
import NoticeList from './routes/Board/NoticeList';
import NoticeAdd from './routes/Board/NoticeAdd';
import NoticeEdit from './routes/Board/NoticeEdit';
import Privacy from './routes/Board/Privacy';
import Usage from './routes/Board/Usage';
import Category from './routes/AdminPanel/Category';



const App = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />

            <BrowserRouter>
                <div className='wrap'>
                    <MainTopBanner />
                    <div className='main-wrap'>
                        <MainNav />
                        <Routes>
                            <Route path='/' element={<Main />} />
                            <Route path='admin' >
                                <Route path='list' element={<AdminList />} />
                            </Route>
                            <Route path='user' >
                                <Route path='list' element={<UserList />} />
                            </Route>
                            <Route path='merchants' >
                                <Route path='shopping-list' element={<MerchantList />} />
                                <Route path='new' element={<MerchantAdd />} />
                            </Route>
                            <Route path='points' >
                                <Route path='shop-list' element={<PointShopList />} />
                                <Route path='new' element={<PointShopAdd />} />
                                <Route path='item-list' element={<PointItemList />} />
                                <Route path='coupon-purchased-list' element={<CouponPurchasedList />} />
                            </Route>
                            <Route path='hot-deal' >
                                <Route path='hot-list' element={<HotDealList />} />
                            </Route>
                            <Route path='rewards' >
                                <Route path='user-list' element={<RewardUserList />} />
                                <Route path='item-list' element={<PurchasedItemList />} />
                            </Route>
                            <Route path='board' >
                                <Route path='faq' element={<FAQList />} />
                                <Route path='faq-new' element={<FAQAdd />} />
                                <Route path='faq-edit' element={<FAQEdit />} />
                                <Route path='notice' element={<NoticeList />} />
                                <Route path='notice-new' element={<NoticeAdd />} />
                                <Route path='notice-edit' element={<NoticeEdit />} />
                                <Route path='terms-privacy' element={<Privacy />} />
                                <Route path='terms-usage' element={<Usage />} />
                            </Route>
                            <Route path='category' >
                                <Route path='list' element={<Category />} />
                            </Route>

                        </Routes>
                    </div>
                </div>
            </BrowserRouter>

        </QueryClientProvider>
    )
}

export default App