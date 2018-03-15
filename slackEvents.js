const slackEventsApi = require('@slack/events-api');
const { MyAnimeList } = require('./data');

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

            try {
              const anime = await MyAnimeList.getAnime(title);

              if (anime) {
                slackClient.postMessage(message.channel, '', anime.formatForSlack());
              } else {
                slackClient.postMessage(message.channel, `Did not find anime with title "${title}"`);
              }
            } catch (err) {
              throw new Error(`Search Anime Error: ${err}`);
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

