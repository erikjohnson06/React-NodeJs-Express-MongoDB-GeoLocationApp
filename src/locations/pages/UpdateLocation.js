import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';

import { useForm } from '../../shared/hooks/form-hooks';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './LocationForm.css';

const UpdateLocation = () => {

    const auth = useContext(AuthContext);
    const { isLoading, hasError, sendRequest, clearError } = useHttpClient();
    const [loadedLocation, setLoadedLocation] = useState();

    const locationId = useParams().locId;

    const navigate = useNavigate();

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: true
        },
        description: {
            value: '',
            isValid: true
        },
        address: {
            value: '',
            isValid: true
            }
    }, true);

    useEffect(() => {

        const fetchLocation = async () => {

            try {
                const response = await sendRequest(
                        `${process.env.REACT_APP_API_URL}/locations/${locationId}`
                    );

                setLoadedLocation(response.location);

                setFormData({
                    title: {
                        value: response.location.title,
                        isValid: true
                    },
                    description: {
                        value: response.location.description,
                        isValid: true
                    },
                    address: {
                        value: response.location.address,
                        isValid: true
                        }
                }, true);
            }
            catch (e){
                console.log(e);
            }
        };

        fetchLocation();

    }, [sendRequest, locationId, setFormData]);

    const locationUpdateSubmitHandler = async event => {

        event.preventDefault();

        try {

            await sendRequest(
                    `${process.env.REACT_APP_API_URL}/locations/${locationId}`,
                    'PATCH',
                    JSON.stringify({
                        title: formState.inputs.title.value,
                        description: formState.inputs.description.value,
                        address: formState.inputs.address.value,
                        updatedBy: auth.userId
                    }),
                    {
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + auth.token
                    }
                );

            //Redirect to user locations
            navigate('/' + auth.userId + '/locations');
        } catch (e) {
            console.log(e);
        }

    };

    if (isLoading){
        return <div className="center"><LoadingSpinner /></div>;
    }
    else if (!loadedLocation && !hasError) {
        return <div className="center"><Card><h2>Unable to find this location</h2></Card></div>;
    }

    return (
            <React.Fragment>
                <ErrorModal error={hasError} onClear={clearError} />
                {!isLoading && loadedLocation && (
                <form className="location-form" onSubmit={locationUpdateSubmitHandler}>
                    <Input
                        id="title"
                        element="input"
                        type="text"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title"
                        onInput={inputHandler}
                        initialValue={loadedLocation.title}
                        initialValid={true}
                        />
                    <Input
                        id="description"
                        element="textarea"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid description (minimum of 5 characters)"
                        onInput={inputHandler}
                        initialValue={loadedLocation.description}
                        initialValid={true}
                        />
                    <Input
                        id="address"
                        element="input"
                        label="Address"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid address"
                        onInput={inputHandler}
                        initialValue={loadedLocation.address}
                        initialValid={true}
                        />
                    <Button type="submit" disabled={!formState.isValid}>Update Location</Button>
                </form>)}
            </React.Fragment>
        );
};

export default UpdateLocation;