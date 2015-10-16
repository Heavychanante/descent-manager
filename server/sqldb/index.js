/**
 * Sequelize initialization module
 */

'use strict';

var path = require('path');
var config = require('../config/environment');

var Sequelize = require('sequelize');

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Fichero          = db.sequelize.import('../model/Fichero');
db.Usuario          = db.sequelize.import('../model/Usuario');
db.Arquetipo        = db.sequelize.import('../model/Arquetipo');
db.Aventura         = db.sequelize.import('../model/Aventura');
db.AventuraPartida  = db.sequelize.import('../model/AventuraPartida');
db.Partida          = db.sequelize.import('../model/Partida');
db.Clase            = db.sequelize.import('../model/Clase');
db.Dado             = db.sequelize.import('../model/Dado');
db.DadoHabilidad    = db.sequelize.import('../model/DadoHabilidad');
db.Habilidad        = db.sequelize.import('../model/Habilidad');
db.Objeto           = db.sequelize.import('../model/Objeto');
db.DadoObjeto       = db.sequelize.import('../model/DadoObjeto');
db.Personaje        = db.sequelize.import('../model/Personaje');
db.Rol              = db.sequelize.import('../model/Rol');
db.Jugador          = db.sequelize.import('../model/Jugador');
db.JugadorHabilidad = db.sequelize.import('../model/JugadorHabilidad');
db.JugadorObjeto    = db.sequelize.import('../model/JugadorObjeto');


////////////////////////////  FOREIGN KEYS //////////////////////////////

// 1:1
db.Fichero.hasMany(db.Arquetipo, {foreignKey : 'fichero_id'});
db.Arquetipo.belongsTo(db.Fichero, {foreignKey: 'fichero_id'});

// 1:N
db.Aventura.hasOne(db.Aventura, {foreignKey : 'aventura_id'});
db.Aventura.belongsTo(db.Aventura, {foreignKey : 'aventura_id'});

// M:N
db.Aventura.belongsToMany(db.Partida, {through: 'AventuraPartida', foreignKey: 'aventura_id'});
db.Partida.belongsToMany(db.Aventura, {through: 'AventuraPartida', foreignKey: 'partida_id'});

// 1:N
db.Arquetipo.hasMany(db.Clase, {foreignKey : 'arquetipo_id'});
db.Clase.belongsTo(db.Arquetipo, {foreignKey : 'arquetipo_id'});

// 1:N
db.Clase.hasMany(db.Habilidad, {foreignKey : 'clase_id'});
db.Habilidad.belongsTo(db.Clase, {foreignKey : 'clase_id'});

// M:N
db.Dado.belongsToMany(db.Habilidad, {through: 'DadoHabilidad', foreignKey: 'dado_id'});
db.Habilidad.belongsToMany(db.Dado, {through: 'DadoHabilidad', foreignKey: 'habilidad_id'});

// 1:N
db.Fichero.hasMany(db.Objeto, {foreignKey : 'fichero_id'});
db.Objeto.belongsTo(db.Fichero, {foreignKey : 'fichero_id'});

// M:N
db.Dado.belongsToMany(db.Objeto, {through: 'DadoObjeto', foreignKey: 'dado_id'});
db.Objeto.belongsToMany(db.Dado, {through: 'DadoObjeto', foreignKey: 'objeto_id'});

// 1:N
db.Arquetipo.hasMany(db.Personaje, {foreignKey : 'arquetipo_id'});
db.Personaje.belongsTo(db.Arquetipo, {foreignKey : 'arquetipo_id'});

// 1:N
db.Rol.hasMany(db.Jugador, {foreignKey : 'rol_id'});
db.Jugador.belongsTo(db.Rol, {foreignKey : 'rol_id'});

// 1:N
db.Personaje.hasMany(db.Jugador, {foreignKey : 'personaje_id'});
db.Jugador.belongsTo(db.Personaje, {foreignKey : 'personaje_id'});

// 1:N
db.Partida.hasMany(db.Jugador, {foreignKey : 'partida_id'});
db.Jugador.belongsTo(db.Partida, {foreignKey : 'partida_id'});

// 1:N
db.Usuario.hasMany(db.Partida, {foreignKey : 'usuario_id'});
db.Partida.belongsTo(db.Usuario, {foreignKey : 'usuario_id'});

// 1:N
db.Clase.hasMany(db.Jugador, {foreignKey : 'clase_id'});
db.Jugador.belongsTo(db.Clase, {foreignKey : 'clase_id'});

// M:N
db.Jugador.belongsToMany(db.Habilidad, {through: 'JugadorHabilidad', foreignKey: 'jugador_id'});
db.Habilidad.belongsToMany(db.Jugador, {through: 'JugadorHabilidad', foreignKey: 'habilidad_id'});

// M:N
db.Jugador.belongsToMany(db.Objeto, {through: 'JugadorObjeto', foreignKey: 'jugador_id'});
db.Objeto.belongsToMany(db.Jugador, {through: 'JugadorObjeto', foreignKey: 'objeto_id'});

/////////////////////////////////////////////////////////////////////////

module.exports = db;
