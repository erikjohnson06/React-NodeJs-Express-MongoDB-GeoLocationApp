const express = require('express');
const bodyParser = require('body-parser');

const locationRoutes = require('./routes/locations');
const userRoutes = require('./routes/users');
const HttpError = require('./models/http-error');

const app = express();

//Parse JSON data
app.use(bodyParser.json());

app.use('/api/locations', locationRoutes); // => /api/locations/...
app.use('/api/users', userRoutes);

app.use((request, response, next) => {
    throw new HttpError('Unknown route', 404);
});

//Error handling
app.use((error, request, response, next) => {

    if (response.headerSent){
        return next(error);
    }

    response.status(error.code || 500)
            .json({
                message: error.message || 'An unspecified error has occurred.'
            });
});

app.listen(5000);