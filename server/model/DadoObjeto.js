/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DadoObjeto', {
    creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    modificacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    cantidad: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    timestamps: false,
    tableName: 'dado_objeto'
  });
};
