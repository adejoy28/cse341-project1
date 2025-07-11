const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialised');
        return callback(null, database);
    }

    MongoClient.connect(process.env.MongoDB_URI)
        .then((client) => {
            database = client.db();
            console.log('DB just got connected')
            callback(null, database);
        })
        .catch((err) => {
            console.log('Error ' + err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Db is not initialised');
    }
    return database;
}


module.exports = {
    initDb,
    getDatabase
};