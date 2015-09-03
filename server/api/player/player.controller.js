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
var JugadorObjeto = sqldb.JugadorObjeto;

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
                    where: {id : req.params.id} })
    .then(function(jugador) {
      res.json(jugador);
    }, function(error){
      console.log("Jugador.findById() -> ERROR = " + error);
      res.status(500).end();
    });
};

// Put new skill to player
exports.setSkill = function(req, res) {
  JugadorHabilidad.findAll({ include: [{all : true}],
                              where: {
                                jugador_id : req.params.id,
                                habilidad_id : req.body.id
                              }
                             })
    .then(function(jugadorHabilidad){
        // Si ya existe la relación se aumenta la cantidad
        if (jugadorHabilidad.length > 0) {
          jugadorHabilidad[0].cantidad++;
          jugadorHabilidad[0].modificacion = new Date();
          jugadorHabilidad[0].save()
            .then(function(response){
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
              console.log("JugadorHabilidad.updateAttributes() -> ERROR = " + error);
              res.status(500).end();
            });
        } else {
          // Si no existe se crea
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
        }
    }, function(error){
      console.log("JugadorHabilidad.findAll() -> ERROR = " + error);
      res.status(500).end();
    });
};

// Put new item to player
exports.setItem = function(req, res) {
  JugadorObjeto.findAll({ include: [{all : true}],
                              where: {
                                jugador_id : req.params.id,
                                objeto_id : req.body.id
                              }
                             })
    .then(function(jugadorObjeto){
        // Si ya existe la relación no se hace nada
        if (jugadorObjeto.length > 0) {
          res.status(200).end();
        } else {
          // Si no existe se crea
          JugadorObjeto.create({
            jugador_id: req.params.id,
            objeto_id: req.body.id,
            creacion: new Date(),
            modificacion: new Date()
          }).then(function(jugadorObjeto){
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
            console.log("JugadorObjeto.create() -> ERROR = " + error);
            res.status(500).end();
          })
        }
    }, function(error){
      console.log("JugadorObjeto.findAll() -> ERROR = " + error);
      res.status(500).end();
    });
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
