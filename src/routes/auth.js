const express = require('express');
const { signup, signin } = require('../controllers/auth');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../validator/auth');
const router = express.Router();


router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signin', validateSigninRequest, isRequestValidated, signin);

module.exports = router;
