const uuid = require('uuid'); //ID Generator
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordinatesForAddress = require('../util/locations');
const LocationModel = require('../models/location');

//let DUMMY_DATA = [
//    {
//        id: 'p1',
//        title: 'Test Location 1',
//        description: 'A really famous and amazing location!',
//        createdBy: 'u1',
//        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg',
//        address: '20 W 34th St., New York, NY 10001',
//        coordinates: {
//            lat: 40.7484405,
//            lng: -73.9856644
//        }
//    },
//    {
//        id: 'p2',
//        title: 'Test Location 2',
//        description: 'A really famous and amazing location!',
//        createdBy: 'u2',
//        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg',
//        address: '20 W 34th St., New York, NY 10001',
//        coordinates: {
//            lat: 40.7484405,
//            lng: -73.9856644
//        }
//    }
//];

const getLocationById = async (request, response, next) => {

    const id = request.params.locationId;

    let location;

    try {
        console.log("id: ", id);

        location = await LocationModel.findById(id).exec(); //exec returns a Promise
    }
    catch (e){
        console.log(e);
        return next(new HttpError('Something went wrong. Unable to find locations.', 500));
    }

    if (!location){
        return next(new HttpError('Unable to find this location', 404));
    }

    response.json({
        location: location //.toObject({ getters: true })
    });
};

const getLocationsByUserId = async (request, response, next) => {

    const id = request.params.userId;
    let locations;

    try {
        console.log("id: ", id);

        locations = await LocationModel.find({
            createdBy: id,
            isActive: true //search active locations only
        });
    }
    catch (e){
        console.log(e);
        return next(new HttpError('Something went wrong. Unable to find locations.', 500));
    }

    if (!locations || locations.length === 0){
        return next(new HttpError('Unable to find locations', 404));
    }

    //response.json({locations: locations.map(loc => loc.toObject({ getters: true })) }); //getters => true converts "_id" property to "id"
    response.json({locations: locations });
};

const createLocation = async (request, response, next) => {

    //Check for validation errors based on middleware defined in routes
    const errors = validationResult(request);

    if (!errors.isEmpty()){
        console.error(errors);

        if (typeof (errors.errors[0].path) !== "undefined"){
            return next(new HttpError('Invalid input for new location. Please check the ' + errors.errors[0].path + " field.", 422));
        }
        else {
            return next(new HttpError('Invalid input for new location.', 422));
        }
    }

    const { title, description, address, createdBy } = request.body;

    let coordinates;

    try {
        coordinates = await getCoordinatesForAddress(address);
    }
    catch (e){
        return next(e);
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
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg'
    });

    try {
        await newLocation.save();
    }
    catch (e){
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

    if (!errors.isEmpty()){
        console.error(errors);
        if (typeof (errors.errors[0].path) !== "undefined"){
            return next(new HttpError('Invalid input for location. Please check the ' + errors.errors[0].path + " field.", 422));
        }
        else {
            return next(new HttpError('Invalid input for location.', 422));
        }
    }

    const { title, description } = request.body;

    const locationId = request.params.locationId;
    let updatedLocation;

    try {
        updatedLocation = await LocationModel.findById(locationId);

        if (!updatedLocation){
            return next(new HttpError('Unable to find location', 404));
        }

        updatedLocation.title = title;
        updatedLocation.description = description;
        updatedLocation.lastUpdated = Date.now();

        await updatedLocation.save();
    }
    catch(e){
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

    try {
        location = await LocationModel.findById(locationId);

        if (!location){
            return next(new HttpError('Unable to find location', 404));
        }

        //await location.remove();

        location.isActive = true;
        await location.save();
    }
    catch(e){
        console.log(e);
        return next(new HttpError('Unable to delete location.', 500));
    }

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

