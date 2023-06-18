const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateSignUp = require('../controllers/services/validationService');
//Register a user
router.post('/signup', validateSignUp, userController.signup);

//Login a user
router.post('/login', userController.login);

//Logout a user
router.post('/logout', userController.logout);

let userRoutes = router;
module.exports = userRoutes;
