'use strict';

module.exports = (sequelize, DataTypes) => {
  const Season = sequelize.define('Season', {
    name: DataTypes.STRING,
    year: Sequelize.INTEGER.UNSIGNED,
    season: Sequelize.INTEGER.ENUM('Winter', 'Spring', 'Summer', 'Fall'),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {});
  
  Season.associate = function(models) {};
  
  return Season;
};