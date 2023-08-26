const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationsSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        createdBy: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        coordinates: {
            lat: {
                type: Number,
                required: true
            },
            lng: {
                type: Number,
                required: true
            }
        }
});

module.exports = mongoose.model('Locations', locationsSchema);