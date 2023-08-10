import React, { useCallback, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
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

/*

import {
VALIDATOR_REQUIRE,
        VALIDATOR_MINLENGTH
        } from '../../shared/util/validators';
import './NewLocation.css';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':

            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            };
        default:
            return state;
    }
};
*/
const UpdateLocation = () => {

    const locationId = useParams().locId;

    const location = DUMMY_DATA.find(l => l.id === locationId);

    if (!location) {
        return <div className="center"><h2>Unable to find this location</h2></div>;
    }

    return (
            <form className="location-form" onSubmit={() => {}}>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title"
                    onInput={() => {}}
                    value={location.title}
                    valid={true}
                    />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (minimum of 5 characters)"
                    onInput={() => {}}
                    value={location.description}
                    valid={true}
                    />
                <Input
                    id="address"
                    element="input"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid address"
                    onInput={() => {}}
                    value={location.address}
                    valid={true}
                    />
                <Button type="submit" disabled={true}>Update Location</Button>
            </form>
            );



/*
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        });
    }, []);

    const locationSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
            <form className="location-form" onSubmit={locationSubmitHandler}>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title"
                    onInput={inputHandler}
                    />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (minimum of 5 characters"
                    onInput={inputHandler}
                    />

                <Input
                    id="address"
                    element="input"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid address"
                    onInput={inputHandler}
                    />
                <Button type="submit" disabled={!formState.isValid}>Add Location</Button>
            </form>
            );

 */
};

export default UpdateLocation;