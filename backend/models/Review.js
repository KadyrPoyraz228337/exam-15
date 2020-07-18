const mongoose = require('mongoose');

const ratingValidator = {
    validator: function (v) {
        return v <= 5 && v > -1
    },
    message: props => `${props.value} is not a valid rating!`
}

const ReviewSchema = new mongoose.Schema({
    text: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    place: {
        type: mongoose.Types.ObjectId,
        ref: 'Place'
    },
    qualityOfFood: {
        type: Number,
        validate: ratingValidator,
        required: true
    },
    serviceQuality: {
        type: Number,
        validate: ratingValidator,
        required: true
    },
    interior: {
        type: Number,
        validate: ratingValidator,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
})

const modelName = 'Review'

module.exports = mongoose.model(modelName, ReviewSchema);