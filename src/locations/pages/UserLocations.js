import React from 'react';
import { useParams } from 'react-router-dom';

import LocationList from '../components/LocationList';

const DUMMY_DATA = [
    {
        id: 'p1',
        title: 'Test Location 1',
        description: 'A really famous and amazing location!',
        createdId: 'u1',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St., New York, NY 10001',
        coordinates: {
            lat: 40.7484405,
            lng: -73.9856644
        }
    },
    {
        id: 'p2',
        title: 'Test Location 2',
        description: 'A really famous and amazing location!',
        createdId: 'u2',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St., New York, NY 10001',
        coordinates: {
            lat: 40.7484405,
            lng: -73.9856644
        }
    }

];

const UserLocations = props => {

    const userId = useParams().uid;
    console.log("userId: ", userId);
    const loadedLocations = DUMMY_DATA.filter(location => location.createdId === userId);

    return <LocationList items={loadedLocations} />;

};

export default UserLocations;