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
var JugadorHabilidad = sqldb.JugadorHabilidad;

// Get list of jugadores
exports.index = function(req, res) {
  Jugador.findAll({ include: [{all : true}] })
    .then(function(jugadores) {
      res.json(jugadores);
    }, function(error){
      console.log("Jugador.findAll() -> ERROR = " + error);
      res.status(500).end();
    });
};

// Get player by id
exports.findById = function(req, res) {
  Jugador.findAll({ include: [{all : true}],
                    where: {id : req.params.id}})
    .then(function(jugador) {
      res.json(jugador);
    }, function(error){
      console.log("Jugador.findById() -> ERROR = " + error);
      res.status(500).end();
    });
};

// Get new skill to player
exports.setSkill = function(req, res) {
  JugadorHabilidad.create({
    jugador_id: req.params.id,
    habilidad_id: req.body.id,
    cantidad: 1,
    creacion: new Date(),
    modificacion: new Date()
  }).then(function(jugadorHabilidad){
    // Send the updated player
    Jugador.findAll({ include: [{all : true}],
                      where: {id : req.params.id}})
      .then(function(jugador) {
        res.json(jugador);
      }, function(error){
        console.log("Jugador.findById() -> ERROR = " + error);
        res.status(500).end();
      });
  }, function(error){
    console.log("JugadorHabilidad.create() -> ERROR = " + error);
    res.status(500).end();
  })
};

// Update a player
exports.update = function(req, res) {
  /**
  console.log(req.body.id);

  Jugador.findAll({ include: [{all : true}],
                    where: {id : req.body.id}})
    .then(function(jugador) {
      console.log(jugador);
      jugador.updateAttributes(
        { modificacion: new Date() },
        { Habilidads: req.body.Habilidads })
        .then(function() {
            res.status(200).end();
          }, function(error){
            console.log("Jugador.updateAttributes() -> ERROR = " + error);
            res.status(500).send(error.message);
          })
    }, function(error){
      console.log("Jugador.findAll() -> ERROR = " + error);
      res.status(500).send(error.message);
    })
    */
};
