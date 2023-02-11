const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create room Schema and model
const RoomSchema = new Schema({
    number: {
        type: String,
        required: [true, 'Room number is required']
    },
    type: {
        type: String,
        required: [true, 'Please specify room type'],
        trim: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;