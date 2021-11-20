const express = require('express');
const app = express();
const path = require('path');

const port = 3000;

//EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Test route
app.get('/', (req, res) => {
    res.render('index', { name: 'Brother!' });
});


//Start server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});