/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/items              ->  index
 */

'use strict';

var _     = require('lodash');
var sqldb = require('../../sqldb');
var config = require('../../config/environment');

// Entidades de base de datos
var Objeto   = sqldb.Objeto;
var JugadorObjeto = sqldb.JugadorObjeto;

// Gets a list of Items
exports.index = function(req, res) {
  Objeto.findAll({ include: [{all : true}] })
    .then(function(objetos) {
      res.json(objetos);
    }, function(error){
      console.log("Objeto.findAll() -> ERROR = " + error);
      res.status(500).end();
    });
};

// Objetos asignables a un jugador
exports.objetosAsignables = function(req, res) {
  res.json([]);
};
