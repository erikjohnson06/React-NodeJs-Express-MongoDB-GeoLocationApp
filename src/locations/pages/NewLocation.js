import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
VALIDATOR_REQUIRE,
        VALIDATOR_MINLENGTH
        } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hooks';
import './LocationForm.css';

const NewLocation = props => {

    const [formState, inputHandler] = useForm(
    {
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    }, false);

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
                    errorText="Please enter a valid description (minimum of 5 characters)"
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
};

export default NewLocation;