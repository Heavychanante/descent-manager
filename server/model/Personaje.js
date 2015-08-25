/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Personaje', {
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
    capacidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    velocidad: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    vida: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    aguante: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    defensa: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    fuerza: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    conocimiento: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    voluntad: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    percepcion: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    proeza: {
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: 'personaje'
  });
};
