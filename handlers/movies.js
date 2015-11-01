'use strict';
var path = require('path');
var movieModel = require(path.resolve(__dirname, '../models/movie'));
/**
 * Operations on /movies
 */
module.exports = {
    
    /**
     * 
     * parameters: 
     * produces: 
     */
    get: function (req, res) {
        movieModel.find(function (err, movies) {
            res.status(200).json(movies);
        });

    }, 
    
    /**
     * Creates a new movie
     * parameters: movie
     * produces: 
     */
    post: function addMovie(req, res) {
        res.sendStatus(501);
    }
    
};
