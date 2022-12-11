import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Main from "./routes/Main";
import MainNav from './components/Elements/Nav/MainNav';


const App = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />

            <BrowserRouter>
                <MainNav />
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/about' element={null} />
                </Routes>
            </BrowserRouter>

        </QueryClientProvider>
    )
}

export default App