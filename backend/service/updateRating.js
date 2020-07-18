const Place = require('../models/Place');
const Review = require('../models/Review');

const roundUp = number =>  +parseFloat(number).toFixed(1);

module.exports = async function (id) {
    const reviews = await Review.find({place: id})
    const length = reviews.length;

    const result = reviews.reduce((a, c) => {
        return {
            qualityOfFood: roundUp(a.qualityOfFood + c.qualityOfFood/length),
            serviceQuality: roundUp(a.serviceQuality + c.serviceQuality/length),
            interior: roundUp(a.interior + c.interior/length)
        }
    }, {qualityOfFood: 0, serviceQuality: 0, interior: 0})
    result.rating = roundUp((result.qualityOfFood + result.serviceQuality + result.interior) / 3)

    await Place.updateOne({_id: id}, result)
}