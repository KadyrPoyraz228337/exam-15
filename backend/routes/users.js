const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User')
const isAuth = require('../middlewares/isAuth')
const upload = require('../multer')

const router = express.Router();

router.post('/', upload.single('avatar'), async (req, res) => {
    try {
        let {username, name, password, avatar} = req.body;

        if (password.length < 3) return res.status(400).send({message: 'Password must be more than 3 characters'})
        if (req.file) avatar = req.file.filename;

        const user = new User({username, name, password, avatar})
        user.addToken()
        await user.save()

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/sessions', async (req, res) => {
    try {
        let {username, password,} = req.body;

        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).send({message: 'Username or password not correct!'});
        } else {
            const correctPassword = await bcrypt.compare(password, user.password);
            if (!correctPassword) {
                return res.status(404).send({message: 'Username or password not correct!'});
            }
        }

        user.addToken();
        user.save();

        res.send(user)
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})

router.delete('/sessions', isAuth, async (req, res) => {
    const success = {message: "success"};
    try {
        const token = req.get('Authorization').split(' ')[1];

        if (!token) return res.send(success);

        const user = await User.findOne({token});

        if (!user) return res.send(success);

        user.addToken();
        await user.save();

        return res.send(success);

    } catch (e) {
        res.send(success)
    }

});

module.exports = router