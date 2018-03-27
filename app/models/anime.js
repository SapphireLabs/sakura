'use strict';

module.exports = (sequelize, DataTypes) => {
  const Anime = sequelize.define('Anime', {
    name: DataTypes.STRING,
    mal_id: {
      type: DataTypes.INTEGER,
    },
    producer_id: {
      type: DataTypes.INTEGER,
    },
    synopsis: DataTypes.TEXT,
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