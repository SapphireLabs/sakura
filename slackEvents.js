'use strict';

const slackEventsApi = require('@slack/events-api');
const { WebClient } = require('@slack/client');

const slackEvents = slackEventsApi.createSlackEventAdapter(process.env.SLACK_VERIFICATION_TOKEN, { includeBody: true });

slackEvents.on('app_mention', (message, body) => {
  // Only respond to messages that have no subtype (plain messages)
  if (!message.subtype) {
    const slack = new WebClient(process.env.SAPPHIRE_OAUTH_TOKEN);
    
    if (slack) {
      if (message.text.indexOf('hi') >= 0) {
        slack.chat.postMessage({ 
          channel: message.channel, 
          text: `B-b-baka <@${message.user}>! :blushkek:` 
        })
          .catch(console.error);
      }
    }
  }
});

slackEvents.on('error', (error) => {
  if (error.code === slackEventsApi.errorCodes.TOKEN_VERIFICATION_FAILURE) {
    console.error(`An unverified request was sent to the Slack events Request URL. Request body: ${JSON.stringify(error.body)}`);
  } else {
    console.error(`An error occurred while handling a Slack event: ${error.message}`);
  }
});

module.exports = slackEvents;