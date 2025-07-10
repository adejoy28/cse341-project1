const routes = require('express').Router();

routes.use('/', require('./swagger'));

routes.use('/users', require('./users'));

routes.use('/contacts', require('./contacts'));

module.exports = routes;