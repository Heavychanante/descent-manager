'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var config = require('../../config/environment');

// Entidades de base de datos
var Aventura 		= sqldb.Aventura;
var AventuraPartida = sqldb.AventuraPartida;

// Gets a list of Adventuras
export function index(req, res) {
  Aventura.findAll()
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
                            order: 'id asc' })
		.then(function(aventuraPartida) {
			res.status(200).json(aventuraPartida);
		}, function(error) {
			console.log("AventuraPartida.findAll() -> " + error);
      		res.status(500).end();
		});
}
