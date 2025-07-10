const mongodb = require('../db/config');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    try {
        const users = await mongodb.getDatabase().collection("users").find({}).toArray();
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



const createUser = async (req, res) => {
    const user = {
        username: req.body.username,
        name: req.body.name,
        ipaddress: req.body.ipaddress,
        email: req.body.email,
    }

    const result = await mongodb.getDatabase().collection('users').insertOne(user);

    if (result.acknowledged)
        res.status(200).send('User created successfully');
    else
        res.status(500).json({ error: 'An error occurred' });
}
const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        favoriteColor: req.body.favoriteColor,
        email: req.body.email,
        birthday: req.body.birthday
    }

    const result = await mongodb.getDatabase().collection('users').replaceOne({ _id: userId }, user);

    if (result.modifiedCount > 0)
        res.status(200).json(result);
    else
        res.status(500).json({ error: 'An error occurred' });
}
const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);

    const result = await mongodb.getDatabase().collection('users').deleteOne({ _id: userId });

    if (result.deletedCount > 0)
        res.status(200).json(result);
    else
        res.status(500).json({ error: 'An error occurred' });
}

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};