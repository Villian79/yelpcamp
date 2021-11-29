const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Campground = require('./models/campground');

const port = 3000;

//Connecting to MongoDB locally
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('MongoDB has been connected'));

//EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middleware to handle JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Test route
app.get('/', (req, res) => {
    res.render('index', { name: 'Brother!' });
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index.ejs', { campgrounds });
});

app.get('/campgrounds/:id', async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show.ejs', { campground });
});


//Start server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});