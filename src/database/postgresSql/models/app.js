'use strict';

const {Model} = require('sequelize')


module.exports = (sequelize, DataTypes) => {

  class App extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {

      App.belongsTo(models.Client, {
        foreignKey:'clientId',
        onDelete:'CASCADE'
      })

      Client.hasMany(models.Privilege,{
        foreignKey:'appId',
        as:"appPrivileges"
      })
    }
  }

  App.init({
     id:{
      primaryKey:true,
      autoIncrement:true,
      type:DataTypes.BIGINT
    },
    appId: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    redirectUrl:{
      type:DataTypes.STRING,
      allowNull:false
    },
    clientId:{
      type: DataTypes.BIGINT,
      allowNull:false
    },
    secretKey:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {sequelize, modelName: 'App',});

  return App;
};