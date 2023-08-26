const express = require('express');
const {check} = require('express-validator');

const locationsController = require('../controllers/locations');

const router = express.Router();

/**
 * /api/locations/{id}
 */
router.get('/:locationId', locationsController.getLocationById);

router.get('/user/:userId', locationsController.getLocationsByUserId);

router.post('/',
        [
            check('title').not().isEmpty(),
            check('description').isLength({min: 5}),
            check('address').not().isEmpty()
        ],
        locationsController.createLocation
        );

router.patch('/:locationId',
        [
            check('title').not().isEmpty(),
            check('description').isLength({min: 5})
        ],
        locationsController.updateLocationById);

router.delete('/:locationId', locationsController.deleteLocationById);

module.exports = router;