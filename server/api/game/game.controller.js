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
    usuario_id: gameUser.id,
    activa: '1'
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
                    where: {usuario_id: req.params.id,
                            activa: '1'},
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
  Partida.findAll({ where: {id: req.params.id} })
    .then(function(partida) {
      if (partida.length == 0) {
        console.log("Partida con id = " + req.params.id + " no encontrada");
        res.status(404).end();
      } else {
        partida[0].activa = '0';
        partida[0].modificacion = new Date();
        partida[0].save().then(function(){
          res.status(200).end();
        }, function(error){
          console.log("Partida.save() -> ERROR = " + error);
          res.status(500).end();
        });
      }
    }, function(error){
      console.log("Partida.findAll() -> ERROR = " + error);
      res.status(500).end();
    });
};

/*
exports.deleteGame = function(req, res) {
  var partidaId = req.params.id;
  console.log("PARTIDA = " + partidaId);
  var jugadorPromises     = [];
  var aventuraPromise     = [];

  // Se eliminan los jugadores de la partida
  Jugador.findAll({where: {partida_id: partidaId}})
    .then(function(jugadores) {
      if (jugadores.length > 0) {
        // Se borran los jugadores
        for (var i=0; i < jugadores.length; i++) {
          var jugador = jugadores[i];
          var habilidadesPromises = [];
          var objetosPromises     = [];
          console.log('JUGADOR A BORRAR = ' + jugador.id);

          // Se borran las habilidades del jugador
          JugadorHabilidad.findAll({ where: {jugador_id: jugador.id} })
            .then(function(jugadorHabilidad){
              if (jugadorHabilidad.length > 0) {
                for (var j=0; j < jugadorHabilidad.length; j++) {
                  console.log('(' + jugadorHabilidad[j].jugador_id + ') HABILIDAD BORRADA = ' + jugadorHabilidad[j].habilidad_id);
                  habilidadesPromises.push(jugadorHabilidad[j].destroy());
                }
              }
            }, function(error) {
              console.log("JugadorHabilidad.findAll() -> ERROR = " + error);
              res.status(500).end();
            });

          // Se borran los objetos del jugador
          JugadorObjeto.findAll({ where: {jugador_id: jugador.id} })
            .then(function(jugadorObjeto){
              if (jugadorObjeto.length > 0) {
                for (var k=0; k < jugadorObjeto.length; k++) {
                  console.log('(' + jugadorObjeto[k].jugador_id + ') OBJETO BORRADO = ' + jugadorObjeto[k].objeto_id);
                  objetosPromises.push(jugadorObjeto[k].destroy());
                }
              }
            }, function(error){
              console.log("JugadorObjeto.findAll() -> ERROR = " + error);
              res.status(500).end();
            });

          // Se borra el jugador
          q.allSettled(habilidadesPromises.concat(objetosPromises))
            .then(function(){
              Jugador.findAll({ where: {id: jugador.id} })
                .then(function(player){
                  if (player.length > 0) {
                    console.log('JUGADOR BORRADO = ' + player[0].id);
                    jugadorPromises.push(player[0].destroy());
                  }
                }, function(error) {
                  console.log("habilidadesPromises & objetosPromises -> ERROR = " + error);
                  res.status(500).end();
                });
            }, function(error){
              console.log("Jugador.findAll() -> ERROR = " + error);
              res.status(500).end();
            });
        }
      }

      // Antes de borrar la partida se espera a que se hayan borrado todos los jugadores
      console.log("JUGADOR PROMISES = " + jugadorPromises);
      q.allSettled(jugadorPromises).then(function() {
        console.log("JUGADORES BORRADOS");
        // Se borran las aventuras de la partida
        AventuraPartida.findAll({ where: {partida_id: partidaId} })
          .then(function(aventuraPartida) {
            if (aventuraPartida.length > 0) {
              for (var n=0; n < aventuraPartida.length; n++) {
                console.log('AVENTURA BORRADA = ' + aventuraPartida[n].aventura_id);
                aventuraPromise.push(aventuraPartida[n].destroy());
              }
            }
          }, function(error) {
            console.log("AventuraPartida.destroy() -> ERROR = " + error);
            res.status(500).end();
          });

        // Finalmente se borra la partida
        q.allSettled(aventuraPromise).then(function(){
          Partida.findAll({ where: {id: partidaId} })
            .then(function(partida){
              if (partida.length > 0) {
                partida[0].destroy().then(function(){
                  // Borrado Ok
                  res.status(200).end();
                }, function(error){
                  console.log("Partida.destroy() -> ERROR = " + error);
                  res.status(500).end();
                });
              } else {
                console.log("Partida no encontrada: " + partidaId);
                res.status(404).end();
              }
            }, function(error){
              console.log("Partida.findAll() -> ERROR = " + error);
              res.status(500).end();
            });
        }, function(error){
          console.log("AventuraPromise -> ERROR = " + error);
          res.status(500).end();
        });
      }, function(error) {
          console.log("JugadorPromises -> ERROR = " + error);
          res.status(500).end();
      });

    }, function(error){
      console.log("Jugador.findAll() -> ERROR = " + error);
      res.status(500).end();
    });
};
*/
