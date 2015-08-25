module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DadoHabilidad', {
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
    tableName: 'dado_habilidad'
  });
};
