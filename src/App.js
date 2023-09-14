import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Auth from './users/pages/Auth';
import Users from './users/pages/Users';
import NewLocation from './locations/pages/NewLocation';
import UpdateLocation from './locations/pages/UpdateLocation';
import UserLocations from './locations/pages/UserLocations';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

let logoutTimer;

const App = () => {

    const [token, setToken] = useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = useCallback((id, token, expirationDate) => {

        const tokenExpiration = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); //1 Hour

        setToken(token);
        setUserId(id);
        setTokenExpirationDate(tokenExpiration);

        localStorage.setItem('userData',
        JSON.stringify({
            userId: id,
            token: token,
            expiration : tokenExpiration.toISOString()
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setTokenExpirationDate(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate){

            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            console.log("remainingTime: ", remainingTime);

            logoutTimer = setTimeout(logout, remainingTime);
        }
        else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    //Auto-login if already authenticated
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));

        const expirationDate = (storedData.expiration ? new Date(storedData.expiration) : new Date());
        const currDate = new Date();

        if (storedData && storedData.token && expirationDate > currDate){
            login(storedData.userId, storedData.token, expirationDate);
        }
    }, [login]);

    let routes;

    if (token){
        routes = (
            <Routes>
                <Route path="/" exact="true" element={<Users />} />
                <Route path="/:uid/locations"  element={<UserLocations />} />
                <Route path="/locations/new" exact="true" element={<NewLocation />} />
                <Route path="/locations/:locId" element={<UpdateLocation />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
                );
    }
    else {
        routes = (
            <Routes>
                <Route path="/" exact="true" element={<Users />} />
                <Route path="/:uid/locations"  element={<UserLocations />} />
                <Route path="/login" exact="true" element={<Auth />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
                );
    }

    console.log("userId: ", userId);

    return (
    <AuthContext.Provider
        value={{
            isLoggedIn : !!token, //!! converts to 'true' if truthy value
            token: token,
            userId: userId,
            login: login,
            logout : logout
        }}
        >
        <Router>
        <MainNavigation />
        <main>
            {routes}
        </main>
        </Router>
    </AuthContext.Provider>
            );
};

export default App;
