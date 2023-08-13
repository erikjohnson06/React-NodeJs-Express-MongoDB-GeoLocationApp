import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hooks';

import './Auth.css';

const Auth = () => {

    const [isLoginMode, setIsLoginMode] = useState(true);

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
                name: undefined
            },
            (formState.inputs.email.isValid && formState.inputs.password.isValid));
        }
        else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            },
            false
                    );
        }

        setIsLoginMode(prevMode => !prevMode);
    };

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
            <Card className="authentication">
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
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid password. Minimum of 5 characters."
                        onInput={inputHandler}
                        />
                    <Button type="submit" disabled={!formState.isValid}>
                    {isLoginMode ? "Login" : "Sign Up"}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                    Switch To {isLoginMode ? "Sign Up" : "Login"}
                </Button>
            </Card>
            );
};

export default Auth;