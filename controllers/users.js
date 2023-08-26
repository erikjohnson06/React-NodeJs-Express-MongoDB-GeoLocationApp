const uuid = require('uuid'); //ID Generator
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

let DUMMY_DATA = [
    {
        id: 'u1',
        name: 'Test Guy',
        email: 'test1@tester.com',
        'password': 'test123'
    }

];

const getUsers = (request, response, next) => {



    response.json({
        users: DUMMY_DATA
    });
};

const registerNewUser = (request, response, next) => {

    //Check for validation errors based on middleware defined in routes
    const errors = validationResult(request);

    if (!errors.isEmpty()){
        console.error(errors, errors.errors[0].path);

        if (typeof (errors.errors[0].path) !== "undefined"){
            throw new HttpError('Invalid input. Please check the ' + errors.errors[0].path + " field.", 422);
        }
        else {
            throw new HttpError('Invalid input', 422);
        }
    }

    const { name, email, password } = request.body;

    const userExists = DUMMY_DATA.find(u => u.email === email);

    if (userExists){
        throw new HttpError('Unable to create new account. Email is already registered.', 422);
    }

    const newUser = {
        id: uuid.v4(),
        name: name,
        email: email,
        password: password
    };

    DUMMY_DATA.push(newUser);

    response.status(201).json({
        user: newUser
    });
};

const login = (request, response, next) => {

    const { email, password } = request.body;

    const user = DUMMY_DATA.find(u => u.email === email);

    if (!user || user.password !== password){
        throw new HttpError('Unable to find this user account or email/password is not correct', 401);
    }


    response.json({
        message: 'You have signed in successfully!'
    });
};

exports.getUsers = getUsers;
exports.registerNewUser = registerNewUser;
exports.login = login;