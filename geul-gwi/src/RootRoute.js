import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import User from './Routes/user/User';
import MainRoute from './Routes/main/MainRoute';
import Home from './component/main/Home';
import PostForm from './component/user/post/PostForm';

const RootRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/user' element={<User />}></Route>
                <Route path='/main/*' element={<MainRoute />}></Route>
                {/* <Route path='/post' element={<PostForm />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default RootRoute;