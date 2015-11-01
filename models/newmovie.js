'use strict';

function NewMovie(options) {
    if (!options) {
        options = {};
    }
    
    this.name = options.name;
    this.tag = options.tag;
}

module.exports = NewMovie;
