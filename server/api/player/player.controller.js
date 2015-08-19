/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/players              ->  index
 */

'use strict';


var _     = require('lodash');
var mysql = require('mysql');
var config = require('../../config/environment');

// Conexión con la base de datos
var connection = mysql.createConnection(config.mysql);

// Se abre una conexión con la base de datosconnection.connect(function(err) {
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

// Get list of jugadores
exports.index = function(req, res) {
  connection.query('SELECT * FROM jugador', function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
};
