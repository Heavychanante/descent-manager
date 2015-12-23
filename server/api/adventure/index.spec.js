'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var adventureCtrlStub = {
  index: 'adventureCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var adventureIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './adventure.controller': adventureCtrlStub
});

describe('Adventure API Router:', function() {

  it('should return an express router instance', function() {
    adventureIndex.should.equal(routerStub);
  });

  describe('GET /api/adventures', function() {

    it('should route to adventure.controller.index', function() {
      routerStub.get
        .withArgs('/', 'adventureCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
