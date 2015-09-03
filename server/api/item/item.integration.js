'use strict';

var app = require('..\..\app');
var request = require('supertest');

describe('Item API:', function() {

  describe('GET /api/items', function() {
    var items;

    beforeEach(function(done) {
      request(app)
        .get('/api/items')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          items = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      items.should.be.instanceOf(Array);
    });

  });

});
