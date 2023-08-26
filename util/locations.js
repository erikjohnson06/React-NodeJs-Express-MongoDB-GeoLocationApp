const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyCPqme3XsYDHT2wltGBU2Hol8iJXKtcsxs';

async function getCoordinatesForAddress (address) {

    //axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`);
    const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
            );

    console.log("address: ", address);
    //console.log(response);

    const data = response.data;

    console.log(data);

    if (!data || data.status === 'ZERO_RESULTS'){
        throw new HttpError('Unable to find location for the specified address.', 422);
    }

    const coordinates = data.results[0].geometry.location;

    console.log("coordinates: ", coordinates);

    return coordinates;

//    return {
//        lat: 0,
//        lng: 0
//    };
};

module.exports = getCoordinatesForAddress;