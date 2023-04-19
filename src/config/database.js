const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

var db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    define: {
      freezeTableName: true,
    },
  }
);

module.exports = db;
