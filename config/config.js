require('dotenv').config()

module.exports = {
  development: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialect: "mysql"
  },
  test: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DA_NAME,
    port: process.env.DB_PORT,
    dialect: "mysql",
    operatorsAliases: false
  },
  production: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DA_NAME,
    port: process.env.DB_PORT,
    dialect: "mysql",
    operatorsAliases: false
  }
}
