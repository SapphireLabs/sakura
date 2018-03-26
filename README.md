# Sakura
A Slack bot to query anime and get recommendations.

## Development Installation and Usage
Have docker installed. Copy the `.env` file from the `.env.local` file and fill out the values with the:
1. Slack API information
2. MAL information

```
docker-compose build
docker-compose up
```

## Connecting to the dev database
Once you have the docker-compose running, you can connect to the database via

```
IP:         127.0.0.1
PORT:       20006
USERNAME:   sakura
PASSWORD:   sakura
```

## Testing
The test suite must successfully pass for the CI build without errors.
```
npm run test
```

## Deployment
TBD
