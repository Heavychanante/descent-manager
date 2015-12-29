/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var auth = require('./components/auth');
var path = require('path');


module.exports = function(app, passport) {

  // Authenticate REST api
  //app.use('/api/*', auth.auth);

  // Insert routes below
  app.use('/api/adventures', require('./api/adventure'));
  app.use('/api/games', require('./api/game'));
  app.use('/api/characters', require('./api/character'));
  app.use('/api/classes', require('./api/class'));
  app.use('/api/items', require('./api/item'));
  app.use('/api/skills', require('./api/skill'));
  app.use('/api/players', require('./api/player'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  //------------------------ LOGIN ROUTES ------------------------------//
  // Realiza el login en la aplicación
  app.post("/login", passport.authenticate("local-login"), function(req, res){
    res.json(req.user);
  });

  // Realiza el registro en la aplicación
  app.post("/register", passport.authenticate("local-signup"), function(req, res){
    res.json(req.user);
  });

  // Devuelve al usuario si este está autenticado
  app.get("/loggedin", function(req, res){
    res.send(req.isAuthenticated()? req.user : '0');
  });

  // Cierra la sesión del usuario
  app.post("/logout", function(req, res){
    req.logOut();
    res.status(200).end();
  });
  //--------------------------------------------------------------------//

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
