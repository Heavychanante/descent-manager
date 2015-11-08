'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var config = require('../../config/environment');

// Entidades de base de datos
var Personaje = sqldb.Personaje;
var Arquetipo = sqldb.Arquetipo;

// Get list of characters
exports.index = function(req, res) {
  Personaje.findAll({ include: [{ model: Arquetipo }] })
    .then(function(personajes) {
      res.json(personajes);
    }, function(error){
      console.log("Personaje.findAll() -> " + error);
      res.status(500).end();
    })
};
