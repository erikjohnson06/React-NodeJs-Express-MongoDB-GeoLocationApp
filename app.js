const express = require('express');
const bodyParser = require('body-parser');

const locationRoutes = require('./routes/locations');
const userRoutes = require('./routes/users');

const app = express();

app.use('/api/locations', locationRoutes); // => /api/locations/...

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