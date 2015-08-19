var config = require('./environment');
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');

// Connection to database
var connection = mysql.createConnection(config.mysql);

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
        connection.query("SELECT * FROM usuario WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
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
            connection.query("SELECT * FROM usuario WHERE alias = ?",[username], function(err, rows) {
                if (err) {
                  return done(err);
                }
                if (rows.length) {
                    return done(null, false, {message : 'El nombre de usuario ya existe'});
                } else {
                    // If there is no user with that username
                    // create the user
                    var insertQuery = "INSERT INTO usuario (nombre, alias, password, creacion, modificacion) values ('prueba',?,?,NOW(),NOW())";

                    // Send the new user Id
                    connection.query(insertQuery,[username, password],function(err, result) {
                        return done(null, result.insertId);
                    });
                }
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
            connection.query("SELECT * FROM usuario WHERE alias = ?",[username], function(err, rows){
                if (err) {
                    return done(err);
                }
                if (!rows.length) {
                    return done(null, false, {message : 'Usuario no encontrado'});
                }

                // if the user is found but the password is wrong
                if (password != rows[0].password) {
                    return done(null, false, {message : 'La contraseña es incorrecta'});
                }

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};
