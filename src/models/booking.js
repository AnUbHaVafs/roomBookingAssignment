const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const room = require('./room');
const user = require('./user');

// create booking Schema and model
const BookingSchema = new Schema({
    Person: {
        type: Schema.ObjectId,
        ref: 'users'
    },
    role: {
        type: String
    },
    date: [{
        type: String,
        required: [true, 'Date is required']
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    },
    room: [{
        type: Schema.ObjectId,
        ref: 'rooms'
    }]
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;