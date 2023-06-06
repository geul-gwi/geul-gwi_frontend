import React from "react";
import {Routes, Route} from 'react-router-dom';

import Login from "../../component/user/login/Login";
import Register from "component/user/register/Register"
const User = () =>{
    return (
        <Routes>
            {/* <Route path="/" element={<Login/>}></Route> */}
            <Route path="/login/*" element={<Login />}></Route>
            <Route path="/register/*" element={<Register />}></Route>
        </Routes>
    );
};
export default User;
