var dauth = 'frs_business_listing_app_db';
var unamy = 'random';
var dbata = 'frs_business_listing_app_db';
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

var poxy = `${unamy}123`;
var protoname = 'mongodb';
var murl = `${protoname}://${unamy}:${poxy}@13.251.197.63:27017/${dbata}?authSource=${dauth}`
// Connect
const connection = (closure) => {
    return MongoClient.connect(murl, (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};
//test routes
router.get('/', (req, res) => {
  res.json({
      message : 'abc'
  });
})
// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                console.log(JSON.stringify(users, undefined, 2));
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;