'use strict';

module.exports = (sequelize, DataTypes) => {
  const MyAnimeListAnime = sequelize.define('MyAnimeListAnime', {
    mal_id: Sequelize.INTEGER,
    avg_rating: Sequelize.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {});

  MyAnimeListAnime.associate = function(models) {};
  
  return MyAnimeListAnime;
};