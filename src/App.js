import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Users from './users/pages/Users';
import NewLocation from './locations/pages/NewLocation';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
    return <Router>
        <MainNavigation />
        <main>
            <Routes>
                <Route path="/" exact element={<Users />} />
                <Route path="/locations/new" exact element={<NewLocation />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </main>
    </Router>;
};

export default App;
