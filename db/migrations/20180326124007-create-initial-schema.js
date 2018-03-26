'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const AnimeTableCreation = queryInterface.createTable('Animes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      malId: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      synopsis: {
        type: Sequelize.TEXT
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      producerId: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      malScore: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED
      }
    }, {
      indexes: [
        {
          unique: true,
          fields: ['malId']
        }
      ]
    });

    const MyAnimeListAnimes =;
    const Seasons = ;
    const Producers = ;

    return Promise.all([
      AnimeTableCreation, 
      MyAnimeListAnimes,
      Seasons,
      Producers
    ]);
  },
  
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('Animes'),
      queryInterface.dropTable('MyAnimeList_Animes'),
      queryInterface.dropTable('AnimeSeasons'),
      queryInterface.dropTable('AnimeProducers'),
    ]);
  }
};