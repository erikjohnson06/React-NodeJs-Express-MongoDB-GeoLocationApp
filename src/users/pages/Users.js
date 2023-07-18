import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {

    const USERS = [
        { id : 'u1', name : 'Erik Johnson', image: '', locationsCount: 3},
    ];

    return <UsersList items={USERS} />;
};

export default Users;