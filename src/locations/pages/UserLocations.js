import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import LocationList from '../components/LocationList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

//const DUMMY_DATA = [
//    {
//        id: 'p1',
//        title: 'Test Location 1',
//        description: 'A really famous and amazing location!',
//        createdBy: 'u1',
//        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg',
//        address: '20 W 34th St., New York, NY 10001',
//        coordinates: {
//            lat: 40.7484405,
//            lng: -73.9856644
//        }
//    },
//    {
//        id: 'p2',
//        title: 'Test Location 2',
//        description: 'A really famous and amazing location!',
//        createdBy: 'u2',
//        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg',
//        address: '20 W 34th St., New York, NY 10001',
//        coordinates: {
//            lat: 40.7484405,
//            lng: -73.9856644
//        }
//    }
//
//];

const UserLocations = props => {

    const [loadedLocations, setLoadedLocations] = useState();
    const { isLoading, hasError, sendRequest, clearError } = useHttpClient();

    const userId = useParams().uid;

    console.log("userId: ", userId);

    useEffect(() => {

        const fetchLocations = async () => {

            try {
                const response = await sendRequest(
                        `http://localhost:5000/api/locations/user/${userId}`
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

    //const loadedLocations = DUMMY_DATA.filter(location => location.createdBy === userId);

    return (<React.Fragment>
                <ErrorModal error={hasError} onClear={clearError} />
                {isLoading && <div className="center"><LoadingSpinner /></div>}
                {!isLoading && loadedLocations && <LocationList items={loadedLocations} />}
            </React.Fragment>
            );

};

export default UserLocations;