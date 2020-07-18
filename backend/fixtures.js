const mongoose = require('mongoose');
const config = require("./config");

const User = require('./models/User');
const Place = require('./models/Place');
const Review = require('./models/Review');

const updateRating = require('./service/updateRating')

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collection = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collection) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [admin, user] = await User.create({
        username: '123',
        password: '12345',
        token: '123',
        name: 'Kadyr',
        role: 'admin'
    }, {
        username: '12345',
        password: '12345',
        token: '123',
        name: 'Ramazan',
        role: 'user'
    });

    const [one, two] = await Place.create({
        title: '123123',
        user: user,
        image: 'minFurer.jpg',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    }, {
        title: 'sdfnkmalsf',
        user: admin,
        image: 'leha_maimish.jpg',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    })

    await Review.create({
        text: 'Text text text text text text text text text text text text text text text text text ',
        user: user,
        place: one,
        qualityOfFood: 4,
        serviceQuality: 2,
        interior: 3
    }, {
        text: 'Text text text text text text text text text text text text text text text text text ',
        user: admin,
        place: two,
        qualityOfFood: 4,
        serviceQuality: 2,
        interior: 3
    })

    await updateRating(one._id)
    await updateRating(two._id)

    mongoose.connection.close();
};

run().catch(e => {
    throw e;
});