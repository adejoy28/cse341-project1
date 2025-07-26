'use strict';

const mongodb = require('../db/config');
const ObjectId = require('mongodb').ObjectId;


const get = async (req, res) => {
    // #swagger.tags = ['Contacts']
    const contactId = new ObjectId(req.params.id);

    try {
        const contact = await mongodb.getDatabase().collection('contacts').find({ _id: contactId }).toArray();
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(contact);

    } catch (err) {
        res.status(500).json({ message: 'An error occurred getting the contact' + req.params.id, error: err });
    }
};

const getAll = async (req, res) => {
    // #swagger.tags = ['Contacts']
    try {
        const contacts = await mongodb.getDatabase().collection('contacts').find({}).toArray();

        res.setHeader('Content-type', 'application/json')
        res.status(200).json(contacts);

    } catch (err) {
        res.status(500).json({ error: 'Couldn\'t get all contacts - Error' + err });
    }

    // res.send("Contacts/Index");
};

const createContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    try {
        const result = await mongodb.getDatabase().collection('contacts').insertOne(contact);
        res.status(200).json({ message: "Contact successfully created", data: result });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' + err });
    }
}
const updateContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    const contactId = new ObjectId(req.params.id);

    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        }
        await mongodb.getDatabase().collection('contacts').replaceOne({ _id: contactId }, contact);
        res.status(200).json("Contact updated successfully");
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' + err });
    }
}


const deleteContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    const contactId = new ObjectId(req.params.id);

    try {
        const result = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: contactId });
        res.status(200).json({ "message": "Contact deleted successfully", "deleted": result.deletedCount, "status": result.acknowledged });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' + err });
    }
}


module.exports = {
    get,
    getAll,
    createContact,
    deleteContact,
    updateContact
};