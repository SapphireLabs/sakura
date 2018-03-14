const slackEventsApi = require('@slack/events-api');
const { BOT_ID } = require('./util/constants');

/**
 * Class that handles slack event subscription and post message responses
 */
class SlackClient {
  /**
   * @param {Object} params
   */
  constructor(params) {
    this.events = params.slackEvents;
    this.slack = params.slackWebClient;

    this._setupListeners();
  }

  /**
   * @private
   */
  _setupListeners() {
    this.events.on('message', (message, body) => {
      console.log(message);
      console.log(body);
    });

    this.events.on('app_mention', (message, body) => {
      // Only respond to messages that have no subtype (plain messages)
      if (!message.subtype) {
        const search = this._extractSearchText(message.text);

        if (!search) {
          this._postMessage(
            message.channel,
            'Invalid search: try "@Sakura <Insert Anime Name>"'
          );
        } else {
          this._postMessage(
            message.channel,
            `Searching for anime "${search}"...`
          );
        }
      }
    });

    this.events.on('error', (error) => {
      if (error.code === slackEventsApi.errorCodes.TOKEN_VERIFICATION_FAILURE) {
        console.error(`An unverified request was sent to the Slack events Request URL. Request body: ${JSON.stringify(error.body)}`);
      } else {
        console.error(`An error occurred while handling a Slack event: ${error.message}`);
      }
    });
  }

  /**
   * Extracts anime search string from a message. Returns null if not in correct format.
   *
   * @param {string} text
   * @returns {?string}
   * @private
   */
  _extractSearchText(text) {
    const mentions = text.match(/<@[a-zA-Z0-9]*>/g);

    if (mentions.length > 1) return null;

    const { 0: match, index: matchIndex } = text.match(`<@${BOT_ID}>`);

    if (matchIndex > 0) return null;

    return text.slice(match.length).trim();
  }

  /**
   * @param {string} channel
   * @param {string} text
   * @private
   */
  _postMessage(channel, text) {
    this.slack.chat.postMessage({
      channel,
      text,
    })
      .catch(console.error);
  }
}

module.exports = SlackClient;
