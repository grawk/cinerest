var path = require('path');
var db = require(path.resolve(__dirname, 'lib/database'));
var mongoose = db.mongoose;
var movie = require('./models/movie');
movie.remove(function (err, result) {
    console.log('err', err);
    console.log('result', result);
    mongoose.connection.close();
});