import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './NewLocation.css';

const NewLocation = props => {
    return (
            <form className="location-form">
                <Input
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title"
                    />

            </form>
            );
};

export default NewLocation;