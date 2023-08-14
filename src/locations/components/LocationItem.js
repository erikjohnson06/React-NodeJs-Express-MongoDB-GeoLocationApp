import React, { useState, useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Map from '../../shared/components/UIElements/Map';
import Modal from '../../shared/components/UIElements/Modal';
import './LocationItem.css';

const LocationItem = props => {

    const auth = useContext(AuthContext);

    const [showMap, setShowMap] = useState(false);

    const [showConfirmation, setShowConfirmation] = useState(false);

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => setShowConfirmation(true);
    const closeDeleteWarningHandler = () => setShowConfirmation(false);

    const confirmDeleteHandler = () => {
        setShowConfirmation(false);
        console.log("Deleting...");
    };

    return (
            <React.Fragment>
                <Modal
                    show={showMap}
                    onCancel={closeMapHandler}
                    header={props.address}
                    contentClass="location-item__modal-content"
                    footerClass="location-item__modal-actions"
                    footer={
                        <Button onClick={closeMapHandler}>Close</Button>
                    }
                    >
                    <div className="map-container">
                        <Map
                        center={props.coordinates}
                        zoom={16}
                        />
                    </div>
                </Modal>

                <Modal
                    show={showConfirmation}
                    onCancel={closeDeleteWarningHandler}
                    header="Are you sure?"
                    contentClass="location-item__modal-content"
                    footerClass="location-item__modal-actions"
                    footer={
                        <React.Fragment>
                            <Button inverse onClick={closeDeleteWarningHandler}>Cancel</Button>
                            <Button danger onClick={confirmDeleteHandler}>Delete</Button>
                        </React.Fragment>
                    }
                    >
                    <p>You are about to permanently delete this location. Are you sure you wish to proceed?</p>
                </Modal>

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
                        <Button inverse onClick={openMapHandler}>View on Map</Button>

                        {auth.isLoggedIn && (
                            <Button to={`/locations/${props.id}`}>Edit</Button>
                        )}

                        {auth.isLoggedIn && (
                            <Button danger onClick={showDeleteWarningHandler}>Delete</Button>
                        )}
                    </div>
                    </Card>
                </li>
            </React.Fragment>
            );
};

export default LocationItem;