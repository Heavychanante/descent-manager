/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CampaniaPartida', {
    creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    modificacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    tableName: 'campania_partida'
  });
};
