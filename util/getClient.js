const { WebClient } = require('@slack/client');

// Helpers to cache and lookup appropriate client
// NOTE: Not enterprise-ready. if the event was triggered inside a shared channel, this lookup
// could fail but there might be a suitable client from one of the other teams that is within that
// shared channel.
const clients = {};

const getClientByTeamId = (teamId, botAuthorizations) => {
  if (!clients[teamId] && botAuthorizations[teamId]) {
    clients[teamId] = new WebClient(botAuthorizations[teamId]);
  }
  
  return clients[teamId] ? clients[teamId] : null;
}

module.exports = {
    getClientByTeamId
};