require('dotenv').config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.RDS_HOSTNAME, process.env.RDS_USERNAME, process.env.RDS_PASSWORD, {
    host: 'db',
    dialect: 'mysql',
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
    operatorsAliases: false
  });

sequelize.authenticate()
.then(() => {
    console.log("CONNECTED!");
})
.catch((err) => {
    console.log('unable to conncet: ' + err);
})