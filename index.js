const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const Campground = require('./models/campground');
const catchAsync = require('./utils/catchAsync');

const port = 3000;

//Connecting to MongoDB locally
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('MongoDB has been connected'));

//EJS setup
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middleware to handle JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Middleware for method override to be able to use PUT and PATCH requests in forms
app.use(methodOverride('_method'));

//Test route
app.get('/', (req, res) => {
    res.render('index', { name: 'Brother!' });
});

//All Campgrounds route
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});

//New Campground form route
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

//Show Route
app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', { campground });
}));

//Edit form Route
app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit', { campground });
}));

//Edit Campground Route
app.put('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, req.body.campground);
    res.redirect(`/campgrounds/${id}`);
}));

//Create New route
app.post('/campgrounds', catchAsync(async (req, res, next) => {
        const newCampground = new Campground(req.body.campground);
        await newCampground.save();
        res.redirect(`/campgrounds/${newCampground._id}`);    
}));

//Delete Route
app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}));

//Basic error handling middleware
app.use((err, req, res, next) => {
    res.send(`Error: ${err.name} -- ${err.message}`);
});

//Start server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});