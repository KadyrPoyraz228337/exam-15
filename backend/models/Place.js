const mongoose = require('mongoose');

const ratingValidator = {
    validator: function (v) {
        return v <= 5 && v > -1
    },
    message: props => `${props.value} is not a valid rating!`
}

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    qualityOfFood: {
        type: Number,
        validate: ratingValidator,
        default: 0
    },
    serviceQuality: {
        type: Number,
        validate: ratingValidator,
        default: 0
    },
    interior: {
        type: Number,
        validate: ratingValidator,
        default: 0
    }
})

const modelName = 'Place'

module.exports = mongoose.model(modelName, RecipeSchema);