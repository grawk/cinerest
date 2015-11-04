'use strict';
var path = require('path');
var movieModel = require(path.resolve(__dirname, '../../models/movie'));
/**
 * Operations on /movies/{id}
 */
module.exports = {
    /**
     * Returns a movie based on a single ID
     * parameters: id
     * produces: 
     */
    get: function findMovieById(req, res) {
        var id = req.params.id;
        movieModel.find({ _id: id }, function (err, movie) {
            res.status(200).json(movie);
        });
    },
    /**
     * Edits a movie
     * parameters: movie
     * produces: 
     */
    put: function editMovie(req, res) {
        var id = req.params.id;
        var name = req.body.name;
        movieModel.update({ _id: id }, { $set: { name: name } }, function (err, result) {
            if (err) {
                return res.status(500).json({
                    name: err.name,
                    message: err.message
                });
            }
            res.status(200).json({ numberModified: result.nModified });
        });
    },
    /**
     * deletes a single movie based on the ID supplied
     * parameters: id
     * produces: 
     */
    delete: function deleteMovie(req, res) {
        var id = req.params.id;
        movieModel.remove({ _id: id }, function (err, result) {
            if (err) {
                return res.status(500).json({
                    name: err.name,
                    message: err.message
                });
            }
            res.status(204).json({ numberModified: result.result.n });
        });
    }
};