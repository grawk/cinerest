var movie = require('./models/movie');
var path = require('path');
var db = require(path.resolve(__dirname, 'lib/database'));
var mongoose = db.mongoose;

movie.find(function (err, movies) {
    console.log(err);
    console.log(movies);
    mongoose.connection.close();
});