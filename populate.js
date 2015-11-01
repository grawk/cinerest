var data = require('./data');
var path = require('path');
var db = require(path.resolve(__dirname, 'lib/database'));
var mongoose = db.mongoose;

data.add('movie');
mongoose.connection.close();