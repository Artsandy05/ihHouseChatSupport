require("dotenv").config(); // Load dotenv
const { Sequelize } = require("sequelize");


const DB_DIALECT = "mysql";
const DB_HOST = process.env.DB_LOCAL_HOST;
const DB_USER = process.env.DB_LOCAL_USER;
const DB_PASS = process.env.DB_LOCAL_PASS;
const DB_NAME = process.env.DB_LOCAL_NAME;

console.log(DB_NAME, DB_PASS, DB_USER, DB_HOST, DB_DIALECT)

const connection = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASS,
  {
    dialect: DB_DIALECT,
    host: DB_HOST,
    timezone: "+08:00",
    logging: false,
  }
);

module.exports = connection;
