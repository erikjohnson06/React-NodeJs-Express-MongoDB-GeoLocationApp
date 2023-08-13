import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Auth from './users/pages/Auth';
import Users from './users/pages/Users';
import NewLocation from './locations/pages/NewLocation';
import UpdateLocation from './locations/pages/UpdateLocation';
import UserLocations from './locations/pages/UserLocations';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = useCallback(() => {
        setIsLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
    }, []);

    return (
    <AuthContext.Provider value={{isLoggedIn : isLoggedIn, login: login, logout : logout}}>
        <Router>
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
        </Router>
    </AuthContext.Provider>
            );
};

export default App;
