const dotenv = require('dotenv');
dotenv.config();

const express = require('express'),
    port = process.env.PORT || 8000,
    app = express(),
    bodyParser = require('body-parser');

const mongodb = require('./db/config.js');
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-key");
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (!err) {
        app.listen(port)
        console.log("You are connected to db and currently listening to port: " + port);
    } else {
        console.log('I don\'t understand again o!' + err);
    }

});
