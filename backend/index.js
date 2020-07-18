const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const users = require('./routes/users')
const places = require('./routes/places')
const reviews = require('./routes/reviews')
const images = require('./routes/images')

const config = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    app.use('/users', users)
    app.use('/places', places)
    app.use('/reviews', reviews)
    app.use('/images', images)

    app.listen(config.port)
};

run().catch(e => {
    console.error(e)
});