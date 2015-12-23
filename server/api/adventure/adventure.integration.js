'use strict';

var app = require('../..');
import request from 'supertest';

describe('Adventure API:', function() {

  describe('GET /api/adventures', function() {
    var adventures;

    beforeEach(function(done) {
      request(app)
        .get('/api/adventures')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          adventures = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      adventures.should.be.instanceOf(Array);
    });

  });

});
