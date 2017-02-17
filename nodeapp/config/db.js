'use strict';

// To connect nodejs with mongodb
var Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost/nodeappdb');
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

module.exports.db = db;

