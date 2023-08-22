//const { v4: uuidv4 } = require('uuid'); //ID Generator
const uuid = require('uuid'); //ID Generator

const HttpError = require('../models/http-error');

const DUMMY_DATA = [
    {
        id: 'p1',
        title: 'Test Location 1',
        description: 'A really famous and amazing location!',
        createdBy: 'u1',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St., New York, NY 10001',
        coordinates: {
            lat: 40.7484405,
            lng: -73.9856644
        }
    },
    {
        id: 'p2',
        title: 'Test Location 2',
        description: 'A really famous and amazing location!',
        createdBy: 'u2',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St., New York, NY 10001',
        coordinates: {
            lat: 40.7484405,
            lng: -73.9856644
        }
    }
];

const getLocationById = (request, response, next) => {

    const id = request.params.locationId;
    const location = DUMMY_DATA.find(loc => {
        return loc.id === id;
    });

    if (!location){
        throw new HttpError('Unable to find this location', 404);
    }

    response.json({location: location});
};

const getLocationsByUserId = (request, response, next) => {

    const id = request.params.userId;
    const user = DUMMY_DATA.find(loc => {
        return id === loc.createdBy;
    });

    if (!user){
        return next(new HttpError('Unable to find this location', 404));
    }

    response.json({user: user});
};

const createLocation = (request, response, next) => {

    const { title, description, coordinates, address, createdBy } = request.body;

    const newLocation = {
        id: uuid.v4(),
        title: title,
        description: description,
        coordinates: coordinates,
        address: address,
        createdBy: createdBy
    };

    DUMMY_DATA.push(newLocation);

    response.status(201).json({
        location: newLocation
    });
};

const updateLocationById = (request, response, next) => {

    const { title, description } = request.body;

    const locationId = request.params.locationId;

    const updatedLocation = { ... DUMMY_DATA.find( loc => loc.id === locationId) }; //Create copy of object initially
    const index = DUMMY_DATA.find( loc => loc.id === locationId);

    updatedLocation.title = title;
    updatedLocation.description = description;

    DUMMY_DATA[index] = updatedLocation;

    response.status(200).json({
        location: updatedLocation
    });
};

const deleteLocationById = (request, response, next) => {

};

exports.getLocationById = getLocationById;
exports.getLocationsByUserId = getLocationsByUserId;
exports.createLocation = createLocation;
exports.updateLocationById = updateLocationById;
exports.deleteLocationById = deleteLocationById;

