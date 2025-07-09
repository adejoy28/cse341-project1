const routes = require('express').Router();

const contacts = require('../controllers/contacts');

routes.get('/:id', contacts.get);

routes.get('/', contacts.getAll);

module.exports = routes;
