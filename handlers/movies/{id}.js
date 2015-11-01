'use strict';

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
        res.sendStatus(501);
    }, 
    
    /**
     * Edits a movie
     * parameters: movie
     * produces: 
     */
    post: function editMovie(req, res) {
        res.sendStatus(501);
    }, 
    
    /**
     * deletes a single movie based on the ID supplied
     * parameters: id
     * produces: 
     */
    delete: function deleteMovie(req, res) {
        res.sendStatus(501);
    }
    
};
