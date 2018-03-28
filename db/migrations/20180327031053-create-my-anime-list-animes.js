'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('myanimelist_animes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mal_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      }, 
      avg_rating: {
        allowNull: true,
        type: Sequelize.INTEGER
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
      indexes: [
        {unique: true, fields: ['mal_id']}
      ],
      charset: 'utf8'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('myanimelist_animes');
  }
};