//express server import
const express = require('express');

//body parser
const bodyParser = require('body-parser');

//initialize express server app
const app = express();

//set port for server
app.set('port', (process.env.PORT || 3002));

//Routes
const distance = require('./api/getDistance');
const info = require('./api/getInfo');
const radius = require('./api/getRadius');

app.use('/api/getDistance', distance);
app.use('/api/getInfo', info);
app.use('/api/getRadius', radius);

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
})
