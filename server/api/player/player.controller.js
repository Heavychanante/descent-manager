/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/players              ->  index
 */

'use strict';


var _     = require('lodash');
var sqldb = require('../../sqldb');
var config = require('../../config/environment');

// Entidades de base de datos
var Jugador   = sqldb.Jugador;

// Get list of jugadores
exports.index = function(req, res) {
  Jugador.findAll({ include: [{all : true}] })
    .then(function(jugadores) {
      res.json(jugadores);
    }, function(error){
      console.log("Jugador.findAll() -> ERROR = " + error);
      res.send(500);
    })
};
