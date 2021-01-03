'use strict';

import {Model} from 'sequelize'

module.exports = (sequelize, DataTypes) => {

  class App extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {

      App.belongsTo(models.Client, {
        foreignKey:'appId',
        onDelete:'CASCADE'
      })
    }
  }

  App.init({
     id:{
      primaryKey:true,
      autoIncrement:true,
      type:DataTypes.BIGINT
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    redirectUrl:{
      type:DataTypes.STRING,
      allowNull:false
    },
    secretKey:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {sequelize, modelName: 'App',});

  return App;
};