import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Users from './users/pages/Users';
import NewLocation from './locations/pages/NewLocation';

const App = () => {
    return <Router>
        <Routes>
            <Route path="/" exact element={<Users />} />
            <Route path="/locations/new" exact element={<NewLocation />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Router>;
};

export default App;
