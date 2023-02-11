const express = require('express')
const env = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();
const path = require('path');
const cors = require('cors');

mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;


env.config();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.MONGO_DB_DATABASE}`, () => {
    console.log("Database connected")
})

//Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth')



app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', require('./routes/rooms'));
app.use('/api', require('./routes/admin/rooms'));
app.use('/api', require('./routes/booking'));
app.use('/api', require('./routes/admin/booking'));

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT} `)
})