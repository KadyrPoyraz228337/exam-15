const express = require('express')

const isAuth = require('../middlewares/isAuth')
const permit = require('../middlewares/permit')
const Review = require('../models/Review');
const updateRating = require('../service/updateRating')

const router = express.Router();

// qualityOfFood, serviceQuality, interior

router.post('/:id', isAuth, async (req, res) => {
    try {
        const {text, qualityOfFood, serviceQuality, interior} = req.body
        const {id} = req.params
        const {_id} = req.currentUser

        const hasReview = await Review.findOne({user: _id, place: id})
        // const recipe = await Recipe.findById(id)

        // if (!recipe) return res.status(404).send({message: 'Recipe not found'})
        // if (recipe.user.toString() === _id.toString()) return res.status(400).send({message: 'You can not add comment in you recipe'})
        if (hasReview) return res.status(400).send({message: 'You already add review'})

        const review = await Review.create({text, qualityOfFood, serviceQuality, interior, place: id, user: _id})

        await updateRating(id)

        res.send(review)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/:id', isAuth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params
        const {_id} = req.currentUser

        const review = await Review.findOne({user: _id, place: id})
        if (!review) return res.status(404).send({message: 'Comment not found'})

        await review.delete()

        await updateRating(id)

        res.send(review)
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})

module.exports = router;