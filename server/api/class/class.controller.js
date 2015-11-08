'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var config = require('../../config/environment');

// Entidades de base de datos
var Clase     = sqldb.Clase;
var Arquetipo = sqldb.Arquetipo;

// Get list of classes
exports.index = function(req, res) {
  Clase.findAll({ include: [ { model: Arquetipo } ] })
    .then(function(clases) {
      res.json(clases);
    }, function(error){
      console.log("Clase.findAll() -> " + error);
      res.status(500).end();
    })
};
