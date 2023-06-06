import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Component
import Home from 'component/main/Home';
import ChallengeRouter from './challenge/ChallengeRouter';

// Import Context
import UserStore from 'contextStore/UserStore';

const MainRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/challenge/*' element={<ChallengeRouter />}></Route>
        </Routes>
    );
};

export default MainRoute;