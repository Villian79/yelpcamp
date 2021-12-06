const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Test Campground Schema
const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    photoUrl: String
});

const Campground = mongoose.model('Campground', CampgroundSchema);

module.exports = Campground;