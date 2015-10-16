module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AventuraPartida', {
    ganadores: {
      type: DataTypes.STRING,
      allowNull: true
    },
    activa: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0
    },
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
    tableName: 'aventura_partida'
  });
};
