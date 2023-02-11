const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const Booking = require('../../models/booking');

// get a list of bookings from db
router.get('/bookings', (req, res) => {
    Booking.find()
        .then(rooms => res.send(rooms));
});

module.exports = router;