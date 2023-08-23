const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post('/signup', usersController.registerNewUser);

router.post('/login', usersController.login);

module.exports = router;