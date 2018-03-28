'use strict';

const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const pathToData = path.join(__dirname, 'initial_data');
    const animeRecordsToInsert = [[]];
    const fileNames = await promisify(fs.readdir)(pathToData, 'utf-8');
    
    let bulk100Counter = 0;
    for(var fileName of fileNames) {
      const fileContents = await promisify(fs.readFile)(pathToData + '/' + fileName, 'utf-8');
      const rawAnimeData = JSON.parse(fileContents);

      for(var rawAnimeEntry of rawAnimeData) {
        animeRecordsToInsert[animeRecordsToInsert.length-1].push(makeAnimeBlob(rawAnimeEntry));
        bulk100Counter++;
        if(bulk100Counter === 100) {
          animeRecordsToInsert.push([]);
          bulk100Counter = 0;
        }
      }
    }
    
    return Promise.all(animeRecordsToInsert.map(d => {
        return queryInterface.bulkInsert('animes', d);
    }));
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

function makeAnimeBlob(blob) {
  return {
    name: blob.title,
    producer_id: null,
    synopsis: blob.synopsis,
    episodes: blob.episodes,
    start_date: new Date(blob.airing_start),
    end_date: null,
    mal_id: blob.mal_id,
    mal_rating: blob.score,

    // These should be handled in lifecycle hooks
    created_at: new Date(),
    updated_at: new Date(),
  }
}