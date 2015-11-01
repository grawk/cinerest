'use strict';

var path = require('path');

var Data = {
    add: function (model) {
        var Model = require(path.resolve(__dirname, '..', 'models', model));
        var data = require(path.resolve(__dirname, model));
        data.map(function (obj) {
            (new Model(obj)).save();
        });
    }
};

module.exports = Data;