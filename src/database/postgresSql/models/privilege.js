'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Privilege extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Privilege.belongsTo(models.App, {
        foreignKey:'appId',
        onDelete:'CASCADE',
      })
    }
  }

  Privilege.init({
    userId:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    appId: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    viewProfile: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
    },
  }, {sequelize, modelName: 'Privilege'});

  return Privilege;
};