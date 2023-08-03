import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import LocationItem from './LocationItem';
import './LocationList.css';

const LocationList = props => {

    if (props.items.length === 0) {
        return (
                <div className="location-list center">
                    <Card>
                    <h2>No locations found</h2>
                    <button>Share a Location</button>
                    </Card>
                </div>
                );
    }

    return (
            <ul className="location-list">
                {props.items.map(location =>
                                <LocationItem
                                    key={location.id}
                                    id={location.id}
                                    image={location.imageUrl}
                                    title={location.title}
                                    description={location.description}
                                    address={location.address}
                                    creatorId={location.creatorId}
                                    coordinates={location.coordinates}
                                    />)
                }

            </ul>

            );
};

export default LocationList;