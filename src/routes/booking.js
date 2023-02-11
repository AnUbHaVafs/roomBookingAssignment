const express = require('express');
const router = express.Router();
const { requireSignin, userMiddleware } = require('../common-middleware/index');
const jwt = require('jsonwebtoken');

const Booking = require('../models/booking');

// get a list of bookings from db
router.get('/user/bookings', requireSignin, userMiddleware, (req, res) => {
    Booking.find({ Person: req.user._id })
        .then(bookings => res.send(bookings));
});

// // add a new booking to db
router.post('/bookings', requireSignin, userMiddleware, (req, res) => {

    const bookingObj = {
        Person: req.user._id,
        role: req.user.role,
        date: req.body.date,
        room: req.body.room
    }
    Booking.create(bookingObj)
        .then(booking => {
            const { _id, role } = req.user
            console.log(_id, role);
            const token = jwt.sign({ _id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(201).json({ token: token, bookingSuccessful: booking });
        })
});

module.exports = router;