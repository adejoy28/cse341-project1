const routes = require('express').Router();

const contacts = require('../controllers/contacts');


routes.get('/', contacts.home);

routes.use('/users', require('./users'));

routes.get('/contacts', contacts.index);


module.exports = routes;