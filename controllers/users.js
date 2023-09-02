//const uuid = require('uuid'); //ID Generator
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const UserModel = require('../models/user');

const getUsers = async (request, response, next) => {

    let users;

    try {

        //Find all active users. Do not return password.
        users = await UserModel.find({
            'isActive' : true
        }, '-password');
    }
    catch(e){
        console.log(e);
        return next(new HttpError('Something went wrong. Unable to fetch users.', 500));
    }

    response.json({
        users: users
    });
};

const registerNewUser = async (request, response, next) => {

    //Check for validation errors based on middleware defined in routes
    const errors = validationResult(request);

    if (!errors.isEmpty()){
        console.error(errors);

        if (typeof (errors.errors[0].path) !== "undefined"){
            return next(new HttpError('Invalid input. Please check the ' + errors.errors[0].path + " field.", 422));
        }
        else {
            return next(new HttpError('Invalid input', 422));
        }
    }

    const { name, email, password, image } = request.body;
    let user;

    try {

        user = await UserModel.findOne({
            'email' : email
        });
    }
    catch(e){
        console.log(e);
        return next(new HttpError('Something went wrong. Unable to create new account.', 500));
    }

    if (user){
        return next(new HttpError('This email address is already registered. Please use a different email.', 422));
    }

    const newUser = new UserModel({
        //id: uuid.v4(),
        name: name,
        email: email,
        password: password,
        image: image,
        locations: [],
        createdAt: Date.now(),
        isActive: true
    });

    try {
        newUser.save();
    }
    catch(e){
        console.log(e);
        return next(new HttpError('Unable to create new account at this time.', 500));
    }

    response.status(201).json({
        user: newUser
    });
};

const login = async (request, response, next) => {

    const { email, password } = request.body;

    let user;

    try {

        user = await UserModel.findOne({
            'email' : email
        });
    }
    catch(e){
        console.log(e);
        return next(new HttpError('Something went wrong. Unable to sign in at this time.', 500));
    }

    console.log(user);

    if (!user || user.password !== password){
        return next(new HttpError('Unable to find this user account or email/password is not correct', 401));
    }

    response.json({
        message: 'You have signed in successfully!',
        user: user
    });
};

exports.getUsers = getUsers;
exports.registerNewUser = registerNewUser;
exports.login = login;