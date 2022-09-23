// CONFIGURATION FILE FOR SEQUELIZE

const env = require('./db.config')

const development = {
  username: env.USER,
  password: env.PASSWORD,
  database: env.DB,
  host: env.HOST,
  dialect: "mysql",
  //port: env.MYSQL_PORT
};

const production = {
  username: env.USER,
  password: env.PASSWORD,
  database: env.DB,
  host: env.HOST,
  dialect: "mysql",
  //port: env.MYSQL_PORT
};

const test = {
  username: env.USER,
  password: env.PASSWORD,
  database: env.DB,
  host: env.HOST,
  dialect: "mysql",
  //port: env.MYSQL_PORT
};

module.exports = { development, production, test };