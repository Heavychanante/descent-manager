'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var skillCtrlStub = {
  index: 'skillCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var skillIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './skill.controller': skillCtrlStub
});

describe('Skill API Router:', function() {

  it('should return an express router instance', function() {
    skillIndex.should.equal(routerStub);
  });

  describe('GET /api/skills', function() {

    it('should route to skill.controller.index', function() {
      routerStub.get
                .withArgs('/', 'skillCtrl.index')
                .should.have.been.calledOnce;
    });

  });

});
