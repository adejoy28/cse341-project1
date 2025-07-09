const dotenv = require('dotenv');
dotenv.config();

const express = require('express'), port = process.env.PORT, app = express();

const mongodb = require('./db/config.js');

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (!err) {
        app.listen(port)
        console.log("You are connected to db and currently listening to port: " + port);
    } else {
        console.log('I don\'t understand again o!' + err);
    }

});
