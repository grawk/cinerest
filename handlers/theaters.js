'use strict';
/**
 * Operations on /theaters
 */
var Client = require('node-rest-client').Client;
var apikey = process.env.gmapskey;

var client = new Client();


// registering remote methods
client.registerMethod('getTheaters', 'https://maps.googleapis.com/maps/api/place/nearbysearch/json', 'GET');
client.registerMethod('getDistanceMatrix', 'https://maps.googleapis.com/maps/api/distancematrix', 'GET');

module.exports = {
    /**
     *
     * parameters: location, radius
     * produces:
     */
    get: function (req, res) {
        var args = {
            parameters: {
                location: '0,0',
                radius: '0',
                type: 'movie_theater',
                name: '',
                key: apikey
            }
        };

        var location = req.query.location;
        var radius = req.query.radius;
        args.parameters.location = location;
        args.parameters.radius = radius;
        console.log(args);
        client.methods.getTheaters(args, function (data, response) {
            // parsed response body as js object
            var json = JSON.parse(data.toString());

            //create map of theaters keyed from lat/long
            console.log(json);
            res.status(200).json([{
                name: 'Century 4 Theaters',
                address: '123 fake rd',
                distance: 25
            }, {
                name: 'Century 5 Theaters',
                address: '124 fake rd',
                distance: 30
            }]);
        });


    }
};