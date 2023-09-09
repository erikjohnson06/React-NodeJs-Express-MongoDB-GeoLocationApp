const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: [50, 'Names are limited to 50 characters'],
        minlength: [1, 'Invalid name']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        maxlength: [50, 'Email addresses are limited to 50 characters'],
        minlength: [1, 'Invalid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        maxlength: [128, 'Passwords are limited to 128 characters'],
        minlength: [8, 'Passwords must be at least 8 characters']
        //select: false //Prevents field from appearing in output
    },
    image: {
        type: String
    },
    locations: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Location',
                required: true
            }
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now()
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

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;