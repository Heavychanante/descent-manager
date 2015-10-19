'use strict';

var app = require('../../app');
var request = require('supertest');

describe('Skill API:', function() {

  describe('GET /api/skills', function() {
    var skills;

    beforeEach(function(done) {
      request(app)
        .get('/api/skills')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          skills = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      skills.should.be.instanceOf(Array);
    });

  });

});
