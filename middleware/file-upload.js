const multer = require('multer');
const uuid = require('uuid'); //ID Generator

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (request, file, callback) => {
            //console.log("fileUpload request:", request);
            callback(null, 'uploads/images');
        },
        filename: (request, file, callback) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            callback(null, uuid.v4() + '.' + ext);
        }
    }),
    fileFilter : (request, file, callback) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype]; //'!!' convert undefined/null to false
        let error = isValid ? null : new Error('Invalid file type');
        callback(error, isValid);
    }
});

module.exports = fileUpload;