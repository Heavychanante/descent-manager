'use strict';

// Development specific configuration
// ==================================


module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/descentmanager-dev'
  },
  sequelize: {
    uri: (process.env.OPENSHIFT_MYSQL_DB_URL) ? process.env.OPENSHIFT_MYSQL_DB_URL + '/descentmanager' : 'mysql://pruebas:pruebas@localhost:3306/descentmanager',
    options: {
      logging: false,
      define: {
        timestamps: false
      }
    }
  },

  seedDB: true,

  secrets: {
    encryptionPassword: "encryptdev"
  }
};
