const multer = require('multer');
const uuid = require('uuid'); //ID Generator

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

/**
 * Upload image files to uploads/images directory
 * @param {String} folder
 */
const fileUpload = (folder) => {
    return multer({
        limits: 500000,
        storage: multer.diskStorage({
            destination: (request, file, callback) => {
                callback(null, `uploads/images/${folder}`);
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
};

module.exports = fileUpload;