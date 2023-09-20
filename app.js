const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const locationRoutes = require('./routes/locations');
const userRoutes = require('./routes/users');
const HttpError = require('./models/http-error');

dotenv.config({path: './config.env'});

const app = express();

//Parse JSON data
app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

//Set CORS headers
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/locations', locationRoutes); // => /api/locations/...
app.use('/api/users', userRoutes);

app.use((request, response, next) => {
    throw new HttpError('Unknown route', 404);
});

//Error handling
app.use((error, request, response, next) => {

    if (request.file){
        fs.unlink(request.file.path, err => {
            console.log(err);
        });
    }

    if (response.headerSent){
        return next(error);
    }

    response.status(error.code || 500)
            .json({
                message: error.message || 'An unspecified error has occurred.'
            });
});

//Connect to DB. Note: use process.env.DATABASE_ATLAS for Mongo Atlas connection
mongoose
        .connect(process.env.DATABASE_LOCAL)
        .then(() => {
            app.listen(process.env.PORT);
        })
        .catch(error => {
            console.log(error);
        });

