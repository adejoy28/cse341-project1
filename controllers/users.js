const mongodb = require('../db/config');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    try {
        const users = await mongodb.getDatabase().collection("users").find({}).toArray();
        console.log(users);

        // const db = mongodb.getDatabase();
        // console.log('Database:', db);

        // const collection = db.collection('users');
        // console.log('Collection:', collection);

        // const cursor = collection.find();
        // console.log('Cursor:', cursor);

        // const users = await cursor.toArray();
        // console.log('Users:', users);

        // console.log('Collection name:', await mongodb.getDatabase().collection('contacts').find().toArray());

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
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray()
        .then((users) => {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(users[id]);
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
};


module.exports = {
    getAll,
    getSingle
};