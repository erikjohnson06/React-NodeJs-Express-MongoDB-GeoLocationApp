import React, { useState, useContext } from 'react';

import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Map from '../../shared/components/UIElements/Map';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './LocationItem.css';

const LocationItem = props => {

    const auth = useContext(AuthContext);
    const { isLoading, hasError, sendRequest, clearError } = useHttpClient();
    const [showMap, setShowMap] = useState(false);

    const [showConfirmation, setShowConfirmation] = useState(false);

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => setShowConfirmation(true);
    const closeDeleteWarningHandler = () => setShowConfirmation(false);

    const confirmDeleteHandler = async () => {
        setShowConfirmation(false);

        try {

            await sendRequest(
                    `${process.env.REACT_APP_API_URL}/locations/${props.id}`,
                    'DELETE',
                    null,
                    { 'Authorization' : 'Bearer ' + auth.token }
                );

            props.onDelete(props.id);

            //Redirect to user locations
            //navigate('/' + auth.userId + '/locations');
        } catch (e) {
            console.log(e);
        }
    };

    return (
            <React.Fragment>
                <ErrorModal error={hasError} onClear={clearError} />
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
                    {isLoading && <LoadingSpinner asOverlay />}
                    <div className="location-item__image">
                        <img src={`${process.env.REACT_APP_ASSET_URL}/uploads/images/${props.image}`} alt={props.title} />
                    </div>
                    <div className="location-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="location-item__actions">
                        <Button inverse onClick={openMapHandler}>View on Map</Button>

                        {auth.isLoggedIn && auth.userId === props.createdBy && (
                            <Button to={`/locations/${props.id}`}>Edit</Button>
                        )}

                        {auth.isLoggedIn && auth.userId === props.createdBy && (
                            <Button danger onClick={showDeleteWarningHandler}>Delete</Button>
                        )}
                    </div>
                    </Card>
                </li>
            </React.Fragment>
            );
};

export default LocationItem;