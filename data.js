const popura = require('popura');
const _ = require('lodash');
const Entities = require('html-entities').AllHtmlEntities;

class AbstractAnimeDataSource {
    getAnime(name) {
        throw "Implementation error";
    }

    _constructAnimeModel(animeResponse) {
        throw "Implementation error";
    }
}

class Anime {
    constructor(params) {
        this._validateParams(params);
        
        this.name = params.name;
        this.score = params.score || null;
        this.image = params.image || null;
        this.description = params.description || null;
    }

    _validateParams(params) {
        if(_.isNil(params.name) || _.isEmpty(params.name)) {
            throw "Anime Creation Error: invalid name";
        }
    }

    /**
     * Formats an anime object for slack post message
     *
     * @param {Anime} anime
     * @returns {{text: string, attachments: *[]}}
     */
    formatForSlack() {
      return {
        text: `${this.name}`,
        attachments: [
          {
            pretext: `${this.name} is rated ${this.score}/10`,
            image_url: this.image
          },
          {
            text: this.description
          }
        ]
      };
    }
}

class MALClient extends AbstractAnimeDataSource {
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

    getAnime(name) {
        return new Promise((resolve, reject) => {
            this.client.searchAnimes(name)
                .then(response => {
                    const result = response.shift();
                    resolve(result === null ? result : this._constructAnimeModel(result));
                })
                .catch(err => reject(err));
        });
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

const mal = new MALClient(popura(process.env.MAL_USERNAME, process.env.MAL_PASSWORD), new Entities());

module.exports = {
    MyAnimeList: mal
};