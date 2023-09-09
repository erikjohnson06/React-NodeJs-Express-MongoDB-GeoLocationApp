import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import Input from '../../shared/components/FormElements/Input';
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

const NewLocation = props => {

    const auth = useContext(AuthContext);
    const { isLoading, hasError, sendRequest, clearError } = useHttpClient();

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
        },
        image: {
            value: null,
            isValid: false
        }
    }, false);

    const navigate = useNavigate();

    const locationSubmitHandler = async event => {
        event.preventDefault();
        console.log(formState.inputs);

        try {

            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('address', formState.inputs.address.value);
            formData.append('createdBy', auth.userId);
            formData.append('image', formState.inputs.image.value);

            await sendRequest(
                    'http://localhost:5000/api/locations',
                    'POST',
                    formData
                );

            //Redirect to home
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    return (
            <React.Fragment>
                <ErrorModal error={hasError} onClear={clearError} />
                <form className="location-form" onSubmit={locationSubmitHandler}>
                    {isLoading && <LoadingSpinner asOverlay />}
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
                    <ImageUpload
                        id="image"
                        center
                        onInput={inputHandler}
                        errorText="Please provide an image"
                        buttonText="Upload Image"
                    />
                    <Button type="submit" disabled={!formState.isValid}>Add Location</Button>
                </form>
            </React.Fragment>
            );
};

export default NewLocation;