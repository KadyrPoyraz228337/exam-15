const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: String,
})

const modelName = 'Image'

module.exports = mongoose.model(modelName, ImageSchema);