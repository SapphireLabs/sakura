'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const AnimeTableCreation = queryInterface.createTable('animes', {
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
      producer_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'producers',
          key: 'id'
        }
      },
      synopsis: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      episodes: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      mal_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      }, 
      mal_rating: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }, {
      indexes: [{ unique: true, fields: ['mal_id']}],
      charset: 'utf8'
    });

    return AnimeTableCreation;
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('animes');
  }
};