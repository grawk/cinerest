var movie = require('./models/movie');

movie.find(function (err, movies) {
    console.log(err);
    console.log(movies);
});