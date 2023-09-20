import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

//Use lazy loading here for performance
const Users = React.lazy(() => import('./users/pages/Users'));
const UserLocations = React.lazy(() => import('./locations/pages/UserLocations'));
const NewLocation = React.lazy(() => import('./locations/pages/NewLocation'));
const UpdateLocation = React.lazy(() => import('./locations/pages/UpdateLocation'));
const Auth = React.lazy(() => import('./users/pages/Auth'));

const App = () => {

    const { token, login, logout, userId } = useAuth();

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
            <Suspense fallback={
                <div className="center">
                    <LoadingSpinner />
                </div>
            }>
                {routes}
            </Suspense>
        </main>
        </Router>
    </AuthContext.Provider>
            );
};

export default App;
