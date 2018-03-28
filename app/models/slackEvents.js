const slackEventsApi = require('@slack/events-api');
const MyAnimeList = require('./myAnimeListClient');
const Entities = require('html-entities').AllHtmlEntities;
const popura = require('popura');
const malClient = new MyAnimeList(popura(process.env.MAL_USERNAME, process.env.MAL_PASSWORD), new Entities());

module.exports = {
  registerEvents: (slackClient) => {
      slackClient.onEvent('app_mention', async (message) => {
        // Only respond to messages that have no subtype (plain messages)
        if (!message.subtype) {
          const title = slackClient.extractSearchText(message.text);

          if (!title) {
            slackClient.postMessage(message.channel, 'Invalid search: try "@Sakura <Insert Anime Name>"');
          } else {
            slackClient.postMessage(message.channel, `Searching for anime "${title}"...`);

            const anime = await malClient.getAnime(title);

            if (anime) {
              slackClient.postMessage(message.channel, '', anime.formatForSlack());
            } else {
              slackClient.postMessage(message.channel, `Did not find anime with title "${title}"`);
            }
          }
        }
      });

      slackClient.onEvent('error', (error) => {
        if (error.code === slackEventsApi.errorCodes.TOKEN_VERIFICATION_FAILURE) {
          console.error(`An unverified request was sent to the Slack events Request URL. Request body: ${JSON.stringify(error.body)}`);
        } else {
          console.error(`An error occurred while handling a Slack event: ${error.message}`);
        }
      });
    }
};

