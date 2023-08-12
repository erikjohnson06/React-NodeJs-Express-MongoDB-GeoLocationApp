import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Auth from './users/pages/Auth';
import Users from './users/pages/Users';
import NewLocation from './locations/pages/NewLocation';
import UpdateLocation from './locations/pages/UpdateLocation';
import UserLocations from './locations/pages/UserLocations';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
    return <Router>
        <MainNavigation />
        <main>
            <Routes>
                <Route path="/" exact="true" element={<Users />} />
                <Route path="/:uid/locations"  element={<UserLocations />} />
                <Route path="/locations/new" exact="true" element={<NewLocation />} />
                <Route path="/locations/:locId" element={<UpdateLocation />} />
                <Route path="/login" exact="true" element={<Auth />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </main>
    </Router>;
};

export default App;
