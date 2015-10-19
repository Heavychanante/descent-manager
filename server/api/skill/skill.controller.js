/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/skills              ->  index
 */

'use strict';

var _     = require('lodash');
var sqldb = require('../../sqldb');
var config = require('../../config/environment');

// Entidades de base de datos
var Habilidad = sqldb.Habilidad;
var Jugador   = sqldb.Jugador;
var Clase     = sqldb.Clase;

// Gets a list of Skills
exports.index = function(req, res) {
  Habilidad.findAll({ include: [{ all: true }] })
    .then(function(habilidades) {
      res.json(habilidades);
    }, function(error){
      console.log("Habilidad.findAll() -> " + error);
      res.status(500).end();
    })
};

exports.habilidadesAsignables = function(req, res) {
  Jugador.findAll({ include: [{all : true}],
                    where: {id : req.params.id} })
    .then(function(jugadores) {
      if (jugadores.length > 0) {
        Habilidad.findAll({
            include: [{
              model: Clase,
              where: {
                id: jugadores[0].Clase.id
              }
            }]
          }).then(function(habilidades) {
            res.json(habilidades);
          }, function(error){
            console.log("Habilidad.findAll() -> " + error);
            res.status(500).end();
          })
      } else {
        res.json(jugadores);
      }
    }, function(error){
      console.log("Jugador.findById() -> ERROR = " + error);
      res.status(500).end();
    });
};
