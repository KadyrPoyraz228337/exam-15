const express = require('express')

const isAuth = require('../middlewares/isAuth')
const Review = require('../models/Review');
const updateRating = require('../service/updateRating')

const router = express.Router();

router.get('/', isAuth, async (req, res) => {
    try {
        const reviews = await Review.find()

        res.send(reviews)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/:id', isAuth, async (req, res) => {
    try {
        const {id} = req.params

        const reviews = await Review.find({place: id}).populate('user')

        res.send(reviews)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/:id', isAuth, async (req, res) => {
    try {
        const {text, qualityOfFood, serviceQuality, interior} = req.body
        const {id} = req.params
        const {_id} = req.currentUser

        if (!qualityOfFood || !serviceQuality || !interior || !text) return res.status(404).send({message: 'All fields must be filled'})

        const hasReview = await Review.findOne({user: _id, place: id})

        if (hasReview) return res.statudeletes(400).send({message: 'You already add review'})

        const review = await Review.create({text, qualityOfFood, serviceQuality, interior, place: id, user: _id})

        await updateRating(id)

        res.send(review)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/:id', isAuth, async (req, res) => {
    try {
        const {id} = req.params
        const {_id, role} = req.currentUser

        const review = await Review.findOne({user: _id, place: id})

        if (!review) return res.status(404).send({message: 'Review not found'})
        if (review.user._id.toString() === _id.toString() || role === 'admin') {
            await Review.deleteOne({_id: review._id})

            await updateRating(id)

            res.send(review)
        } else return res.status(403).send({message: `You are not admin`});
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})

module.exports = router;