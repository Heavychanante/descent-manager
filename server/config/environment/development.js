'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/descentmanager-dev'
  },
  sequelize: {
    uri: 'mysql://pruebas:pruebas@localhost:3306/descentmanager',
    options: {
      logging: false,
      define: {
        timestamps: false
      }
    }
  },

  seedDB: true,

  mysql: {
    host     : 'localhost',
    port     : '3306',
    user     : 'pruebas',
    password : 'pruebas'
  }
};
