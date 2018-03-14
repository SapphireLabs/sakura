'use strict';

require('dotenv').config();

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const slackEventsApi = require('@slack/events-api');
const { WebClient } = require('@slack/client');
const SlackClient = require('./slackClient');

const slackEvents = slackEventsApi.createSlackEventAdapter(process.env.SLACK_VERIFICATION_TOKEN, { includeBody: true });
const slackWebClient = new WebClient(process.env.SLACK_TEAM_OAUTH_TOKEN);

const slackClient = new SlackClient({
  slackEvents,
  slackWebClient
});

const port = process.env.APP_PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use('/slack/events', slackClient.events.expressMiddleware());

http.createServer(app).listen(port, () => {
  console.log(`Server listening on port ${port}`);
});