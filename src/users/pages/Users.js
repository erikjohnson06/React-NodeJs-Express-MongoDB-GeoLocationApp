import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {

    const { isLoading, hasError, sendRequest, clearError } = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {

        const fetchUsers = async () => {

            try {
                const response = await sendRequest('http://localhost:5000/api/users/');

                setLoadedUsers(response.users);
            } catch (e) {
                console.log(e);
            }
        };

        fetchUsers();

    }, [sendRequest]);

    return (
            <React.Fragment>
                <ErrorModal error={hasError} onClear={clearError} />
                {isLoading && <div className="center"><LoadingSpinner /></div>}

                { /* Only render UsersList if not loading and users are found */ }
                {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
            </React.Fragment>
            );
};

export default Users;