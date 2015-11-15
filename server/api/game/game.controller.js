'use strict';

var _     = require('lodash');
var q     = require('q');
var sqldb = require('../../sqldb');
var config = require('../../config/environment');

// Entidades de base de datos
var Partida          = sqldb.Partida;
var Jugador          = sqldb.Jugador;
var Habilidad        = sqldb.Habilidad;
var JugadorHabilidad = sqldb.JugadorHabilidad;
var JugadorObjeto    = sqldb.JugadorObjeto;
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

    // Si todo ha ido Ok, se devuelve el identificador de la partida creada
    res.status(200).send({id: partida.id});
  }, function(error) {
    console.log("Partida.create() -> ERROR = " + error);
    res.status(500).end();
  });
};

// Find games by user
exports.getUserGames = function(req, res) {
  Partida.findAll({ include: [{all : true}],
                    where: {usuario_id: req.params.id},
                    order: 'modificacion desc'})
    .then(function(partidas) {
      res.json(partidas);
    }, function(error){
      console.log("Partida.findAll() -> ERROR = " + error);
      res.status(500).end();
    });
};

// Delete a game
exports.deleteGame = function(req, res) {
  var jugadorHabilidadPromises = [];
  var jugadorObjetoPromises    = [];
  var jugadorPromises          = [];

  // Se eliminan los jugadores de la partida
  Jugador.findAll({where: {partida_id: req.params.id}})
    .then(function(jugadores) {
      if (jugadores.length == 0) {
        // Se borran las aventuras de la partida
        AventuraPartida.destroy({ where: {partida_id: req.params.id} })
          .then(function(){
            // Finalmente se borra la partida
            Partida.destroy({ where: {id: req.params.id} })
              .then(function() {
                // Borrado Ok
                res.status(200).end();
              }, function(error) {
                console.log("Partida.destroy() -> ERROR = " + error);
                res.status(500).end();
              });
          }, function(error) {
            console.log("AventuraPartida.destroy() -> ERROR = " + error);
            res.status(500).end();
          });
      } else {
        for (var i=0; i < jugadores.length; i++) {
          // Se borran las habilidades
          var jugadorHabilidadPromise = JugadorHabilidad.destroy({ where: {jugador_id : jugadores[i].id} });
          jugadorHabilidadPromises.push(jugadorHabilidadPromise);

          // Se borran los objetos
          var jugadorObjetoPromise = JugadorObjeto.destroy({ where: {jugador_id : jugadores[i].id} });
          jugadorObjetoPromises.push(jugadorObjetoPromise);

          // Se borra el Jugador
          var jugadorPromise = jugadores[i].destroy({ where: {id: jugadores[i].id} });
          jugadorPromises.push(jugadorPromise);
        }

        var all = [];
        all.push(q.all(jugadorHabilidadPromises));
        all.push(q.all(jugadorObjetoPromises));
        q.all(all).then(function() {
          q.all(jugadorPromises).then(function() {
              // Se borran las aventuras de la partida
              AventuraPartida.destroy({ where: {partida_id: req.params.id} })
                .then(function(){
                  // Finalmente se borra la partida
                  Partida.destroy({ where: {id: req.params.id} })
                    .then(function() {
                      // Borrado Ok
                      res.status(200).end();
                    }, function(error) {
                      console.log("Partida.destroy() -> ERROR = " + error);
                      res.status(500).end();
                    });
                }, function(error) {
                  console.log("AventuraPartida.destroy() -> ERROR = " + error);
                  res.status(500).end();
                });
            }, function(error) {
              console.log("Jugador.destroy() -> ERROR = " + error);
              res.status(500).end();
            });
        }, function(error){
          console.log("JugadorHabilidad.destroy() & JugadorObjeto.destroy() -> ERROR = " + error);
          res.status(500).end();
        })
      }

    }, function(error){
      console.log("Jugador.findAll() -> ERROR = " + error);
      res.status(500).end();
    });
};
