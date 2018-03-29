const _ = require('lodash');

module.exports = class Anime {
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