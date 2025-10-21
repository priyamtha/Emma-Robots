'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BabyName extends Model {
    
    static associate(models) {
      
    }
  }

  BabyName.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sex: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'BabyName',
      tableName: 'baby_names',
      timestamps: false,      
    }
  );

  return BabyName;
};
