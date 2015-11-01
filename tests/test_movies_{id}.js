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

    
    t.test('test get /movies/{id}', function (t) {
        
        var responseSchema = enjoi({
            '$ref': "#/definitions/Movie"
        }, {
            '#': require('../config/api.json')
        });
        

        request(app).get('/api/movies/1')
        .end(function (err, res) {
            t.ok(!err, 'get /movies/{id} no error.');
            t.strictEqual(res.statusCode, 200, 'get /movies/{id} 200 status.');
            responseSchema.validate(res.body, function (error) {
                t.ok(!error, 'Response schema valid.');
            });
            t.end();
        });
    });
    
    t.test('test post /movies/{id}', function (t) {
        
        var body = {
            'id': 1, 
            'name': "helloworld"
        };
        
        var responseSchema = enjoi({
            '$ref': "#/definitions/Movie"
        }, {
            '#': require('../config/api.json')
        });
        

        request(app).post('/api/movies/{id}').send(body)
        .end(function (err, res) {
            t.ok(!err, 'post /movies/{id} no error.');
            t.strictEqual(res.statusCode, 200, 'post /movies/{id} 200 status.');
            responseSchema.validate(res.body, function (error) {
                t.ok(!error, 'Response schema valid.');
            });
            t.end();
        });
    });
    
    t.test('test delete /movies/{id}', function (t) {
        

        request(app).delete('/api/movies/1')
        .end(function (err, res) {
            t.ok(!err, 'delete /movies/{id} no error.');
            t.strictEqual(res.statusCode, 204, 'delete /movies/{id} 204 status.');
            t.end();
        });
    });
    

});
