var LocalStrategy = require('passport-local').Strategy;
var sqldb = require('../sqldb');
var encryption = require('./encryption.js');

// Database models
var Usuario = sqldb.Usuario;

// expose this function to our app using module.exports
module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Usuario.find({where: {id: id}})
          .then(function(usuario){
            done(null, usuario);
          }, function(error){
            done(error, null);
          });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            Usuario.findOne({ where: {alias: username} })
              .then(function(usuario) {
                // If user is found
                if (usuario) {
                    return done(null, false, {message : 'El usuario ya existe'});
                }
                // All is well, return new user
                Usuario.create({
                    nombre: req.body.name,
                    alias: username,
                    password: encryption.encrypt(password)
                  }).then(function(usuario){
                    return done(null, usuario);
                  }, function(error){
                    return done(error);
                  });
              }, function(error){
                return done(error);
              });
        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            Usuario.findOne({ where: {alias: username} })
              .then(function(usuario) {
                if (!usuario) {
                    return done(null, false, {message : 'Usuario no encontrado'});
                }
                // if the user is found but the password is wrong
                if (password !== encryption.decrypt(usuario.password)) {
                    return done(null, false, {message : 'La contraseña es incorrecta'});
                }
                // all is well, return successful user
                return done(null, usuario);
              }, function(error){
                return done(error);
              });
        })
    );
};
