const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Campground = require('./models/campground');
const CampgroundSchema = require('./models/campground');

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

//Route to create a test DB entry to check if it works
app.get('/campground', async (req, res) => {
    const camp = new Campground({ title: 'Test Campground', price: '2.0', description: 'This is a test campground', location: 'California' });
    await camp.save();
    res.send(camp);
});


//Start server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});