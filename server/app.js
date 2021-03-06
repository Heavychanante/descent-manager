/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var passport = require('passport');
var sqldb = require('./sqldb');
var config = require('./config/environment');

// Setup passport
require('./config/passport')(passport);

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app, passport);
require('./routes')(app, passport);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || config.port || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || config.ip || '127.0.0.1'

// Start server
function startServer() {
  server.listen(server_port, server_ip_address, function() {
    console.log('Express server listening on %d, in %s mode', server_port, app.get('env'));
  });
}

sqldb.sequelize.sync()
  .then(startServer)
  .catch(function(err) {
    console.log('Server failed to start due to error: %s', err);
  });

//setImmediate(startServer);

// Expose app
exports = module.exports = app;
