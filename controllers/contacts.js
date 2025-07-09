'use strict';

const home = (req, res) => {
    res.send("Welcome, Hello!");
};

const index = (req, res) => {
    res.send("Contacts/Index");
};

module.exports = {
    home,
    index
};