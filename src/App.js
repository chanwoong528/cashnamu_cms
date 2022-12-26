import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Main from "./routes/Main";
import MainTopBanner from './components/Elements/Nav/MainTopBanner';
import MainNav from './components/Elements/Nav/MainNav';
import AdminList from './routes/AdminList';
import UserList from './routes/UserList';
import MerchantList from './routes/MerchantList';
import MerchantAdd from './routes/MerchantAdd';


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
                                <Route path='list' element={<MerchantList />} />
                                <Route path='new' element={<MerchantAdd />} />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>

        </QueryClientProvider>
    )
}

export default App