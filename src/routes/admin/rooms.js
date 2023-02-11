const express = require('express');
const router = express.Router();
const { requireSignin, adminMiddleware } = require('../../common-middleware/index');

const Room = require('../../models/room');

// get a list of rooms from db
router.get('/rooms', requireSignin, adminMiddleware, (req, res) => {
    Room.find()
        .then(rooms => res.status(200).send(rooms));
});

// add a new room to db
router.post('/rooms', requireSignin, adminMiddleware, (req, res) => {
    const roomObj = {
        number: req.body.number,
        type: req.body.type,
        dateCreated: req.body.dateCreated && req.body.dateCreated
    }
    const room = new Room(roomObj);
    room.save((error, roomItem) => {
        if (error) {
            res.status(400).json({ error });
        }
        if (roomItem) {
            res.status(200).json({ roomItem });
        }
    });

});

//update a room
router.put('/rooms/:id', requireSignin, adminMiddleware, (req, res) => {
    Room.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => {
            Room.findOne({ _id: req.params.id })
                .then(room => {
                    res.status(201).json({ roomUpdated: room });
                });
        });
});

//delete a room form db
router.delete('/rooms/:id', requireSignin, adminMiddleware, (req, res) => {
    Room.findByIdAndRemove({ _id: req.params.id })
        .then(room => {
            res.status(200).json({ roomDeleted: room });
        });
});

module.exports = router;