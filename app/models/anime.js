'use strict';

// TODO: sync this with the migration file
module.exports = (sequelize, DataTypes) => {
  var Anime = sequelize.define('Anime', {
    name: DataTypes.STRING,
    mal_id: DataTypes.INTEGER,
    synopsis: DataTypes.TEXT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {});
  Anime.associate = function(models) {
    // associations can be defined here
  };
  return Anime;
};