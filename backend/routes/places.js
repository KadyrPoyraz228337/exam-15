const fs = require('fs')

const express = require('express')

const isAuth = require('../middlewares/isAuth')
const permit = require('../middlewares/permit')
const Place = require('../models/Place');
const upload = require('../multer')
const config = require('../config')

const router = express.Router();

router.post('/', isAuth, upload.single('image'), async (req, res) => {
    try {
        let {title, image, description, qualityOfFood, serviceQuality, interior, licenseAgreement} = req.body;
        const {_id} = req.currentUser

        if (!licenseAgreement) return res.status(400).send({message: 'LicenseAgreement must be true'})

        if (req.file) image = req.file.filename

        const place = await Place.create({title, image, description, qualityOfFood, serviceQuality, interior, user: _id})

        res.send(place)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/:id', isAuth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params;

        const place = await Place.findById(id);

        if (!place) return res.status(404).send({message: 'Place not found'})

        fs.unlinkSync(config.uploadPath+'/'+place.image)

        await place.delete()

        res.send(place)
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})

router.get('/', isAuth, async (req, res) => {
    try {
        const places = await Place.find()

        res.send(places)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;