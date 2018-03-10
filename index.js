require('dotenv').config();

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const slackEvents = require('./slackEvents');

const port = process.env.APP_PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use('/slack/events', slackEvents.expressMiddleware());

http.createServer(app).listen(port, () => {
  console.log(`Server listening on port ${port}`);
});