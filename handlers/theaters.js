'use strict';
/**
 * Operations on /theaters
 */
var Client = require('node-rest-client').Client;
var apikey = process.env.gmapskey;

var client = new Client();


// registering remote methods
client.registerMethod('getTheaters', 'https://maps.googleapis.com/maps/api/place/nearbysearch/json', 'GET');
client.registerMethod('getDistanceMatrix', 'https://maps.googleapis.com/maps/api/distancematrix/json', 'GET');

module.exports = {
    /**
     *
     * parameters: location, radius
     * produces:
     */
    get: function (req, res) {
        var location = req.query.location;
        var radius = req.query.radius;
        var args = {
            parameters: {
                location: location,
                radius: radius,
                type: 'movie_theater',
                name: '',
                key: apikey
            }
        };

        client.methods.getTheaters(args, function (data, response) {
            // parsed response body as js object
            var json = JSON.parse(data.toString());
            var theaters = json.results;
            var latLongMap = {};
            var latLongArray = [];
            var responseArray = [];
            theaters.map(function (theater) {
                var latLongKey = theater.geometry.location.lat + ',' + theater.geometry.location.lng;
                //theater.geometry.location.{lat|lng}
                //theater.name
                latLongMap[latLongKey] = {theater: theater};
                latLongArray.push(latLongKey);
            });
            var args = {
                parameters: {
                    origins: location,
                    destinations: latLongArray.join('|'),
                    key: apikey
                }
            };
            client.methods.getDistanceMatrix(args, function (data, response) {
                var json = JSON.parse(data.toString());
                //json.rows[0].elements {Array}, one entry per theater
                latLongArray.map(function (latLongKey) {
                    latLongMap[latLongKey]['vector'] = json.rows[0].elements.shift();
                    var combined = latLongMap[latLongKey];
                    responseArray.push({
                        name: combined.theater.name,
                        address: combined.theater.vicinity,
                        duration: combined.vector.duration.value
                    });
                });

                res.status(200).json(responseArray);
            });

        });


    }
};