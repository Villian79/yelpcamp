const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('Server has been started and the App is running');
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});