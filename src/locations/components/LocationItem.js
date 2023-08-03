import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './LocationItem.css';

const LocationItem = props => {

    return (
            <li className="location-item">
                <Card className="location-item__content">
                <div className="location-item__image">
                    <img src={props.image} alt={props.title} />
                </div>
                <div className="location-item__info">
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="location-item__actions">
                    <button>View on Map</button>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
                </Card>
            </li>
            );
};

export default LocationItem;