module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Fichero', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bytes: {
      type: 'BLOB',
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: true
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
    tableName: 'fichero'
  });
};
