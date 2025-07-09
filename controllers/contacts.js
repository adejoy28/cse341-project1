'use strict';

const mongodb = require('../db/config');
const ObjectId = require('mongodb').ObjectId;


const get = async (req, res) => {
    const contactId = new ObjectId(req.params.id);

    try {
        const contact = await mongodb.getDatabase().collection('contacts').find({ _id: contactId }).toArray();
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(contact);

    } catch (err) {
        res.status(500).json({ error: 'An error occurred getting the contact' + req.params.id });
    }
};

const getAll = async (req, res) => {

    try {
        const contacts = await mongodb.getDatabase().collection('contacts').find({}).toArray();

        res.setHeader('Content-type', 'application/json')
        res.status(200).json(contacts);

    } catch (err) {
        res.status(500).json({ error: 'Couldn\'t get all contacts - Error' + err });
    }

    // res.send("Contacts/Index");
};

module.exports = {
    get,
    getAll
};