const express = require('express');

const locationsController = require('../controllers/locations');

const router = express.Router();

/**
 * /api/locations/{id}
 */
router.get('/:locationId', locationsController.getLocationById);

router.get('/user/:userId', locationsController.getLocationsByUserId);

module.exports = router;