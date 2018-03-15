const { BOT_ID } = require('./util/constants');

/**
 * Class that handles slack event subscription and post message responses
 */
class SlackClient {
  /**
   * @param {Object} params
   */
  constructor(slackEventsAdapter, slackWebClient) {
    this.events = slackEventsAdapter;
    this.slack = slackWebClient;
  }

  /**
   * Adds a listener for a slack event
   *
   * @param {string} eventType
   * @param {function} callback
   */
  onEvent(eventType, callback) {
    this.events.on(eventType, callback);
  }

  /**
   * Extracts search string from an app mention message if in correct format.
   *
   * @param {string} text
   * @returns {?string}
   */
  extractSearchText(text) {
    const mentions = text.match(/<@[a-zA-Z0-9]*>/g);

    if (mentions.length > 1) return null;

    const { 0: match, index: matchIndex } = text.match(`<@${BOT_ID}>`);

    if (matchIndex > 0) return null;

    return text.slice(match.length).trim();
  }

  /**
   * @param {string} channel
   * @param {string} text
   * @param {Object} options
   */
  postMessage(channel, text, options) {
    this.slack.chat.postMessage({
      channel,
      text,
      ...options
    })
      .catch(err => {
        throw new Error(`Slack Post Message Error: ${err}`);
      });
  }

  /**
   * Formats anime object for slack chat postMessage format
   *
   * @param {Anime} anime
   * @returns {{attachments: *[]}}
   */
  buildAnimeSlackMessage(anime) {
    return {
      text: `${anime.name}`,
      attachments: [
        {
          pretext: `${anime.name} is rated ${anime.score}/10`,
          image_url: anime.image
        },
        {
          text: anime.description
        }
      ]
    };
  }
}

module.exports = SlackClient;
