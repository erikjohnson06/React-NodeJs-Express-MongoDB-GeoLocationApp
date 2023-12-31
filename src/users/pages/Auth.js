import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hooks';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {

    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, hasError, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm(
            {
                email: {
                    value: '',
                    isValid: false
                },
                password: {
                    value: '',
                    isValid: false
                }
            },
            false
            );


    const switchModeHandler = event => {

        //Adjust form validation when switching modes
        if (!isLoginMode){
            setFormData({
                ...formState.inputs,
                name: undefined,
                image: undefined
            },
            (formState.inputs.email.isValid && formState.inputs.password.isValid));
        }
        else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                image : {
                    value: null,
                    isValid: false
                }
            },
            false
                    );
        }

        setIsLoginMode(prevMode => !prevMode);
    };

    const authSubmitHandler = async event => {
        
        event.preventDefault();

        if (isLoginMode){

            try {

                const response = await sendRequest(
                    process.env.REACT_APP_API_URL + '/users/login',
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );

                auth.login(response.userId, response.token);
            }
            catch(e){
                console.error(e);
            }
        }
        else {

            try {

                const formData = new FormData();
                formData.append('name', formState.inputs.name.value);
                formData.append('email', formState.inputs.email.value);
                formData.append('password', formState.inputs.password.value);
                formData.append('image', formState.inputs.image.value);

                const response = await sendRequest(
                    process.env.REACT_APP_API_URL + '/users/signup',
                    'POST',
                    formData
                );

                auth.login(response.userId, response.token);
            }
            catch(e){
                console.error(e);
            }
        }
    };

    return (
            <React.Fragment>
                <ErrorModal error={hasError} onClear={clearError} />
                <Card className="authentication">
                    {isLoading && <LoadingSpinner asOverlay />}
                    <h2>Sign In</h2>
                    <hr />
                    <form onSubmit={authSubmitHandler}>

                        {!isLoginMode && (
                                <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid name"
                            onInput={inputHandler}
                            />
                        )}

                        <Input
                            element="input"
                            id="email"
                            type="email"
                            label="Email Address"
                            validators={[VALIDATOR_EMAIL()]}
                            errorText="Please enter a valid email address"
                            onInput={inputHandler}
                            />
                        <Input
                            element="input"
                            id="password"
                            type="password"
                            label="Password"
                            validators={[VALIDATOR_MINLENGTH(6)]}
                            errorText="Please enter a valid password. Minimum of 6 characters."
                            onInput={inputHandler}
                            />

                        {!isLoginMode &&
                                <ImageUpload
                                    id="image"
                                    center
                                    onInput={inputHandler}
                                    errorText="Please provide an image"
                                    buttonText="Upload Profile Image"
                        />
                        }

                        <Button type="submit" disabled={!formState.isValid}>
                        {isLoginMode ? "Login" : "Sign Up"}
                        </Button>
                    </form>
                    <Button inverse onClick={switchModeHandler}>
                        Switch To {isLoginMode ? "Sign Up" : "Login"}
                    </Button>
                </Card>
            </React.Fragment>
            );
};

export default Auth;