const mongoose = require('mongoose');
const cities = require('./cities');
// const photos = require('./photos');
const photos = require('./photo');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

const port = 3000;

//Connecting to MongoDB locally
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('MongoDB has been connected'));

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randomPrice = Math.floor(Math.random() * 30 + 10);
        const randomPhoto = sample(photos);
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            photoUrl: {
                regular: randomPhoto.urls.regular,
                small: randomPhoto.urls.small,
                thumb: randomPhoto.urls.thumb
            },
            description: randomPhoto.alt_description,
            price: randomPrice
        });
        await camp.save();
    }
}

seedDB().then(() => {
    db.close(() => {
        console.log('MongoDB connection closed...');
    });
});