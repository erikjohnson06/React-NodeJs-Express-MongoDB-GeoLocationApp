import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hooks';
import './LocationForm.css';

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

const UpdateLocation = () => {

    const [isLoading, setIsLoading] = useState(true);
    const locationId = useParams().locId;

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

    const location = DUMMY_DATA.find(l => l.id === locationId);

    useEffect(() => {

        if (location){
            setFormData({
                title: {
                    value: location.title,
                    isValid: true
                },
                description: {
                    value: location.description,
                    isValid: true
                },
                address: {
                    value: location.address,
                    isValid: true
                    }
            }, true);
        }

        setIsLoading(false);

    }, [setFormData, location]);

    const locationUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    if (!location) {
        return <div className="center"><Card><h2>Unable to find this location</h2></Card></div>;
    }

    if (isLoading){
        return <div className="center"><Card><h2>Loading...</h2></Card></div>;
    }

    return (
            <form className="location-form" onSubmit={locationUpdateSubmitHandler}>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title"
                    onInput={inputHandler}
                    initialValue={formState.inputs.title.value}
                    initialValid={formState.inputs.title.isValid}
                    />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (minimum of 5 characters)"
                    onInput={inputHandler}
                    initialValue={formState.inputs.description.value}
                    initialValid={formState.inputs.description.isValid}
                    />
                <Input
                    id="address"
                    element="input"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid address"
                    onInput={inputHandler}
                    initialValue={formState.inputs.address.value}
                    initialValid={formState.inputs.address.isValid}
                    />
                <Button type="submit" disabled={!formState.isValid}>Update Location</Button>
            </form>
        );
};

export default UpdateLocation;