const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Test Campground Schema
const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
});

const Campground = mongoose.model('Campground', CampgroundSchema);

module.exports = Campground;