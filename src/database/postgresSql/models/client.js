'use strict';

const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Client.hasMany(models.App,{
        foreignKey:'clientId',
        as:"clientApps"
      })
    }
  }

  Client.init({
    id:{
      primaryKey:true,
      autoIncrement:true,
      type:DataTypes.BIGINT
    },
    firstName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    secondName:{
      type:DataTypes.STRING,
      allowNull:false
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {sequelize, modelName: 'Client'});

  return Client;
};