const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid'); //ID Generator

const HttpError = require('../models/http-error');
const UserModel = require('../models/user');

/**
 * Create new JSON Web Token
 * JWT Reference: https://github.com/auth0/node-jsonwebtoken
 *
 * @param {string} id
 * @return {void}
 */
/*
const createToken = id => {

    return jwt.sign(
            {id: id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES}
    );
};
*/

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


    console.log("Getting users...", users);

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

    const { name, email, password } = request.body;
    let user;
    let image = request.file.path || null;
    let hashedPassword;
    let token;

    try {

        user = await UserModel.findOne({
            'email' : email
        });

        hashedPassword = await bcrypt.hash(password, 12);
    }
    catch(e){
        console.log(e);
        return next(new HttpError('Something went wrong. Unable to create new account.', 500));
    }

    if (user){
        return next(new HttpError('This email address is already registered. Please use a different email.', 422));
    }

    if (!image){
        return next(new HttpError('Please upload a profile image.', 405));
    }

    console.log(request.protocol, request.get('host'));

    const newUser = new UserModel({
        name: name,
        email: email,
        password: hashedPassword,
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

    try {
        console.log("uuid.v4():", uuid.v4());

        token = jwt.sign(
                {userId: newUser.id, email: newUser.email },
                uuid.v4(), //Private key
                {expiresIn: '2h'}
        );
    }
    catch(e){
        console.log(e);
        return next(new HttpError('Whoops.. an unexpected error has occurred.', 500));
    }

    response.status(201).json({
        userId: newUser.id,
        email: newUser.email,
        token: token
    });
};

const login = async (request, response, next) => {

    const { email, password } = request.body;

    let user;
    let token;
    let isValidPassword = false;

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

    if (!user){
        return next(new HttpError('Unable to find this user account or email/password is not correct', 401));
    }

    try {
        isValidPassword = await bcrypt.compare(password, user.password);
    }
    catch(e){
        console.log(e);
        return next(new HttpError('Something went wrong. Unable to sign in at this time.', 500));
    }

    if (!isValidPassword){
        throw new HttpError('Whoops.. email or password is not correct. Please try again.', 401);
    }

    try {
        console.log("uuid.v4():", uuid.v4());

        token = jwt.sign(
                {userId: user.id, email: user.email },
                uuid.v4(), //Private key
                {expiresIn: '2h'}
        );
    }
    catch(e){
        console.log(e);
        return next(new HttpError('Whoops.. an unexpected error has occurred.', 500));
    }

    response.json({
        message: 'You have signed in successfully!',
        userId: user.id,
        email: user.email,
        token: token
    });
};

exports.getUsers = getUsers;
exports.registerNewUser = registerNewUser;
exports.login = login;