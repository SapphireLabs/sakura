'use strict';

module.exports = (sequelize, DataTypes) => {
  const Season = sequelize.define('Season', {
    name: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {});
  
  Season.associate = function(models) {};
  
  return Season;
};