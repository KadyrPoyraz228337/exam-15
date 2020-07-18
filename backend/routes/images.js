const express = require('express')

const isAuth = require('../middlewares/isAuth')
const permit = require('../middlewares/permit')
const Place = require('../models/Place');
const Image = require('../models/Image');
const upload = require('../multer')

const router = express.Router();

router.post('/:id', isAuth, upload.single('image'), async (req, res) => {
    try {
        let {image} = req.body;
        const {id} = req.params;
        const {_id} = req.currentUser

        if (image === 'null') return res.status(400).send({message: 'Image not filled'})

        if (req.file) image = req.file.filename

        const place = await Place.findById(id);

        if (!place) return res.status(404).send({message: 'Place not found'})

        const picture = await Image.create({image, user: _id, place: place._id})

        console.log(1);

        res.send(picture)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/', isAuth, async (req, res) => {
    try {
        const images = await Image.find()

        res.send(images)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/:id', isAuth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params;

        const picture = await Image.findById(id);

        if (!picture) return res.status(404).send({message: 'Place not found'})

        await picture.delete()

        res.send(picture)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/:id', isAuth, async (req, res) => {
    try {
        const {id} = req.params

        console.log(id);

        const images = await Image.find({place: id})

        res.send(images)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;