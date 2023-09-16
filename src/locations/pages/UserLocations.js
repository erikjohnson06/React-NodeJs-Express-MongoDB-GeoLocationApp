import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import LocationList from '../components/LocationList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserLocations = props => {

    const [loadedLocations, setLoadedLocations] = useState();
    const { isLoading, hasError, sendRequest, clearError } = useHttpClient();

    const userId = useParams().uid;

    console.log("userId: ", userId);

    useEffect(() => {

        const fetchLocations = async () => {

            try {
                const response = await sendRequest(
                        `${process.env.REACT_APP_API_URL}/locations/user/${userId}`
                    );

                console.log("fetchLocations response: ", response);

                setLoadedLocations(response.locations);
            }
            catch (e){
                console.error(e);
            }
        };

        fetchLocations();

    }, [sendRequest, userId]);

    const deleteLocationHandler = (id) => {
        setLoadedLocations(locations => locations.filter(loc => loc.id !== id));
    };

    return (<React.Fragment>
                <ErrorModal error={hasError} onClear={clearError} />
                {isLoading && <div className="center"><LoadingSpinner /></div>}
                {!isLoading && loadedLocations && <LocationList items={loadedLocations} onDeleteLocation={deleteLocationHandler} />}
            </React.Fragment>
            );

};

export default UserLocations;