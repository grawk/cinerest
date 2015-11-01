'use strict';
/*
 function Movie(options) {
 if (!options) {
 options = {};
 }

 this.id = options.id;
 this.name = options.name;
 this.tag = options.tag;
 }

 module.exports = Movie;
 */
/**
 * A model for our movie
 */
var path = require('path');
var mongoose = require(path.resolve(__dirname, '..', 'lib', 'database'));

var movieModel = function () {

    var movieSchema = mongoose.Schema({
        name: String
    });

    /**
     * Helper function that hooks into the 'save' method, and replaces plaintext passwords with a hashed version.
     */
    movieSchema.pre('save', function (next) {
        var movie = this;

        // any validation?
        console.log('presave');
        //Continue with the save operation
        next();
    });


    return mongoose.model('Movie', movieSchema);
};

module.exports = new movieModel();
