const popura = require('popura');
const _ = require('lodash');
 
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
}

class MALClient extends AbstractAnimeDataSource {
    constructor(popuraClient) {
        super();
        this._client = popuraClient;
    }

    getAnime(name) {
        return new Promise((resolve, reject) => {
            this._client.searchAnimes(name)
                .then(response => {
                    const result = response.shift();
                    resolve(result === null ? result : this._constructAnimeModel(result));
                })
                .catch(err => reject(err));
        });
    }

    _constructAnimeModel(animeResponse) {
        return new Anime({
            name: animeResponse.title,
            score: animeResponse.score,
            image: animeResponse.image,
            description: animeResponse.synopsis
        }); 
    }
}

const mal = new MALClient(popura(process.env.MAL_USERNAME, process.env.MAL_PASSWORD));

module.exports = {
    MyAnimeList: mal
};