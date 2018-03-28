'use strict';

module.exports = (sequelize, DataTypes) => {
  const Anime = sequelize.define('Anime', {
    name: DataTypes.STRING,
    producer_id: DataTypes.INTEGER,
    synopsis: DataTypes.TEXT,
    episodes: DataTypes.INTEGER,
    mal_id: DataTypes.INTEGER,
    mal_rating: DataTypes.INTEGER,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {});
  
  Anime.associate = function(models) {
    Anime.belongsTo(models.MyAnimeListAnimes);
    Anime.belongsTo(models.Producers);
  };
  
  return Anime;
};