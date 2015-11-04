var Client = require('node-rest-client').Client;
var apikey = process.env.gmapskey;

client = new Client();

var placesargs = {
    parameters: {
        location: "37.3782561802915,-121.9214399197085",
        radius: "5000",
        type: "movie_theater",
        name: "",
        key: apikey
    }
};
// registering remote methods
client.registerMethod("getPlaces", "https://maps.googleapis.com/maps/api/place/nearbysearch/json", "DELETE");

client.methods.getPlaces(placesargs, function (data, response) {
    // parsed response body as js object
    console.log(JSON.parse(data.toString()));
});

client.registerMethod("reverseGeocode", "https://maps.googleapis.com/maps/api/geocode/json", "GET");

//var revGeocodeArgs = {
//    parameters: {
//        address: "2211 N. 1st St, San Jose, CA",
//        key: apikey
//    }
//};
//
//client.methods.reverseGeocode(revGeocodeArgs, function (data, response) {
//    var json = JSON.parse(data.toString());
//    var geometry = json.results[0].geometry;
//    console.log(geometry);
//});
