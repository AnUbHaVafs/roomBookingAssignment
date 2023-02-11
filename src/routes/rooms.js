const express = require('express');
const router = express.Router();

const Room = require('../models/room');

// get a list of rooms from db
router.get('/user/rooms', (req, res) => {
    Room.find()
        .then(rooms => res.status(200).send(rooms));
});

module.exports = router;