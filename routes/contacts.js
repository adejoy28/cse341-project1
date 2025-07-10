const routes = require('express').Router();

const contacts = require('../controllers/contacts');

routes.get('/:id', contacts.get);

routes.get('/', contacts.getAll);
routes.post('/', contacts.createContact);
routes.put('/:id', contacts.updateContact);
routes.delete('/:id', contacts.deleteContact);

module.exports = routes;
