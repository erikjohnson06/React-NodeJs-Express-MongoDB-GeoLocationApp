const fs = require('fs');

//const uuid = require('uuid'); //ID Generator
const {validationResult} = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const getCoordinatesForAddress = require('../util/locations');
const LocationModel = require('../models/location');
const UserModel = require('../models/user');

const getLocationById = async (request, response, next) => {

    const id = request.params.locationId;

    let location;

    try {
        location = await LocationModel.findById(id).exec(); //Note: 'exec' returns a Promise
    } catch (e) {
        console.log(e);
        return next(new HttpError('Something went wrong. Unable to find locations.', 500));
    }

    if (!location) {
        console.log(id, location);
        return next(new HttpError('Unable to find this location', 404));
    }

    response.json({
        location: location
    });
};

const getLocationsByUserId = async (request, response, next) => {

    const id = request.params.userId;
    let locations;

    console.log("getLocationsByUserId: ", id);

    try {
        locations = await LocationModel.find({
            createdBy: id,
            isActive: true //search active locations only
        });
    } catch (e) {
        console.log(e);
        return next(new HttpError('Something went wrong. Unable to find locations.', 500));
    }

    console.log("getLocationsByUserId locations: ", locations);

    if (!locations || locations.length === 0) {
        return next(new HttpError('Unable to find locations', 404));
    }

    response.json({locations: locations});
};

const createLocation = async (request, response, next) => {

    //Check for validation errors based on middleware defined in routes
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        console.error(errors);

        if (typeof (errors.errors[0].path) !== "undefined") {
            return next(new HttpError('Invalid input for new location. Please check the ' + errors.errors[0].path + " field.", 422));
        } else {
            return next(new HttpError('Invalid input for new location.', 422));
        }
    }

    const {title, description, address, createdBy} = request.body;

    let coordinates;
    let user;
    let image = request.file.path || null;

    try {
        coordinates = await getCoordinatesForAddress(address);
    } catch (e) {
        return next(e);
    }

    user = await UserModel.findById(createdBy);

    if (!user) {
        return next(new HttpError('Unable to save location. Invalid User.', 404));
    }

    const newLocation = new LocationModel({
        //id: uuid.v4(),
        title: title,
        description: description,
        coordinates: coordinates,
        address: address,
        createdBy: createdBy,
        createdAt: Date.now(),
        isActive: true,
        imageUrl: image
        //imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg'
    });

    try {

        //Save location with a transaction. Rollback in the case of errors.
        //const session = await mongoose.startSession();
        //session.startTransaction();

        await newLocation.save(); //{ session: session}

        //Refer to location in user model
        user.locations.push(newLocation);
        await user.save(); //{ session: session}

        //Commit updates
        //await session.commitTransaction();
    } catch (e) {
        console.log(e);
        return next(new HttpError('Unable to save new location.', 500));
    }

    response.status(201).json({
        location: newLocation //.toObject({ getters: true })
    });
};

const updateLocationById = async (request, response, next) => {

    //Check for validation errors based on middleware defined in routes
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        console.error(errors);
        if (typeof (errors.errors[0].path) !== "undefined") {
            return next(new HttpError('Invalid input for location. Please check the ' + errors.errors[0].path + " field.", 422));
        } else {
            return next(new HttpError('Invalid input for location.', 422));
        }
    }

    const {title, description} = request.body;

    const locationId = request.params.locationId;
    let updatedLocation;

    try {
        updatedLocation = await LocationModel.findById(locationId);

        if (!updatedLocation) {
            return next(new HttpError('Unable to find location', 404));
        }

        //Ensure only original creator can update the location
        if (updatedLocation.createdBy.toString() !== request.userData.userId) {
            return next(new HttpError('You are not permitted to update this location', 401));
        }

        updatedLocation.title = title;
        updatedLocation.description = description;
        updatedLocation.lastUpdated = Date.now();

        await updatedLocation.save();
    } catch (e) {
        console.log(e);
        return next(new HttpError('Unable to update location.', 500));
    }

    response.status(200).json({
        location: updatedLocation //.toObject({ getters: true })
    });
};

const deleteLocationById = async (request, response, next) => {

    const locationId = request.params.locationId;

    let location;
    let imagePath;

    try {
        location = await LocationModel.findById(locationId).populate('createdBy'); //populate provide the full User object linked to this location

        if (!location) {
            return next(new HttpError('Unable to find location', 404));
        }

        //Ensure only original creator can update the location
        if (location.createdBy.id !== request.userData.userId) {
            return next(new HttpError('You are not permitted to delete this location', 401));
        }

        imagePath = location.imageUrl;

        //const session = await mongoose.startSession();
        //session.startTransaction();

        await location.deleteOne();

        //location.isActive = false;
        //await location.save(); //{ session: session}

        location.createdBy.locations.pull(location); //Pull removes the place from the user

        await location.createdBy.save(); //{ session: session}

        //Commit updates
        //await session.commitTransaction();
    } catch (e) {
        console.log(e);
        return next(new HttpError('Unable to delete location.', 500));
    }

    //Delete any associated images
    fs.unlink(imagePath, err => {
        console.log(err);
    });

    response.status(200).json({
        message: "Location deleted",
        location: location
    });
};

exports.getLocationById = getLocationById;
exports.getLocationsByUserId = getLocationsByUserId;
exports.createLocation = createLocation;
exports.updateLocationById = updateLocationById;
exports.deleteLocationById = deleteLocationById;

