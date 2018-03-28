const _ = require('lodash');
const Anime = require('./animeOld');
const AbstractAnimeDataSource = require('./abstractAnimeDataSource');

module.exports = class MALClient extends AbstractAnimeDataSource {
    constructor(popuraClient, entities) {
        super();
        this._client = popuraClient;
        this._entities = entities;
    }

    get client() {
        return this._client;
    }

    get entities() {
        return this._entities;
    }

    async getAnime(name) {
      try {
        const response = await this.client.searchAnimes(name);
        const result = response.shift();

        return result === null ? result : this._constructAnimeModel(result);
      } catch (err) {
        return null;
      }
    }

    _constructAnimeModel(animeResponse) {
        return new Anime({
            name: this.entities.decode(animeResponse.title),
            score: animeResponse.score,
            image: animeResponse.image,
            description: this.entities.decode(animeResponse.synopsis)
        }); 
    }
}