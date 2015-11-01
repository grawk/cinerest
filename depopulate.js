var db = require('./lib/database');
var movie = require('./models/movie');
movie.remove(function (err, result) {
    console.log('err', err);
    console.log('result', result);
});