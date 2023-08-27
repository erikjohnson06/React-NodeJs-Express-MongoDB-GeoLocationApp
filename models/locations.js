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
        },
        createdBy: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedBy: {
            type: String,
            default: null
        },
        lastUpdated: {
            type: Date,
            default: Date.now()
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        //Options
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

module.exports = mongoose.model('Locations', locationsSchema);