import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Main from "./routes/Main";
import MainNav from './components/Elements/Nav/MainNav';
import AdminList from './routes/AdminList';


const App = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />

            <BrowserRouter>
                <MainNav />
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='admin' >
                        <Route path='list' element={<AdminList />} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </QueryClientProvider>
    )
}

export default App