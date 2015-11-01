/**
 * A custom library to establish a database connection
 */
'use strict';
var mongoose = require('mongoose');
var connected = false;
var inited = false;
var insertDocument = function insertDocument(doc, targetCollection) {

};
var db = function () {
    var conf = {host: 'localhost', database: 'cinerest'};
    if (!connected) {
        mongoose.connect('mongodb://' + conf.host + '/' + conf.database);
    }
    if (!inited) {
        inited = true;
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function callback() {
            connected = true;
            console.log('db connection open');
        });
        db.once('disconnected', function callback() {
            console.log('db connection disconnected');
            connected = false;
        });
    }

    return {mongoose: mongoose, insertDocument: insertDocument};
};

module.exports = db();