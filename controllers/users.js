const mongodb = require('../db/config');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    try {
        const users = await mongodb.getDatabase().collection("users").find({}).toArray();
        console.log(users);

        res.setHeader('Content-type', 'application/json');
        res.status(200).json(users);
    }
    catch (err) {
        console.log('Error: ' + err);
        res.status(500).json({ error: 'An error occurred' });
    };
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    console.log(userId._id);
    const result = await mongodb.getDatabase().collection('users').find({ _id: userId });
    result.toArray()
        .then((users) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(users[0]);
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
};


module.exports = {
    getAll,
    getSingle
};