'use strict';
var path = require('path');
var MovieModel = require(path.resolve(__dirname, '../models/movie'));
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
        var pageSize = 6;
        var currentPage = req.query.page || 1;
        MovieModel.find().skip(pageSize*(currentPage-1)).limit(pageSize).exec(function (err, movies) {
            var movieList = {
                page: currentPage,
                list: movies
            };
            res.status(200).json(movieList);
        });

    }, 
    
    /**
     * Creates a new movie
     * parameters: movie
     * produces: 
     */
    post: function addMovie(req, res) {
        var movieName = req.body.name;
        (new MovieModel({name: movieName})).save(function (err, result) {
            console.log('err', err);
            console.log('result', result);
            res.status(200).json({result: result});
        });

    }
    
};
