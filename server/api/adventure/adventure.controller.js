'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var config = require('../../config/environment');

// Entidades de base de datos
var Aventura 		= sqldb.Aventura;
var AventuraPartida = sqldb.AventuraPartida;

// Gets a list of Adventuras
export function index(req, res) {
  Aventura.findAll({ order: 'id asc' })
    .then(function(aventuras) {
      res.json(aventuras);
    }, function(error){
      console.log("Aventura.findAll() -> " + error);
      res.status(500).end();
    })
}

// Get adventures from a game
export function getGameAdventures(req, res) {
	AventuraPartida.findAll({ where: {partida_id : req.params.id},
                            order: 'aventura_id asc' })
		.then(function(aventuraPartida) {
			res.status(200).json(aventuraPartida);
		}, function(error) {
			console.log("AventuraPartida.findAll() -> " + error);
      res.status(500).end();
		});
}

// Update a game adventures
export function updateAdventures(req, res) {
  var gameId    = req.params.id;
  var adventure = req.body;

  if (adventure.activa) {
    // Se marcan todas las aventuras como inactivas
    sqldb.sequelize.query("UPDATE aventura_partida SET activa = 0 WHERE partida_id = " + gameId)
      .spread(function(results, metadata) {
        // Se actualizan los parámetros de la aventura en concreto
        AventuraPartida.findAll({ where: {partida_id  : gameId,
                                          aventura_id : adventure.id } })
          .then(function(aventuraPartida) {
            if (aventuraPartida.length == 0) {
              // Si no existe la relación se crea
              AventuraPartida.create({
                partida_id: gameId,
                aventura_id: adventure.id,
                ganadores: adventure.ganada,
                activa: adventure.activa
              }).then(function() {
                res.status(200).end();
              }, function(error) {
                console.log("AventuraPartida.create() -> " + error);
                res.status(500).end();
              });
            } else {
              aventuraPartida[0].activa       = adventure.activa;
              aventuraPartida[0].ganadores    = adventure.ganada;
              aventuraPartida[0].modificacion = new Date();
              aventuraPartida[0].save().then(function() {
                res.status(200).end();
              }, function(error) {
                console.log("AventuraPartida.save() -> " + error);
                res.status(500).end();
              });
            }
          }, function(error) {
            console.log("AventuraPartida.findAll() -> " + error);
            res.status(500).end();
          });
      }, function(error) {
        console.log("UPDATE aventura_partida -> " + error);
        res.status(500).end();
      })
  } else {
    // Se actualizan los parámetros de la aventura en concreto
    AventuraPartida.findAll({ where: {partida_id  : gameId,
                                      aventura_id : adventure.id } })
       .then(function(aventuraPartida) {
         if (aventuraPartida.length == 0) {
           console.log("No se ha encontrado la aventura " + gameId + " para la partida " + adventure.id);
           res.status(403).end();
         } else {
           aventuraPartida[0].activa       = adventure.activa;
           aventuraPartida[0].ganadores    = adventure.ganada;
           aventuraPartida[0].modificacion = new Date();
           aventuraPartida[0].save().then(function() {
             res.status(200).end();
           }, function(error) {
             console.log("AventuraPartida.save() -> " + error);
             res.status(500).end();
           });
         }
       }, function(error) {
         console.log("AventuraPartida.findAll() -> " + error);
         res.status(500).end();
       });
  }
}
