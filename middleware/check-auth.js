const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (request, response, next) => {

    //Ensure OPTIONS requests are not blocked
    if (request.method === 'OPTIONS'){
        return next();
    }

    try {
        const token = request.headers.authorization.split(' ')[1]; //Authorization: 'Bearer TOKEN'

        if (!token){
            return next(new HttpError('Authentication failed', 401));
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        request.userData = { userId : decodedToken.userId };
        next();
    }
    catch(e){
        return next(new HttpError('Authentication failed', 401));
    }



};