'use strict';

var _     = require('lodash');
var sqldb = require('../../sqldb');
var config = require('../../config/environment');

// Entidades de base de datos
var Partida          = sqldb.Partida;
var Jugador          = sqldb.Jugador;
var Habilidad        = sqldb.Habilidad;
var JugadorHabilidad = sqldb.JugadorHabilidad;
var AventuraPartida  = sqldb.AventuraPartida;

// Get list of games
exports.index = function(req, res) {
  Partida.findAll({ include: [{all : true}] })
    .then(function(partidas) {
      res.json(partidas);
    }, function(error){
      console.log("Partida.findAll() -> ERROR = " + error);
      res.status(500).end();
    });
};

// Creates a new game
exports.createGame = function(req, res) {
  var gameName    = req.body.name;
  var gameUser    = req.body.user;
  var gamePlayers = req.body.players;

  // Primero se crea la partida
  Partida.create({
    nombre: gameName,
    usuario_id: gameUser.id
  }).then(function(partida) {

    // Una vez creada la partida se asocia a la primera aventura
    AventuraPartida.create({
      aventura_id: 1, // Por defecto se juega la aventura "Primera Sangre"
      partida_id: partida.id,
      activa: 1 // La partida se marca como activa por defecto
    }).then(function(response) {
      // Ok
    }, function(error) {
      console.log("AventuraPartida.create() -> ERROR = " + error);
      res.status(500).end();
    })

    // Despues se crean los jugadores
    for (var i=0; i < gamePlayers.length; i++) {
      Jugador.create({
        alias: gamePlayers[i].alias,
        vida: gamePlayers[i].personaje.vida,
        aguante: gamePlayers[i].personaje.aguante,
        personaje_id: gamePlayers[i].personaje.id,
        clase_id: gamePlayers[i].clase.id,
        partida_id: partida.id
      }).then(function(jugador) {

        // Se le asignan las habilidades de nivel 0 al jugador en base a su clase
        Habilidad.findAll({ attributes: ['id'],
                            where: {clase_id : jugador.clase_id,
                                    coste_experiencia : 0} })
           .then(function(habilidades) {
              for (var j=0; j < habilidades.length; j++) {
                JugadorHabilidad.create({
                  jugador_id: jugador.id,
                  habilidad_id: habilidades[j].id
                }).then(function(response) {
                  // Ok
                }, function(error) {
                  console.log("JugadorHabilidad.create() -> ERROR = " + error);
                  res.status(500).end();
                });
              }
             }, function(error) {
               console.log("Habilidad.findAll() -> ERROR = " + error);
               res.status(500).end();
             });
      }, function(error) {
        console.log("Jugador.create() -> ERROR = " + error);
        res.status(500).end();
      });
    }

    // Si todo ha ido Ok, se devuelve la respuesta
    res.status(200).end();
  }, function(error) {
    console.log("Partida.create() -> ERROR = " + error);
    res.status(500).end();
  });
};
