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

## Database Management
Install `sequelize-cli` using `npm install --global sequelize-cli`. Alternatively, you can use 
`./node_modules/.bin/sequelize`. It will provide you a list of options.

Typical dev workflow if your db is messed up
```
sequelize db:drop
sequelize db:create
sequelize db:migrate
sequelize db:seed:all   // Run all seeders
```

## Connecting to the dev database
Once you have the docker-compose running, you can connect to the database via

```
IP:         127.0.0.1
PORT:       20006
DATABASE:   sakura
USERNAME:   sakura
PASSWORD:   sakura
```

## Testing
The test suite must successfully pass for the CI build without errors.
```
npm run test
```

## Deployment
1. [Install the AWS Elastic Beanstalk Command Line Interface (CLI)](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html).
2. Create an IAM Instance Profile. For more information on how to create an IAM Instance Profile, see [Create an IAM Instance Profile for Your Amazon EC2 Instances](https://docs.aws.amazon.com/codedeploy/latest/userguide/how-to-create-iam-instance-profile.html).
3. Copy `.ebextensions/env.config.example` to `.ebextensions/env.config`. You can either fill in those values there or deploy then change them in the AWS console.  Do not commit your env details! `env.config` is already gitignored.
3. Run `eb init` to initialize the folder for use with the CLI.  Follow the instructions, making sure to confirm the prompt that you are using Docker.  Code Commit and ssh are optional.
4. Run `eb create` to begin the creation of your environment.
5. Once the environment creation process completes, run `eb open` to open the application in a browser.
6. Run `eb terminate --all` to clean up.

Notes: Make sure you have a default VPC and that your security group has access to port 3000.

