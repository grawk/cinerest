'use strict';

var test = require('tape'),
    path = require('path'),
    express = require('express'),
    enjoi = require('enjoi'),
    swaggerize = require('swaggerize-express'),
    request = require('supertest');

test('api', function (t) {
    var app = express();

    
    app.use(require('body-parser')());

    app.use(swaggerize({
        api: require('./../config/api.json'),
        handlers: path.join(__dirname, '../handlers')
    }));

    
    t.test('test get /movies', function (t) {
        
        var responseSchema = enjoi({
            'type': "array", 
            'items': {"$ref":"#/definitions/Movie"}
        }, {
            '#': require('../config/api.json')
        });
        

        request(app).get('/api/movies')
        .end(function (err, res) {
            t.ok(!err, 'get /movies no error.');
            t.strictEqual(res.statusCode, 200, 'get /movies 200 status.');
            responseSchema.validate(res.body, function (error) {
                t.ok(!error, 'Response schema valid.');
            });
            t.end();
        });
    });
    
    t.test('test post /movies', function (t) {
        
        var body = {
            'name': "helloworld"
        };
        
        var responseSchema = enjoi({
            '$ref': "#/definitions/Movie"
        }, {
            '#': require('../config/api.json')
        });
        

        request(app).post('/api/movies').send(body)
        .end(function (err, res) {
            t.ok(!err, 'post /movies no error.');
            t.strictEqual(res.statusCode, 200, 'post /movies 200 status.');
            responseSchema.validate(res.body, function (error) {
                t.ok(!error, 'Response schema valid.');
            });
            t.end();
        });
    });
    

});
